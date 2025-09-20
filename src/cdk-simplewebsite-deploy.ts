import { RemovalPolicy, Duration } from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

export interface BasicSiteConfiguration {
  /**
   * Local path to the website folder you want to deploy on S3.
   */
  readonly websiteFolder: string;
  /**
   * The index document of the website.
   */
  readonly indexDoc: string;
  /**
   * The error document of the website.
   * @default - No error document.
   */
  readonly errorDoc?: string;
  /**
   * Hosted Zone used to create the DNS record for the website.
   */
  readonly hostedZone: string;
}

export interface CloudfrontSiteConfiguration {
  /**
   * Local path to the website folder you want to deploy on S3.
   */
  readonly websiteFolder: string;
  /**
   * The index document of the website.
   */
  readonly indexDoc: string;
  /**
   * The error document of the website.
   * @default - No error document.
   */
  readonly errorDoc?: string;
  /**
   * Hosted Zone used to create the DNS record for the website.
   */
  readonly hostedZone: string;
  /**
   * Used to deploy a Cloudfront site with a single domain. e.g. sample.example.com
   * If you include a value for both domain and subDomain,
   * an error will be thrown.
   *
   * @default - no value
   */
  readonly domain?: string;
  /**
   * The subdomain name you want to deploy. e.g. www.example.com
   * If you include a value for both domain and subDomain,
   * an error will be thrown.
   *
   * @default - no value
   */
  readonly subDomain?: string;
  /**
   * The price class determines how many edge locations CloudFront will use for your distribution.
   * @default PriceClass.PRICE_CLASS_100.
   * @see https://aws.amazon.com/cloudfront/pricing/.
   */
  readonly priceClass?: cloudfront.PriceClass;
  /**
   * Optional cache behaviors for different path patterns.
   * @default - No additional cache behaviors.
   */
  readonly additionalBehaviors?: Record<string, cloudfront.BehaviorOptions>;
  /**
   * Enable response headers policy for security headers.
   * @default false - No security headers policy applied.
   */
  readonly enableSecurityHeaders?: boolean;
  /**
   * Enable IPv6 support with AAAA records.
   * @default false - No IPv6 support.
   */
  readonly enableIpv6?: boolean;
  /**
   * Custom error responses for different HTTP status codes.
   * @default - Default error responses based on errorDoc setting.
   */
  readonly customErrorResponses?: cloudfront.ErrorResponse[];
  /**
   * Enable CloudFront access logging.
   * @default false - No access logging.
   */
  readonly enableLogging?: boolean;
  /**
   * S3 bucket for CloudFront access logs. If not provided and logging is enabled, a new bucket will be created.
   * @default - New bucket created if logging is enabled.
   */
  readonly logsBucket?: s3.IBucket;
  /**
   * Optional WAF Web ACL ARN for enhanced security.
   * @default - No WAF integration.
   */
  readonly webAclId?: string;
}

export class CreateBasicSite extends Construct {
  constructor(scope: Construct, id: string, props: BasicSiteConfiguration) {
    super(scope, id);

    const hostedZoneLookup = route53.HostedZone.fromLookup(
      this,
      'WebsiteHostedZone',
      {
        domainName: props.hostedZone,
      },
    );

    const websiteRedirectBucket = new s3.Bucket(
      scope,
      'WebsiteRedirectBucket',
      {
        bucketName: `www.${props.hostedZone}`,
        removalPolicy: RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
        websiteRedirect: {
          hostName: props.hostedZone,
          protocol: s3.RedirectProtocol.HTTP,
        },
      },
    );

    const websiteBucket = new s3.Bucket(scope, 'WebsiteBucket', {
      bucketName: props.hostedZone,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      websiteIndexDocument: props.indexDoc,
      websiteErrorDocument: props.errorDoc,
      publicReadAccess: true,
      blockPublicAccess: {
        blockPublicPolicy: false,
        blockPublicAcls: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      },
      encryption: s3.BucketEncryption.S3_MANAGED,
    });

    new s3deploy.BucketDeployment(scope, 'WebsiteDeploy', {
      sources: [s3deploy.Source.asset(props.websiteFolder)],
      destinationBucket: websiteBucket,
    });

    new route53.ARecord(scope, 'WebsiteAlias', {
      zone: hostedZoneLookup,
      recordName: props.hostedZone,
      target: route53.RecordTarget.fromAlias(
        new targets.BucketWebsiteTarget(websiteBucket),
      ),
    });

    new route53.ARecord(scope, 'WebsiteRedirectAlias', {
      zone: hostedZoneLookup,
      recordName: `www.${props.hostedZone}`,
      target: route53.RecordTarget.fromAlias(
        new targets.BucketWebsiteTarget(websiteRedirectBucket),
      ),
    });
  }
}

export class CreateCloudfrontSite extends Construct {
  constructor(
    scope: Construct,
    id: string,
    props: CloudfrontSiteConfiguration,
  ) {
    super(scope, id);

    if (props.domain && props.subDomain) {
      throw new Error(
        'Domain and sub domain parameters cannot both be defined',
      );
    }

    const hostedZoneLookup = route53.HostedZone.fromLookup(
      this,
      'WebsiteHostedZone',
      {
        domainName: props.hostedZone,
      },
    );

    // Use custom error responses if provided, otherwise use default logic
    const errorResponses: cloudfront.ErrorResponse[] = props.customErrorResponses || [];
    if (!props.customErrorResponses) {
      if (props.errorDoc) {
        errorResponses.push({
          httpStatus: 404,
          responsePagePath: `/${props.errorDoc}`,
        });
        errorResponses.push({
          httpStatus: 403,
          responsePagePath: `/${props.errorDoc}`,
        });
      } else {
        errorResponses.push({
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: `/${props.indexDoc}`,
        });
        errorResponses.push({
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: `/${props.indexDoc}`,
        });
      }
    }

    const subjectAlternativeNames: string[] = [];
    if (props.domain) subjectAlternativeNames.push(props.domain);
    if (props.subDomain) subjectAlternativeNames.push(props.subDomain);

    const websiteCert = new acm.Certificate(this, 'WebsiteCert', {
      domainName: props.hostedZone,
      subjectAlternativeNames,
      validation: acm.CertificateValidation.fromDns(hostedZoneLookup),
    });

    const websiteBucket = new s3.Bucket(scope, 'WebsiteBucket', {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
    });

    const domainNames: string[] = [];
    if (props.domain) {
      domainNames.push(props.domain);
    } else {
      domainNames.push(props.hostedZone);
    }

    if (props.subDomain) domainNames.push(props.subDomain);

    // Create access logs bucket if logging is enabled but no bucket provided
    const logsBucket = props.enableLogging
      ? (props.logsBucket || new s3.Bucket(this, 'AccessLogsBucket', {
        removalPolicy: RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
        encryption: s3.BucketEncryption.S3_MANAGED,
      }))
      : undefined;

    // Create security headers policy if enabled
    const responseHeadersPolicy = props.enableSecurityHeaders
      ? new cloudfront.ResponseHeadersPolicy(this, 'SecurityHeadersPolicy', {
        securityHeadersBehavior: {
          contentTypeOptions: { override: true },
          frameOptions: { frameOption: cloudfront.HeadersFrameOption.DENY, override: true },
          referrerPolicy: { referrerPolicy: cloudfront.HeadersReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN, override: true },
          strictTransportSecurity: {
            accessControlMaxAge: Duration.seconds(31536000),
            includeSubdomains: true,
            preload: true,
            override: true,
          },
          xssProtection: { protection: true, modeBlock: true, override: true },
        },
      })
      : undefined;

    const websiteDist = new cloudfront.Distribution(scope, 'WebsiteDist', {
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(websiteBucket),
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        originRequestPolicy: cloudfront.OriginRequestPolicy.CORS_S3_ORIGIN,
        responseHeadersPolicy,
      },
      additionalBehaviors: props.additionalBehaviors,
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
      priceClass: props.priceClass ?? cloudfront.PriceClass.PRICE_CLASS_100,
      errorResponses,
      defaultRootObject: props.indexDoc,
      domainNames,
      certificate: websiteCert,
      logBucket: logsBucket,
      logIncludesCookies: false,
      webAclId: props.webAclId,
    });

    new s3deploy.BucketDeployment(scope, 'WebsiteDeploy', {
      sources: [s3deploy.Source.asset(props.websiteFolder)],
      destinationBucket: websiteBucket,
      distribution: websiteDist,
    });

    new route53.ARecord(scope, 'WebsiteDomainAlias', {
      zone: hostedZoneLookup,
      recordName: props.domain ? props.domain : props.hostedZone,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(websiteDist),
      ),
    });

    // Add IPv6 support if enabled
    if (props.enableIpv6) {
      new route53.AaaaRecord(scope, 'WebsiteDomainAliasIpv6', {
        zone: hostedZoneLookup,
        recordName: props.domain ? props.domain : props.hostedZone,
        target: route53.RecordTarget.fromAlias(
          new targets.CloudFrontTarget(websiteDist),
        ),
      });
    }

    if (props.subDomain) {
      new route53.ARecord(scope, 'WebsiteSubDomainAlias', {
        zone: hostedZoneLookup,
        recordName: props.subDomain,
        target: route53.RecordTarget.fromAlias(
          new targets.CloudFrontTarget(websiteDist),
        ),
      });

      // Add IPv6 support for subdomain if enabled
      if (props.enableIpv6) {
        new route53.AaaaRecord(scope, 'WebsiteSubDomainAliasIpv6', {
          zone: hostedZoneLookup,
          recordName: props.subDomain,
          target: route53.RecordTarget.fromAlias(
            new targets.CloudFrontTarget(websiteDist),
          ),
        });
      }
    }
  }
}

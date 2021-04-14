import * as acm from '@aws-cdk/aws-certificatemanager';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as origins from '@aws-cdk/aws-cloudfront-origins';
import * as route53 from '@aws-cdk/aws-route53';
import * as targets from '@aws-cdk/aws-route53-targets';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import { RemovalPolicy, Construct } from '@aws-cdk/core';

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
   * The sub-domain name you want to deploy. e.g. www.example.com
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
      encryption: s3.BucketEncryption.S3_MANAGED,
    });

    new s3deploy.BucketDeployment(scope, 'WebsiteDeploy', {
      sources: [s3deploy.Source.asset(props.websiteFolder)],
      destinationBucket: websiteBucket,
    });

    new route53.ARecord(scope, 'WebisteAlias', {
      zone: hostedZoneLookup,
      recordName: props.hostedZone,
      target: route53.RecordTarget.fromAlias(
        new targets.BucketWebsiteTarget(websiteBucket),
      ),
    });

    new route53.ARecord(scope, 'WebisteRedirectAlias', {
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

    const errorResponses = [];
    const distributionPaths = ['/', `/${props.indexDoc}`];
    if (props.errorDoc) {
      distributionPaths.push(`/${props.errorDoc}`);
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

    const subjectAlternativeNames = [];
    if (props.domain) subjectAlternativeNames.push(props.domain);
    if (props.subDomain) subjectAlternativeNames.push(props.subDomain);

    const websiteCert = new acm.DnsValidatedCertificate(this, 'WebsiteCert', {
      domainName: props.hostedZone,
      subjectAlternativeNames,
      hostedZone: hostedZoneLookup,
      region: 'us-east-1',
    });

    const websiteBucket = new s3.Bucket(scope, 'WebsiteBucket', {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      publicReadAccess: false,
      encryption: s3.BucketEncryption.S3_MANAGED,
    });

    const domainNames = [];
    if (props.domain) {
      domainNames.push(props.domain);
    } else {
      domainNames.push(props.hostedZone);
    }

    if (props.subDomain) domainNames.push(props.subDomain);

    const websiteDist = new cloudfront.Distribution(scope, 'WebsiteDist', {
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket),
        allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2019,
      priceClass: props.priceClass
        ? props.priceClass
        : cloudfront.PriceClass.PRICE_CLASS_100,
      errorResponses,
      defaultRootObject: props.indexDoc,
      domainNames,
      certificate: websiteCert,
    });

    new s3deploy.BucketDeployment(scope, 'WebsiteDeploy', {
      sources: [s3deploy.Source.asset(props.websiteFolder)],
      destinationBucket: websiteBucket,
      distribution: websiteDist,
      distributionPaths,
    });

    new route53.ARecord(scope, 'WebisteDomainAlias', {
      zone: hostedZoneLookup,
      recordName: props.domain ? props.domain : props.hostedZone,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(websiteDist),
      ),
    });

    if (props.subDomain) {
      new route53.ARecord(scope, 'WebisteSubDomainAlias', {
        zone: hostedZoneLookup,
        recordName: props.subDomain,
        target: route53.RecordTarget.fromAlias(
          new targets.CloudFrontTarget(websiteDist),
        ),
      });
    }
  }
}

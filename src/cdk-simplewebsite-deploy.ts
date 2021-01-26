import * as acm from '@aws-cdk/aws-certificatemanager';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as origins from '@aws-cdk/aws-cloudfront-origins';
import * as route53 from '@aws-cdk/aws-route53';
import * as targets from '@aws-cdk/aws-route53-targets';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import * as cdk from '@aws-cdk/core';

export interface SimpleWebsiteConfiguration {
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
   * The sub-domain name you want to deploy.
   * @default www  e.g. www.example.com.
   */
  readonly subDomain?: string;
  /**
   * The price class determines how many edge locations CloudFront will use for your distribution.
   * @default PriceClass.PRICE_CLASS_100.
   * @see https://aws.amazon.com/cloudfront/pricing/.
   */
  readonly priceClass?: cloudfront.PriceClass;
}

export class CreateBasicSite extends cdk.Construct {
  constructor(
    scope: cdk.Construct,
    id: string,
    props: SimpleWebsiteConfiguration,
  ) {
    super(scope, id);

    const hostedZone = route53.HostedZone.fromLookup(
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
        bucketName: props.subDomain
          ? `www.${props.hostedZone}`
          : props.subDomain,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
        websiteRedirect: {
          hostName: props.hostedZone,
          protocol: s3.RedirectProtocol.HTTP,
        },
      },
    );

    const websiteBucket = new s3.Bucket(scope, 'WebsiteBucket', {
      bucketName: props.hostedZone,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
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

    new route53.ARecord(this, 'WebisteAlias', {
      zone: hostedZone,
      recordName: props.hostedZone,
      target: route53.RecordTarget.fromAlias(
        new targets.BucketWebsiteTarget(websiteBucket),
      ),
    });

    new route53.ARecord(this, 'WebisteRedirectAlias', {
      zone: hostedZone,
      recordName: props.subDomain ? props.subDomain : `www.${props.hostedZone}`,
      target: route53.RecordTarget.fromAlias(
        new targets.BucketWebsiteTarget(websiteRedirectBucket),
      ),
    });
  }
}

export class CreateCloudfrontSite extends cdk.Construct {
  constructor(
    scope: cdk.Construct,
    id: string,
    props: SimpleWebsiteConfiguration,
  ) {
    super(scope, id);

    const hostedZone = route53.HostedZone.fromLookup(
      this,
      'WebsiteHostedZone',
      {
        domainName: props.hostedZone,
      },
    );

    const subjectAlternativeNames = [];
    if (props.subDomain) {
      subjectAlternativeNames.push(props.subDomain);
    }

    const websiteCert = new acm.DnsValidatedCertificate(this, 'WebsiteCert', {
      domainName: props.hostedZone,
      subjectAlternativeNames,
      hostedZone: hostedZone,
      region: 'us-east-1',
    });

    const websiteBucket = new s3.Bucket(scope, 'WebsiteBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      publicReadAccess: false,
      encryption: s3.BucketEncryption.S3_MANAGED,
    });

    const domainNames = [props.hostedZone];

    if (props.subDomain) domainNames.push(props.subDomain);

    const websiteDist = new cloudfront.Distribution(this, 'WebsiteDist', {
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket),
        allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2019,
      priceClass: props.priceClass
        ? props.priceClass
        : cloudfront.PriceClass.PRICE_CLASS_100,
      errorResponses: [
        {
          httpStatus: 404,
          responsePagePath: `/${
            props.errorDoc ? props.errorDoc : props.indexDoc
          }`,
        },
        {
          httpStatus: 500,
          ttl: cdk.Duration.seconds(2),
        },
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: `/${props.indexDoc}`,
        },
      ],
      defaultRootObject: props.indexDoc,
      domainNames,
      certificate: websiteCert,
    });

    new s3deploy.BucketDeployment(scope, 'WebsiteDeploy', {
      sources: [s3deploy.Source.asset(props.websiteFolder)],
      destinationBucket: websiteBucket,
      distribution: websiteDist,
      distributionPaths: ['/', `/${props.indexDoc}`],
    });

    new route53.ARecord(this, 'WebisteDomainAlias', {
      zone: hostedZone,
      recordName: props.hostedZone,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(websiteDist),
      ),
    });

    if (props.subDomain) {
      new route53.ARecord(this, 'WebisteSubDomainAlias', {
        zone: hostedZone,
        recordName: props.subDomain,
        target: route53.RecordTarget.fromAlias(
          new targets.CloudFrontTarget(websiteDist),
        ),
      });
    }
  }
}

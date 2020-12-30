import * as acm from "@aws-cdk/aws-certificatemanager";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as origins from "@aws-cdk/aws-cloudfront-origins";
import * as route53 from "@aws-cdk/aws-route53";
import * as targets from "@aws-cdk/aws-route53-targets";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import * as cdk from "@aws-cdk/core";

export interface BasicSiteConfiguration {
  /**
   * local path to the website folder you want to deploy on S3
   */
  readonly websiteFolder: string;
  /**
   * the index docuement of your S3 Bucket
   */
  readonly indexDoc: string;
  /**
   * the error document of your S3 Bucket
   */
  readonly errorDoc?: string;
  /**
   * enable encryption for files in your S3 Bucket
   */
  readonly encryptBucket?: boolean;
  /**
   * the domain you want to deploy to
   */
  readonly websiteDomain?: string;
  /**
   * the subdomain you want to deploy to
   */
  readonly websiteSubDomain?: string;
}

export interface CloudfrontSiteConfiguration {
  /**
   * local path to the website folder you want to deploy on S3
   */
  readonly websiteFolder: string;
  /**
   * the index docuement of your CloudFront distribution
   */
  readonly indexDoc: string;
  /**
   * the error document of your CloudFront distribution
   */
  readonly errorDoc?: string;
  /**
   * enable encryption for files in your S3 Bucket
   */
  readonly encryptBucket?: boolean;
  /**
   * hosted zone used to create the DNS record of your CloudFront distribution
   */
  readonly hostedZoneDomain: string;
  /**
   * the domain you want to deploy to
   */
  readonly websiteDomain: string;
  /**
   * The price class determines how many edge locations CloudFront will use for your distribution.
   * See https://aws.amazon.com/cloudfront/pricing/ for full list of supported regions.
   */
  readonly priceClass?: cloudfront.PriceClass;
}

export class CreateBasicSite extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: BasicSiteConfiguration) {
    super(scope, id);

    if (props.websiteDomain && props.websiteSubDomain) {
      new s3.Bucket(scope, "WebsiteRedirectBucket", {
        bucketName: props.websiteSubDomain,
        websiteRedirect: {
          hostName: props.websiteDomain,
          protocol: s3.RedirectProtocol.HTTP,
        },
      });
    }

    const websiteBucket = new s3.Bucket(scope, "WebsiteBucket", {
      bucketName: props.websiteDomain,
      websiteIndexDocument: props.indexDoc,
      websiteErrorDocument: props.errorDoc,
      publicReadAccess: true,
      encryption: props.encryptBucket
        ? s3.BucketEncryption.S3_MANAGED
        : s3.BucketEncryption.UNENCRYPTED,
    });

    new s3deploy.BucketDeployment(scope, "WebsiteDeploy", {
      sources: [s3deploy.Source.asset(props.websiteFolder)],
      destinationBucket: websiteBucket,
    });
  }
}

export class CreateCloudfrontSite extends cdk.Construct {
  constructor(
    scope: cdk.Construct,
    id: string,
    props: CloudfrontSiteConfiguration
  ) {
    super(scope, id);

    const hostedZone = route53.HostedZone.fromLookup(
      this,
      "WebsiteHostedZone",
      {
        domainName: props.hostedZoneDomain,
      }
    );

    const websiteCert = new acm.DnsValidatedCertificate(this, "WebsiteCert", {
      domainName: props.websiteDomain,
      hostedZone: hostedZone,
      region: "us-east-1",
    });

    const websiteBucket = new s3.Bucket(scope, "WebsiteBucket", {
      publicReadAccess: false,
      encryption: props.encryptBucket
        ? s3.BucketEncryption.S3_MANAGED
        : s3.BucketEncryption.UNENCRYPTED,
    });

    const websiteDist = new cloudfront.Distribution(this, "WebsiteDist", {
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket),
        allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
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
      domainNames: [props.websiteDomain],
      certificate: websiteCert,
    });

    new s3deploy.BucketDeployment(scope, "WebsiteDeploy", {
      sources: [s3deploy.Source.asset(props.websiteFolder)],
      destinationBucket: websiteBucket,
      distribution: websiteDist,
      distributionPaths: ["/", `/${props.indexDoc}`],
    });

    new route53.ARecord(this, "WebisteAlias", {
      zone: hostedZone,
      recordName: props.websiteDomain,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(websiteDist)
      ),
    });
  }
}

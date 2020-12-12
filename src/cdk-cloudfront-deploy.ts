import * as acm from '@aws-cdk/aws-certificatemanager';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as origins from '@aws-cdk/aws-cloudfront-origins';
import * as route53 from '@aws-cdk/aws-route53';
import * as targets from '@aws-cdk/aws-route53-targets';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import * as cdk from '@aws-cdk/core';

export interface BasicSiteConfiguration {
  readonly websiteFolder: string;
  readonly indexDoc:string;
  readonly errorDoc?:string;
  readonly encryptBucket?:boolean;
  readonly websiteDomain?: string;
  readonly websiteSubDomain?: string;
}

export interface CloudfrontSiteConfiguration {
  readonly websiteFolder: string;
  readonly indexDoc:string;
  readonly encryptBucket?:boolean;
  readonly hostedZoneDomain: string;
  readonly websiteDomain: string;
}

export class CreateBasicSite extends cdk.Construct {
  constructor(scope: cdk.Construct, id:string, props:BasicSiteConfiguration) {
    super(scope, id);

    if (props.websiteDomain && props.websiteSubDomain) {
      new s3.Bucket(scope, 'WebsiteRedirectBucket', {
        bucketName: props.websiteSubDomain,
        websiteRedirect: {
          hostName: props.websiteDomain,
          protocol: s3.RedirectProtocol.HTTP,
        },
      });
    }

    const websiteBucket = new s3.Bucket(scope, 'WebsiteBucket', {
      bucketName: props.websiteDomain,
      websiteIndexDocument: props.indexDoc,
      websiteErrorDocument: props.errorDoc,
      publicReadAccess: true,
      encryption: props.encryptBucket ? s3.BucketEncryption.S3_MANAGED : s3.BucketEncryption.UNENCRYPTED,
    });

    new s3deploy.BucketDeployment(scope, 'WebsiteDeploy', {
      sources: [s3deploy.Source.asset(props.websiteFolder)],
      destinationBucket: websiteBucket,
    });
  }
}

export class CreateCloudfrontSite extends cdk.Construct {
  constructor(scope: cdk.Construct, id:string, props:CloudfrontSiteConfiguration) {
    super(scope, id);

    const hostedZone = route53.HostedZone.fromLookup(this, 'WebsiteHostedZone', {
      domainName: props.hostedZoneDomain,
    });

    const websiteBucket = new s3.Bucket(scope, 'WebsiteBucket', {
      publicReadAccess: false,
      encryption: props.encryptBucket ? s3.BucketEncryption.S3_MANAGED : s3.BucketEncryption.UNENCRYPTED,
    });

    new s3deploy.BucketDeployment(scope, 'WebsiteDeploy', {
      sources: [s3deploy.Source.asset(props.websiteFolder)],
      destinationBucket: websiteBucket,
    });

    const websiteCert = new acm.DnsValidatedCertificate(this, 'WebsiteCert', {
      domainName: props.websiteDomain,
      hostedZone: hostedZone,
      region: 'us-east-1',
    });

    const websiteDist = new cloudfront.Distribution(this, 'WebsiteDist', {
      defaultBehavior: { origin: new origins.S3Origin(websiteBucket) },
      defaultRootObject: props.indexDoc,
      domainNames: [props.websiteDomain],
      certificate: websiteCert,
    });

    new route53.ARecord(this, 'WebisteAlias', {
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(websiteDist)),
    });
  }
}
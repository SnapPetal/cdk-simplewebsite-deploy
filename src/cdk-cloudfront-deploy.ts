import * as s3 from '@aws-cdk/aws-s3';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import * as cdk from '@aws-cdk/core';

export interface WebsiteConfiguration {
  readonly websiteFolder: string;
  readonly indexDoc:string;
  readonly errorDoc?:string;
  readonly encryptBucket?:boolean;
  readonly websiteDomain?: string;
  readonly websiteSubDomain?: string;
}

export class CreateBasicSite extends cdk.Construct {
  constructor(scope: cdk.Construct, id:string, props:WebsiteConfiguration) {
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

    new s3deploy.BucketDeployment(scope, 'DeployWebsite', {
      sources: [s3deploy.Source.asset(props.websiteFolder)],
      destinationBucket: websiteBucket,
    });
  }
}

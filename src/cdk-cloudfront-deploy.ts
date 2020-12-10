import * as s3 from '@aws-cdk/aws-s3';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import * as cdk from '@aws-cdk/core';

export interface GlobalConfiguration {
  readonly encryptBucket:boolean;
}

export interface WebsiteConfiguration {
  readonly websiteFolder: string;
  readonly indexDoc:string;
  readonly errorDoc?:string;
}

export default class CdkCloudfrontDeploy extends cdk.Construct {
  globalConfig: GlobalConfiguration;

  constructor(scope: cdk.Construct, id:string, props: GlobalConfiguration) {
    super(scope, id);

    if (typeof props !== 'undefined') {
      this.globalConfig = props;
    } else {
      this.globalConfig = {
        encryptBucket: false,
      };
    }
  }

  public createBasicSite(config:WebsiteConfiguration) {

    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      websiteIndexDocument: config.indexDoc,
      publicReadAccess: true,
      encryption: this.globalConfig.encryptBucket ? s3.BucketEncryption.KMS_MANAGED : s3.BucketEncryption.UNENCRYPTED,
    });

    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset(config.websiteFolder)],
      destinationBucket: websiteBucket,
    });
  }
}
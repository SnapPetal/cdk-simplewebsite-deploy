import {
  expect,
  haveResource,
  haveResourceLike,
} from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import CdkCloudfrontDeploy from '../src/cdk-cloudfront-deploy';

describe('Create basic website', () => {
  it('should have a valid basic website', ()=>{
    const stack = new cdk.Stack();
    const newLocal = new CdkCloudfrontDeploy(
      stack,
      'test-website', {
        encryptBucket: false,
      });
    const cdkCloudfrontDeploy = newLocal;
    cdkCloudfrontDeploy.createBasicSite({
      websiteFolder: './test/my-website',
      indexDoc: 'index.html',
    });

    expect(stack).to(haveResource('AWS::S3::Bucket', {
      WebsiteConfiguration: {
        IndexDocument: 'index.html',
      },
    }));

    expect(stack).to(haveResource('Custom::CDKBucketDeployment'));

    expect(stack).to(haveResourceLike('AWS::S3::BucketPolicy', {
      PolicyDocument: {
        Statement: [
          {
            Action: 's3:GetObject',
            Effect: 'Allow',
            Principal: '*',
          },
        ],
      },
    }));
  });
  it('should have a valid basic website with error page', ()=>{
    const stack = new cdk.Stack();
    const newLocal = new CdkCloudfrontDeploy(
      stack,
      'test-website', {
        encryptBucket: false,
      });
    const cdkCloudfrontDeploy = newLocal;
    cdkCloudfrontDeploy.createBasicSite({
      websiteFolder: './test/my-website',
      indexDoc: 'index.html',
      errorDoc: 'error.html',
    });

    expect(stack).to(haveResource('AWS::S3::Bucket', {
      WebsiteConfiguration: {
        IndexDocument: 'index.html',
      },
    }));

    expect(stack).to(haveResource('Custom::CDKBucketDeployment'));

    expect(stack).to(haveResourceLike('AWS::S3::BucketPolicy', {
      PolicyDocument: {
        Statement: [
          {
            Action: 's3:GetObject',
            Effect: 'Allow',
            Principal: '*',
          },
        ],
      },
    }));
  });
  it('should have a valid basic website with encryption', ()=>{
    const stack = new cdk.Stack();
    const newLocal = new CdkCloudfrontDeploy(
      stack,
      'test-website', {
        encryptBucket: true,
      });
    const cdkCloudfrontDeploy = newLocal;
    cdkCloudfrontDeploy.createBasicSite({
      websiteFolder: './test/my-website',
      indexDoc: 'index.html',
    });

    expect(stack).to(haveResource('AWS::S3::Bucket', {
      BucketEncryption: {
        ServerSideEncryptionConfiguration: [
          {
            ServerSideEncryptionByDefault: {
              SSEAlgorithm: 'aws:kms',
            },
          },
        ],
      },
      WebsiteConfiguration: {
        IndexDocument: 'index.html',
      },
    }));

    expect(stack).to(haveResource('Custom::CDKBucketDeployment'));

    expect(stack).to(haveResourceLike('AWS::S3::BucketPolicy', {
      PolicyDocument: {
        Statement: [
          {
            Action: 's3:GetObject',
            Effect: 'Allow',
            Principal: '*',
          },
        ],
      },
    }));
  });
});
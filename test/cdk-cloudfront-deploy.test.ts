import {
  expect,
  haveResource,
  haveResourceLike,
} from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { CreateBasicSite } from '../src/cdk-cloudfront-deploy';

describe('Create basic website', () => {
  it('should have a valid basic website', ()=>{
    const stack = new cdk.Stack();
    new CreateBasicSite(stack, 'test-website', {
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

    new CreateBasicSite(stack, 'test-website', {
      websiteFolder: './test/my-website',
      indexDoc: 'index.html',
      errorDoc: 'error.html',
    });

    expect(stack).to(haveResource('AWS::S3::Bucket', {
      WebsiteConfiguration: {
        IndexDocument: 'index.html',
        ErrorDocument: 'error.html',
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
    new CreateBasicSite(stack, 'test-website', {
      websiteFolder: './test/my-website',
      indexDoc: 'index.html',
      encryptBucket: true,
    });

    expect(stack).to(haveResource('AWS::S3::Bucket', {
      BucketEncryption: {
        ServerSideEncryptionConfiguration: [
          {
            ServerSideEncryptionByDefault: {
              SSEAlgorithm: 'AES256',
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
  it('should have a valid basic website with custom domain', ()=>{
    const stack = new cdk.Stack();
    new CreateBasicSite(stack, 'test-website', {
      websiteFolder: './test/my-website',
      indexDoc: 'index.html',
      websiteDomain: 'example.com',
    });

    expect(stack).to(haveResource('AWS::S3::Bucket', {
      BucketName: 'example.com',
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
  it('should have a valid basic website with custom domain and sub-domain', ()=>{
    const stack = new cdk.Stack();
    new CreateBasicSite(stack, 'test-website', {
      websiteFolder: './test/my-website',
      indexDoc: 'index.html',
      websiteDomain: 'example.com',
      websiteSubDomain: 'www.example.com',
    });

    expect(stack).to(haveResource('AWS::S3::Bucket', {
      BucketName: 'example.com',
      WebsiteConfiguration: {
        IndexDocument: 'index.html',
      },
    }));

    expect(stack).to(haveResource('AWS::S3::Bucket', {
      BucketName: 'www.example.com',
      WebsiteConfiguration: {
        RedirectAllRequestsTo: {
          HostName: 'example.com',
          Protocol: 'http',
        },
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
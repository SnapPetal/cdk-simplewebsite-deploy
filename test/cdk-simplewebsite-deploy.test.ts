import '@aws-cdk/assert/jest';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as cdk from '@aws-cdk/core';
import {
  CreateBasicSite,
  CreateCloudfrontSite,
} from '../src/cdk-simplewebsite-deploy';

describe('Create basic website', () => {
  it('should have a valid basic website with error page', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TargetStack', {
      env: {
        account: '234567890123',
        region: 'us-east-1',
      },
    });
    new CreateBasicSite(stack, 'test-website', {
      websiteFolder: './test/my-website',
      indexDoc: 'index.html',
      errorDoc: 'error.html',
      hostedZone: 'example.com',
    });

    expect(stack).toHaveResource('AWS::S3::Bucket', {
      WebsiteConfiguration: {
        IndexDocument: 'index.html',
        ErrorDocument: 'error.html',
      },
    });

    expect(stack).toHaveResource('Custom::CDKBucketDeployment');

    expect(stack).toHaveResourceLike('AWS::S3::BucketPolicy', {
      PolicyDocument: {
        Statement: [
          {
            Action: 's3:GetObject',
            Effect: 'Allow',
            Principal: '*',
          },
        ],
      },
    });
  });
  it('should have a valid basic website with encryption', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TargetStack', {
      env: {
        account: '234567890123',
        region: 'us-east-1',
      },
    });
    new CreateBasicSite(stack, 'test-website', {
      websiteFolder: './test/my-website',
      indexDoc: 'index.html',
      hostedZone: 'example.com',
    });

    expect(stack).toHaveResource('AWS::S3::Bucket', {
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
    });

    expect(stack).toHaveResource('Custom::CDKBucketDeployment');

    expect(stack).toHaveResourceLike('AWS::S3::BucketPolicy', {
      PolicyDocument: {
        Statement: [
          {
            Action: 's3:GetObject',
            Effect: 'Allow',
            Principal: '*',
          },
        ],
      },
    });
  });
  it('should have a valid basic website with custom domain', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TargetStack', {
      env: {
        account: '234567890123',
        region: 'us-east-1',
      },
    });
    new CreateBasicSite(stack, 'test-website', {
      websiteFolder: './test/my-website',
      indexDoc: 'index.html',
      hostedZone: 'example.com',
    });

    expect(stack).toHaveResource('AWS::S3::Bucket', {
      BucketName: 'example.com',
      WebsiteConfiguration: {
        IndexDocument: 'index.html',
      },
    });

    expect(stack).toHaveResource('Custom::CDKBucketDeployment');

    expect(stack).toHaveResourceLike('AWS::S3::BucketPolicy', {
      PolicyDocument: {
        Statement: [
          {
            Action: 's3:GetObject',
            Effect: 'Allow',
            Principal: '*',
          },
        ],
      },
    });

    expect(stack).toHaveResourceLike('AWS::Route53::RecordSet', {
      Name: 'example.com.',
      Type: 'A',
    });

    expect(stack).toHaveResourceLike('AWS::Route53::RecordSet', {
      Name: 'www.example.com.',
      Type: 'A',
    });
  });
});
describe('Create cloudfront website', () => {
  it('should have a valid cloudfront website', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TargetStack', {
      env: {
        account: '234567890123',
        region: 'us-east-1',
      },
    });
    new CreateCloudfrontSite(stack, 'test-website', {
      websiteFolder: './test/my-website',
      indexDoc: 'index.html',
      hostedZone: 'example.com',
    });

    expect(stack).toHaveResourceLike('AWS::S3::BucketPolicy', {
      PolicyDocument: {
        Statement: [
          {
            Action: ['s3:GetObject*', 's3:GetBucket*', 's3:List*'],
            Effect: 'Allow',
          },
        ],
      },
    });

    expect(stack).toHaveResource('Custom::CDKBucketDeployment');

    expect(stack).toHaveResourceLike('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        Aliases: ['example.com'],
        DefaultRootObject: 'index.html',
        Enabled: true,
        HttpVersion: 'http2',
        IPV6Enabled: true,
      },
    });

    expect(stack).toHaveResourceLike('AWS::Route53::RecordSet', {
      Name: 'example.com.',
      Type: 'A',
    });
  });
  it('should throw an error when domain and subDomain are defined for a cloudfront website', () => {
    expect(() => {
      const app = new cdk.App();
      const stack = new cdk.Stack(app, 'TargetStack', {
        env: {
          account: '234567890123',
          region: 'us-east-1',
        },
      });
      new CreateCloudfrontSite(stack, 'test-website', {
        websiteFolder: './test/my-website',
        indexDoc: 'index.html',
        hostedZone: 'example.com',
        domain: 'domain.example.com',
        subDomain: 'subdomain.example.com',
      });
    }).toThrow('Domain and sub domain parameters cannot both be defined');
  });
  it('should have a valid cloudfront website with single domain', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TargetStack', {
      env: {
        account: '234567890123',
        region: 'us-east-1',
      },
    });
    new CreateCloudfrontSite(stack, 'test-website', {
      websiteFolder: './test/my-website',
      indexDoc: 'index.html',
      hostedZone: 'example.com',
      domain: 'sample.example.com',
    });

    expect(stack).toHaveResourceLike('AWS::S3::BucketPolicy', {
      PolicyDocument: {
        Statement: [
          {
            Action: ['s3:GetObject*', 's3:GetBucket*', 's3:List*'],
            Effect: 'Allow',
          },
        ],
      },
    });

    expect(stack).toHaveResource('Custom::CDKBucketDeployment');

    expect(stack).toHaveResourceLike('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        Aliases: ['sample.example.com'],
        DefaultRootObject: 'index.html',
        Enabled: true,
        HttpVersion: 'http2',
        IPV6Enabled: true,
      },
    });

    expect(stack).toHaveResourceLike('AWS::Route53::RecordSet', {
      Name: 'sample.example.com.',
      Type: 'A',
    });
  });
  it('should have a valid cloudfront website with custom error', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TargetStack', {
      env: {
        account: '234567890123',
        region: 'us-east-1',
      },
    });
    new CreateCloudfrontSite(stack, 'test-website', {
      websiteFolder: './test/my-website',
      indexDoc: 'index.html',
      errorDoc: 'error.html',
      hostedZone: 'example.com',
      subDomain: 'www.example.com',
    });

    expect(stack).toHaveResourceLike('AWS::S3::BucketPolicy', {
      PolicyDocument: {
        Statement: [
          {
            Action: ['s3:GetObject*', 's3:GetBucket*', 's3:List*'],
            Effect: 'Allow',
          },
        ],
      },
    });

    expect(stack).toHaveResource('Custom::CDKBucketDeployment');

    expect(stack).toHaveResourceLike('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        Aliases: ['example.com', 'www.example.com'],
        CustomErrorResponses: [
          {
            ErrorCode: 404,
            ResponseCode: 404,
            ResponsePagePath: '/error.html',
          },
        ],
        DefaultRootObject: 'index.html',
        Enabled: true,
        HttpVersion: 'http2',
        IPV6Enabled: true,
      },
    });

    expect(stack).toHaveResourceLike('AWS::Route53::RecordSet', {
      Name: 'www.example.com.',
      Type: 'A',
    });
  });
  it('should have a valid cloudfront website with encrypted S3 bucket', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TargetStack', {
      env: {
        account: '234567890123',
        region: 'us-east-1',
      },
    });

    new CreateCloudfrontSite(stack, 'test-website', {
      websiteFolder: './test/my-website',
      indexDoc: 'index.html',
      hostedZone: 'example.com',
      subDomain: 'www.example.com',
    });

    expect(stack).toHaveResource('AWS::S3::Bucket', {
      BucketEncryption: {
        ServerSideEncryptionConfiguration: [
          {
            ServerSideEncryptionByDefault: {
              SSEAlgorithm: 'AES256',
            },
          },
        ],
      },
    });

    expect(stack).toHaveResourceLike('AWS::S3::BucketPolicy', {
      PolicyDocument: {
        Statement: [
          {
            Action: ['s3:GetObject*', 's3:GetBucket*', 's3:List*'],
            Effect: 'Allow',
          },
        ],
      },
    });

    expect(stack).toHaveResource('Custom::CDKBucketDeployment');

    expect(stack).toHaveResourceLike('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        Aliases: ['example.com', 'www.example.com'],
        DefaultRootObject: 'index.html',
        Enabled: true,
        HttpVersion: 'http2',
        IPV6Enabled: true,
      },
    });
  });
  it('should have a valid cloudfront website with price class all', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TargetStack', {
      env: {
        account: '234567890123',
        region: 'us-east-1',
      },
    });
    new CreateCloudfrontSite(stack, 'test-website', {
      websiteFolder: './test/my-website',
      indexDoc: 'index.html',
      hostedZone: 'example.com',
      subDomain: 'www.example.com',
      priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
    });

    expect(stack).toHaveResourceLike('AWS::S3::BucketPolicy', {
      PolicyDocument: {
        Statement: [
          {
            Action: ['s3:GetObject*', 's3:GetBucket*', 's3:List*'],
            Effect: 'Allow',
          },
        ],
      },
    });

    expect(stack).toHaveResource('Custom::CDKBucketDeployment');

    expect(stack).toHaveResourceLike('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        Aliases: ['example.com', 'www.example.com'],
        DefaultRootObject: 'index.html',
        Enabled: true,
        HttpVersion: 'http2',
        IPV6Enabled: true,
        PriceClass: 'PriceClass_All',
      },
    });
  });
  it('should have a valid cloudfront website with default price class 100', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TargetStack', {
      env: {
        account: '234567890123',
        region: 'us-east-1',
      },
    });
    new CreateCloudfrontSite(stack, 'test-website', {
      websiteFolder: './test/my-website',
      indexDoc: 'index.html',
      hostedZone: 'example.com',
      subDomain: 'www.example.com',
    });

    expect(stack).toHaveResourceLike('AWS::S3::BucketPolicy', {
      PolicyDocument: {
        Statement: [
          {
            Action: ['s3:GetObject*', 's3:GetBucket*', 's3:List*'],
            Effect: 'Allow',
          },
        ],
      },
    });

    expect(stack).toHaveResource('Custom::CDKBucketDeployment');

    expect(stack).toHaveResourceLike('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        Aliases: ['example.com', 'www.example.com'],
        DefaultRootObject: 'index.html',
        Enabled: true,
        HttpVersion: 'http2',
        IPV6Enabled: true,
        PriceClass: 'PriceClass_100',
      },
    });
  });
});

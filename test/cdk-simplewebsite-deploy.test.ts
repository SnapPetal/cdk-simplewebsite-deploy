import { expect, haveResource, haveResourceLike } from '@aws-cdk/assert';
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

    expect(stack).to(
      haveResource('AWS::S3::Bucket', {
        WebsiteConfiguration: {
          IndexDocument: 'index.html',
          ErrorDocument: 'error.html',
        },
      }),
    );

    expect(stack).to(haveResource('Custom::CDKBucketDeployment'));

    expect(stack).to(
      haveResourceLike('AWS::S3::BucketPolicy', {
        PolicyDocument: {
          Statement: [
            {
              Action: 's3:GetObject',
              Effect: 'Allow',
              Principal: '*',
            },
          ],
        },
      }),
    );
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

    expect(stack).to(
      haveResource('AWS::S3::Bucket', {
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
      }),
    );

    expect(stack).to(haveResource('Custom::CDKBucketDeployment'));

    expect(stack).to(
      haveResourceLike('AWS::S3::BucketPolicy', {
        PolicyDocument: {
          Statement: [
            {
              Action: 's3:GetObject',
              Effect: 'Allow',
              Principal: '*',
            },
          ],
        },
      }),
    );
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

    expect(stack).to(
      haveResource('AWS::S3::Bucket', {
        BucketName: 'example.com',
        WebsiteConfiguration: {
          IndexDocument: 'index.html',
        },
      }),
    );

    expect(stack).to(haveResource('Custom::CDKBucketDeployment'));

    expect(stack).to(
      haveResourceLike('AWS::S3::BucketPolicy', {
        PolicyDocument: {
          Statement: [
            {
              Action: 's3:GetObject',
              Effect: 'Allow',
              Principal: '*',
            },
          ],
        },
      }),
    );

    expect(stack).to(
      haveResourceLike('AWS::Route53::RecordSet', {
        Name: 'example.com.',
        Type: 'A',
      }),
    );

    expect(stack).to(
      haveResourceLike('AWS::Route53::RecordSet', {
        Name: 'www.example.com.',
        Type: 'A',
      }),
    );
  });
  it('should have a valid basic website with custom sub domain', () => {
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
      subDomain: 'sub.example.com',
    });

    expect(stack).to(
      haveResource('AWS::S3::Bucket', {
        BucketName: 'example.com',
        WebsiteConfiguration: {
          IndexDocument: 'index.html',
        },
      }),
    );

    expect(stack).to(
      haveResource('AWS::S3::Bucket', {
        BucketName: 'www.example.com',
        WebsiteConfiguration: {
          RedirectAllRequestsTo: {
            HostName: 'example.com',
            Protocol: 'http',
          },
        },
      }),
    );

    expect(stack).to(haveResource('Custom::CDKBucketDeployment'));

    expect(stack).to(
      haveResourceLike('AWS::S3::BucketPolicy', {
        PolicyDocument: {
          Statement: [
            {
              Action: 's3:GetObject',
              Effect: 'Allow',
              Principal: '*',
            },
          ],
        },
      }),
    );

    expect(stack).to(
      haveResourceLike('AWS::Route53::RecordSet', {
        Name: 'example.com.',
        Type: 'A',
      }),
    );

    expect(stack).to(
      haveResourceLike('AWS::Route53::RecordSet', {
        Name: 'sub.example.com.',
        Type: 'A',
      }),
    );
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
      subDomain: 'www.example.com',
    });

    expect(stack).to(
      haveResourceLike('AWS::S3::BucketPolicy', {
        PolicyDocument: {
          Statement: [
            {
              Action: ['s3:GetObject*', 's3:GetBucket*', 's3:List*'],
              Effect: 'Allow',
            },
          ],
        },
      }),
    );

    expect(stack).to(haveResource('Custom::CDKBucketDeployment'));

    expect(stack).to(
      haveResourceLike('AWS::CloudFront::Distribution', {
        DistributionConfig: {
          Aliases: ['example.com', 'www.example.com'],
          DefaultRootObject: 'index.html',
          Enabled: true,
          HttpVersion: 'http2',
          IPV6Enabled: true,
          Origins: [
            {
              DomainName: {
                'Fn::GetAtt': ['WebsiteBucket75C24D94', 'RegionalDomainName'],
              },
              Id: 'TargetStacktestwebsiteWebsiteDistOrigin17319B9B7',
              S3OriginConfig: {
                OriginAccessIdentity: {
                  'Fn::Join': [
                    '',
                    [
                      'origin-access-identity/cloudfront/',
                      {
                        Ref: 'testwebsiteWebsiteDistOrigin1S3Origin1E3934D7',
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      }),
    );

    expect(stack).to(
      haveResourceLike('AWS::Route53::RecordSet', {
        Name: 'example.com.',
        Type: 'A',
      }),
    );

    expect(stack).to(
      haveResourceLike('AWS::Route53::RecordSet', {
        Name: 'www.example.com.',
        Type: 'A',
      }),
    );
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

    expect(stack).to(
      haveResourceLike('AWS::S3::BucketPolicy', {
        PolicyDocument: {
          Statement: [
            {
              Action: ['s3:GetObject*', 's3:GetBucket*', 's3:List*'],
              Effect: 'Allow',
            },
          ],
        },
      }),
    );

    expect(stack).to(haveResource('Custom::CDKBucketDeployment'));

    expect(stack).to(
      haveResourceLike('AWS::CloudFront::Distribution', {
        DistributionConfig: {
          Aliases: ['example.com', 'www.example.com'],
          CustomErrorResponses: [
            {
              ErrorCode: 404,
              ResponseCode: 404,
              ResponsePagePath: '/error.html',
            },
            {
              ErrorCachingMinTTL: 2,
              ErrorCode: 500,
            },
            {
              ErrorCode: 403,
              ResponseCode: 200,
              ResponsePagePath: '/index.html',
            },
          ],
          DefaultRootObject: 'index.html',
          Enabled: true,
          HttpVersion: 'http2',
          IPV6Enabled: true,
          Origins: [
            {
              DomainName: {
                'Fn::GetAtt': ['WebsiteBucket75C24D94', 'RegionalDomainName'],
              },
              Id: 'TargetStacktestwebsiteWebsiteDistOrigin17319B9B7',
              S3OriginConfig: {
                OriginAccessIdentity: {
                  'Fn::Join': [
                    '',
                    [
                      'origin-access-identity/cloudfront/',
                      {
                        Ref: 'testwebsiteWebsiteDistOrigin1S3Origin1E3934D7',
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      }),
    );

    expect(stack).to(
      haveResourceLike('AWS::Route53::RecordSet', {
        Name: 'www.example.com.',
        Type: 'A',
      }),
    );
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

    expect(stack).to(
      haveResource('AWS::S3::Bucket', {
        BucketEncryption: {
          ServerSideEncryptionConfiguration: [
            {
              ServerSideEncryptionByDefault: {
                SSEAlgorithm: 'AES256',
              },
            },
          ],
        },
      }),
    );

    expect(stack).to(
      haveResourceLike('AWS::S3::BucketPolicy', {
        PolicyDocument: {
          Statement: [
            {
              Action: ['s3:GetObject*', 's3:GetBucket*', 's3:List*'],
              Effect: 'Allow',
            },
          ],
        },
      }),
    );

    expect(stack).to(haveResource('Custom::CDKBucketDeployment'));

    expect(stack).to(
      haveResourceLike('AWS::CloudFront::Distribution', {
        DistributionConfig: {
          Aliases: ['example.com', 'www.example.com'],
          DefaultRootObject: 'index.html',
          Enabled: true,
          HttpVersion: 'http2',
          IPV6Enabled: true,
          Origins: [
            {
              DomainName: {
                'Fn::GetAtt': ['WebsiteBucket75C24D94', 'RegionalDomainName'],
              },
              Id: 'TargetStacktestwebsiteWebsiteDistOrigin17319B9B7',
              S3OriginConfig: {
                OriginAccessIdentity: {
                  'Fn::Join': [
                    '',
                    [
                      'origin-access-identity/cloudfront/',
                      {
                        Ref: 'testwebsiteWebsiteDistOrigin1S3Origin1E3934D7',
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      }),
    );
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

    expect(stack).to(
      haveResourceLike('AWS::S3::BucketPolicy', {
        PolicyDocument: {
          Statement: [
            {
              Action: ['s3:GetObject*', 's3:GetBucket*', 's3:List*'],
              Effect: 'Allow',
            },
          ],
        },
      }),
    );

    expect(stack).to(haveResource('Custom::CDKBucketDeployment'));

    expect(stack).to(
      haveResourceLike('AWS::CloudFront::Distribution', {
        DistributionConfig: {
          Aliases: ['example.com', 'www.example.com'],
          DefaultRootObject: 'index.html',
          Enabled: true,
          HttpVersion: 'http2',
          IPV6Enabled: true,
          Origins: [
            {
              DomainName: {
                'Fn::GetAtt': ['WebsiteBucket75C24D94', 'RegionalDomainName'],
              },
              Id: 'TargetStacktestwebsiteWebsiteDistOrigin17319B9B7',
              S3OriginConfig: {
                OriginAccessIdentity: {
                  'Fn::Join': [
                    '',
                    [
                      'origin-access-identity/cloudfront/',
                      {
                        Ref: 'testwebsiteWebsiteDistOrigin1S3Origin1E3934D7',
                      },
                    ],
                  ],
                },
              },
            },
          ],
          PriceClass: 'PriceClass_All',
        },
      }),
    );
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

    expect(stack).to(
      haveResourceLike('AWS::S3::BucketPolicy', {
        PolicyDocument: {
          Statement: [
            {
              Action: ['s3:GetObject*', 's3:GetBucket*', 's3:List*'],
              Effect: 'Allow',
            },
          ],
        },
      }),
    );

    expect(stack).to(haveResource('Custom::CDKBucketDeployment'));

    expect(stack).to(
      haveResourceLike('AWS::CloudFront::Distribution', {
        DistributionConfig: {
          Aliases: ['example.com', 'www.example.com'],
          DefaultRootObject: 'index.html',
          Enabled: true,
          HttpVersion: 'http2',
          IPV6Enabled: true,
          Origins: [
            {
              DomainName: {
                'Fn::GetAtt': ['WebsiteBucket75C24D94', 'RegionalDomainName'],
              },
              Id: 'TargetStacktestwebsiteWebsiteDistOrigin17319B9B7',
              S3OriginConfig: {
                OriginAccessIdentity: {
                  'Fn::Join': [
                    '',
                    [
                      'origin-access-identity/cloudfront/',
                      {
                        Ref: 'testwebsiteWebsiteDistOrigin1S3Origin1E3934D7',
                      },
                    ],
                  ],
                },
              },
            },
          ],
          PriceClass: 'PriceClass_100',
        },
      }),
    );
  });
});

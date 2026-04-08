import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import {
  CreateBasicSite,
  CreateCloudfrontSite,
} from '../src';

describe('Create basic website', () => {
  it('should have a valid basic website with error page', () => {
    const app = new App();
    const stack = new Stack(app, 'TargetStack', {
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

    Template.fromStack(stack).hasResourceProperties('AWS::S3::Bucket', {
      WebsiteConfiguration: {
        IndexDocument: 'index.html',
        ErrorDocument: 'error.html',
      },
    });

    Template.fromStack(stack).hasResourceProperties('AWS::S3::BucketPolicy', {
      PolicyDocument: {
        Statement: [
          {
            Action: 's3:GetObject',
            Effect: 'Allow',
            Principal: {
              AWS: '*',
            },
            Resource: {
              'Fn::Join': [
                '',
                [
                  {
                    'Fn::GetAtt': [
                      'WebsiteBucket75C24D94',
                      'Arn',
                    ],
                  },
                  '/*',
                ],
              ],
            },
          },
          {
            Action: [
              's3:PutBucketPolicy',
              's3:GetBucket*',
              's3:List*',
              's3:DeleteObject*',
            ],
            Effect: 'Allow',
            Principal: {
              AWS: {
                'Fn::GetAtt': [
                  'CustomS3AutoDeleteObjectsCustomResourceProviderRole3B1BD092',
                  'Arn',
                ],
              },
            },
            Resource: [
              {
                'Fn::GetAtt': [
                  'WebsiteBucket75C24D94',
                  'Arn',
                ],
              },
              {
                'Fn::Join': [
                  '',
                  [
                    {
                      'Fn::GetAtt': [
                        'WebsiteBucket75C24D94',
                        'Arn',
                      ],
                    },
                    '/*',
                  ],
                ],
              },
            ],
          },
        ],
      },
    });
  });
  it('should have a valid basic website with encryption', () => {
    const app = new App();
    const stack = new Stack(app, 'TargetStack', {
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

    Template.fromStack(stack).hasResourceProperties('AWS::S3::Bucket', {
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

    Template.fromStack(stack).hasResourceProperties('AWS::S3::BucketPolicy', {
      PolicyDocument: {
        Statement: [
          {
            Action: 's3:GetObject',
            Effect: 'Allow',
            Principal: {
              AWS: '*',
            },
            Resource: {
              'Fn::Join': [
                '',
                [
                  {
                    'Fn::GetAtt': [
                      'WebsiteBucket75C24D94',
                      'Arn',
                    ],
                  },
                  '/*',
                ],
              ],
            },
          },
          {
            Action: [
              's3:PutBucketPolicy',
              's3:GetBucket*',
              's3:List*',
              's3:DeleteObject*',
            ],
            Effect: 'Allow',
            Principal: {
              AWS: {
                'Fn::GetAtt': [
                  'CustomS3AutoDeleteObjectsCustomResourceProviderRole3B1BD092',
                  'Arn',
                ],
              },
            },
            Resource: [
              {
                'Fn::GetAtt': [
                  'WebsiteBucket75C24D94',
                  'Arn',
                ],
              },
              {
                'Fn::Join': [
                  '',
                  [
                    {
                      'Fn::GetAtt': [
                        'WebsiteBucket75C24D94',
                        'Arn',
                      ],
                    },
                    '/*',
                  ],
                ],
              },
            ],
          },
        ],
      },
    });
  });
  it('should have a valid basic website with custom domain', () => {
    const app = new App();
    const stack = new Stack(app, 'TargetStack', {
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

    Template.fromStack(stack).hasResourceProperties('AWS::S3::Bucket', {
      BucketName: 'example.com',
      WebsiteConfiguration: {
        IndexDocument: 'index.html',
      },
    });

    Template.fromStack(stack).hasResourceProperties('AWS::S3::BucketPolicy', {
      PolicyDocument: {
        Statement: [
          {
            Action: 's3:GetObject',
            Effect: 'Allow',
            Principal: {
              AWS: '*',
            },
            Resource: {
              'Fn::Join': [
                '',
                [
                  {
                    'Fn::GetAtt': [
                      'WebsiteBucket75C24D94',
                      'Arn',
                    ],
                  },
                  '/*',
                ],
              ],
            },
          },
          {
            Action: [
              's3:PutBucketPolicy',
              's3:GetBucket*',
              's3:List*',
              's3:DeleteObject*',
            ],
            Effect: 'Allow',
            Principal: {
              AWS: {
                'Fn::GetAtt': [
                  'CustomS3AutoDeleteObjectsCustomResourceProviderRole3B1BD092',
                  'Arn',
                ],
              },
            },
            Resource: [
              {
                'Fn::GetAtt': [
                  'WebsiteBucket75C24D94',
                  'Arn',
                ],
              },
              {
                'Fn::Join': [
                  '',
                  [
                    {
                      'Fn::GetAtt': [
                        'WebsiteBucket75C24D94',
                        'Arn',
                      ],
                    },
                    '/*',
                  ],
                ],
              },
            ],
          },
        ],
      },
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Route53::RecordSet', {
      Name: 'example.com.',
      Type: 'A',
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Route53::RecordSet', {
      Name: 'www.example.com.',
      Type: 'A',
    });
  });
});
describe('Create cloudfront website', () => {
  it('should have a valid cloudfront website', () => {
    const app = new App();
    const stack = new Stack(app, 'TargetStack', {
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

    Template.fromStack(stack).hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        Aliases: ['example.com'],
        DefaultRootObject: 'index.html',
        Enabled: true,
        HttpVersion: 'http2and3',
        IPV6Enabled: true,
      },
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Route53::RecordSet', {
      Name: 'example.com.',
      Type: 'A',
    });
  });
  it('should throw an error when domain and subDomain are defined for a cloudfront website', () => {
    expect(() => {
      const app = new App();
      const stack = new Stack(app, 'TargetStack', {
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
    const app = new App();
    const stack = new Stack(app, 'TargetStack', {
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

    Template.fromStack(stack).hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        Aliases: ['sample.example.com'],
        DefaultRootObject: 'index.html',
        Enabled: true,
        HttpVersion: 'http2and3',
        IPV6Enabled: true,
      },
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Route53::RecordSet', {
      Name: 'sample.example.com.',
      Type: 'A',
    });
  });
  it('should have a valid cloudfront website with custom error', () => {
    const app = new App();
    const stack = new Stack(app, 'TargetStack', {
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

    Template.fromStack(stack).hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        Aliases: ['example.com', 'www.example.com'],
        CustomErrorResponses: [
          {
            ErrorCode: 404,
            ResponseCode: 404,
            ResponsePagePath: '/error.html',
          },
          {
            ErrorCode: 403,
            ResponseCode: 403,
            ResponsePagePath: '/error.html',
          },
        ],
        DefaultRootObject: 'index.html',
        Enabled: true,
        HttpVersion: 'http2and3',
        IPV6Enabled: true,
      },
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Route53::RecordSet', {
      Name: 'www.example.com.',
      Type: 'A',
    });
  });
  it('should have a valid cloudfront website with price class all', () => {
    const app = new App();
    const stack = new Stack(app, 'TargetStack', {
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

    Template.fromStack(stack).hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        Aliases: ['example.com', 'www.example.com'],
        DefaultRootObject: 'index.html',
        Enabled: true,
        HttpVersion: 'http2and3',
        IPV6Enabled: true,
        PriceClass: 'PriceClass_All',
      },
    });
  });
  it('should have a valid cloudfront website with default price class 100', () => {
    const app = new App();
    const stack = new Stack(app, 'TargetStack', {
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

    Template.fromStack(stack).hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        Aliases: ['example.com', 'www.example.com'],
        DefaultRootObject: 'index.html',
        Enabled: true,
        HttpVersion: 'http2and3',
        IPV6Enabled: true,
        PriceClass: 'PriceClass_100',
      },
    });
  });
  it('should support origin access levels for the default S3 origin', () => {
    const app = new App();
    const stack = new Stack(app, 'TargetStack', {
      env: {
        account: '234567890123',
        region: 'us-east-1',
      },
    });
    new CreateCloudfrontSite(stack, 'test-website', {
      websiteFolder: './test/my-website',
      indexDoc: 'index.html',
      hostedZone: 'example.com',
      originAccessLevels: [
        cloudfront.AccessLevel.READ,
        cloudfront.AccessLevel.LIST,
      ],
    });

    Template.fromStack(stack).hasResourceProperties('AWS::S3::BucketPolicy', {
      PolicyDocument: {
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: Match.arrayWith(['s3:ListBucket']),
            Effect: 'Allow',
            Principal: {
              Service: 'cloudfront.amazonaws.com',
            },
          }),
        ]),
      },
    });
  });
  it('should support cloudfront function associations for the default behavior', () => {
    const app = new App();
    const stack = new Stack(app, 'TargetStack', {
      env: {
        account: '234567890123',
        region: 'us-east-1',
      },
    });
    const rewriteFunction = new cloudfront.Function(stack, 'RewriteFunction', {
      code: cloudfront.FunctionCode.fromInline(
        'function handler(event) { return event.request; }',
      ),
    });

    new CreateCloudfrontSite(stack, 'test-website', {
      websiteFolder: './test/my-website',
      indexDoc: 'index.html',
      hostedZone: 'example.com',
      functionAssociations: [
        {
          eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          function: rewriteFunction,
        },
      ],
    });

    Template.fromStack(stack).hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        DefaultCacheBehavior: Match.objectLike({
          FunctionAssociations: [
            {
              EventType: 'viewer-request',
              FunctionARN: {
                'Fn::GetAtt': [
                  Match.stringLikeRegexp('RewriteFunction'),
                  'FunctionARN',
                ],
              },
            },
          ],
        }),
      },
    });
  });
});

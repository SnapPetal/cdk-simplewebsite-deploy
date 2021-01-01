[![License](https://img.shields.io/badge/License-Apache%202.0-yellowgreen.svg)](https://opensource.org/licenses/Apache-2.0)
![Build](https://github.com/SnapPetal/cdk-cloudfront-deploy/workflows/Build/badge.svg)
![Release](https://github.com/SnapPetal/cdk-cloudfront-deploy/workflows/Release/badge.svg)

# cdk-simplewebsite-deploy
This is an AWS CDK Construct to simplify deploying a single-page website use CloudFront distributions.

## Installation and Usage

```console
npm i cdk-simplewebsite-deploy
```

### [CreateBasicSite](https://github.com/snappetal/cdk-simplewebsite-deploy/blob/main/API.md#cdk-cloudfront-deploy-createbasicsite)

```typescript
import * as cdk from '@aws-cdk/core';
import { CreateBasicSite } from 'cdk-simplewebsite-deploy';

export class PipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CreateBasicSite(stack, 'test-website', {
      websiteFolder: './src/build',
      indexDoc: 'index.html',
      encryptBucket: true,
      hostedZoneDomain: 'example.com',
      websiteDomain: 'example.com',
      websiteSubDomain: 'www.example.com',
    });

  }
}
```

### [CreateCloudfrontSite](https://github.com/snappetal/cdk-simplewebsite-deploy/blob/main/API.md#cdk-cloudfront-deploy-createcloudfrontsite)

```typescript
import * as cdk from '@aws-cdk/core';
import { CreateCloudfrontSite } from 'cdk-simplewebsite-deploy';

export class PipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CreateCloudfrontSite(stack, 'test-website', {
      websiteFolder: './src/dist',
      indexDoc: 'index.html',
      encryptBucket: true,
      hostedZoneDomain: 'example.com',
      websiteDomain: 'www.example.com',
    });

  }
}
```

## License

Distributed under the [Apache-2.0](./LICENSE) license.

# cdk-cloudfront-deploy
This is an AWS CDK Construct to simplify deploying a single-page website use CloudFront distributions.

## Installation and Usage

### Typescript

```console
npm install --save cdk-cloudfront-deploy
```

```typescript
import * as cdk from '@aws-cdk/core';
import { CreateBasicSite } from '../src/cdk-cloudfront-deploy';

export class PipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CreateBasicSite(stack, 'test-website', {
      websiteFolder: './test/my-website',
      indexDoc: 'index.html',
      encryptBucket: true,
    });

  }
}

```

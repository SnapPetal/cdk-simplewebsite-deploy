[![License](https://img.shields.io/badge/License-Apache%202.0-yellowgreen.svg)](https://opensource.org/licenses/Apache-2.0)
![Build](https://github.com/SnapPetal/cdk-simplewebsite-deploy/workflows/build/badge.svg)
![Release](https://github.com/SnapPetal/cdk-simplewebsite-deploy/workflows/release/badge.svg?branch=main)

# cdk-simplewebsite-deploy
This is an AWS CDK v2 construct library for deploying a single-page website with S3, CloudFront, Route 53, and ACM. `CreateCloudfrontSite` is the recommended construct because it uses a private S3 origin with CloudFront Origin Access Control (OAC), while `CreateBasicSite` is deprecated because it creates a public S3 website endpoint.

## Installation and Usage

### [CreateCloudfrontSite](https://github.com/snappetal/cdk-simplewebsite-deploy/blob/main/API.md#cdk-cloudfront-deploy-createcloudfrontsite)
#### Creates a website using a private S3 bucket, a CloudFront distribution, and DNS records in Route 53.
##### Typescript
```console
yarn add cdk-simplewebsite-deploy
```
```typescript
import * as cdk from 'aws-cdk-lib';
import { CreateCloudfrontSite } from 'cdk-simplewebsite-deploy';
import { Construct } from 'constructs';

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CreateCloudfrontSite(this, 'test-website', {
      websiteFolder: './src/dist',
      indexDoc: 'index.html',
      hostedZone: 'example.com',
      subDomain: 'www.example.com',
    });
  }
}
```
##### Java
```xml
<dependency>
	<groupId>com.thonbecker.simplewebsitedeploy</groupId>
	<artifactId>cdk-simplewebsite-deploy</artifactId>
	<version>0.4.2</version>
</dependency>
```
```java
package com.myorg;

import com.thonbecker.simplewebsitedeploy.CreateCloudfrontSite;
import software.amazon.awscdk.Stack;
import software.amazon.awscdk.StackProps;
import software.constructs.Construct;

public class MyProjectStack extends Stack {
    public MyProjectStack(final Construct scope, final String id) {
        this(scope, id, null);
    }

    public MyProjectStack(final Construct scope, final String id, final StackProps props) {
        super(scope, id, props);

        CreateCloudfrontSite.Builder.create(this, "test-website")
                .websiteFolder("./src/build")
                .indexDoc("index.html")
                .hostedZone("example.com")
                .subDomain("www.example.com")
                .build();
    }
}
```
##### Python
```console
pip install cdk-simplewebsite-deploy
```
```python
from aws_cdk import Stack
from cdk_simplewebsite_deploy import CreateCloudfrontSite
from constructs import Construct


class MyProjectStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        CreateCloudfrontSite(self, 'test-website', website_folder='./src/build',
                             index_doc='index.html',
                             hosted_zone='example.com',
                             sub_domain='www.example.com')
```

### [CreateBasicSite](https://github.com/snappetal/cdk-simplewebsite-deploy/blob/main/API.md#cdk-cloudfront-deploy-createbasicsite)
#### Deprecated. Creates a website using public S3 website endpoints with a domain hosted in Route 53.
Use `CreateCloudfrontSite` for new sites. `CreateBasicSite` configures public bucket access so Route 53 can alias directly to the S3 website endpoint.
##### Typescript
```console
yarn add cdk-simplewebsite-deploy
```
```typescript
import * as cdk from 'aws-cdk-lib';
import { CreateBasicSite } from 'cdk-simplewebsite-deploy';
import { Construct } from 'constructs';

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CreateBasicSite(this, 'test-website', {
      websiteFolder: './src/build',
      indexDoc: 'index.html',
      hostedZone: 'example.com',
    });
  }
}
```
##### Java
```xml
<dependency>
	<groupId>com.thonbecker.simplewebsitedeploy</groupId>
	<artifactId>cdk-simplewebsite-deploy</artifactId>
	<version>0.4.2</version>
</dependency>
```
```java
package com.myorg;

import com.thonbecker.simplewebsitedeploy.CreateBasicSite;
import software.amazon.awscdk.Stack;
import software.amazon.awscdk.StackProps;
import software.constructs.Construct;

public class MyProjectStack extends Stack {
    public MyProjectStack(final Construct scope, final String id) {
        this(scope, id, null);
    }

    public MyProjectStack(final Construct scope, final String id, final StackProps props) {
        super(scope, id, props);

        CreateBasicSite.Builder.create(this, "test-website")
                .websiteFolder("./src/build")
                .indexDoc("index.html")
                .hostedZone("example.com")
                .build();
    }
}
```
##### Python
```console
pip install cdk-simplewebsite-deploy
```
```python
from aws_cdk import Stack
from cdk_simplewebsite_deploy import CreateBasicSite
from constructs import Construct

class MyProjectStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        CreateBasicSite(self, 'test-website', website_folder='./src/build',
                        index_doc='index.html',
                        hosted_zone='example.com')
```

## 🚀 Enhanced Features

The `CreateCloudfrontSite` construct includes optional advanced features for security, performance, and monitoring.

### Security Headers
Enable comprehensive security headers including HSTS, X-Frame-Options, Content-Type-Options, and XSS protection:

```typescript
new CreateCloudfrontSite(this, 'secure-website', {
  websiteFolder: './src/dist',
  indexDoc: 'index.html',
  hostedZone: 'example.com',
  enableSecurityHeaders: true, // 🔒 Adds security headers
});
```

### IPv6 Support
Enable IPv6 connectivity with AAAA records:

```typescript
new CreateCloudfrontSite(this, 'ipv6-website', {
  websiteFolder: './src/dist',
  indexDoc: 'index.html',
  hostedZone: 'example.com',
  enableIpv6: true, // 🌐 Adds AAAA records for IPv6
});
```

### Access Logging
Enable CloudFront access logging for analytics and monitoring:

```typescript
new CreateCloudfrontSite(this, 'logged-website', {
  websiteFolder: './src/dist',
  indexDoc: 'index.html',
  hostedZone: 'example.com',
  enableLogging: true, // 📊 Enables access logging
  // logsBucket: myCustomBucket, // Optional: use existing bucket
});
```

### WAF Integration
Integrate with AWS WAF for enhanced security:

```typescript
new CreateCloudfrontSite(this, 'waf-protected-website', {
  websiteFolder: './src/dist',
  indexDoc: 'index.html',
  hostedZone: 'example.com',
  webAclId: 'arn:aws:wafv2:us-east-1:123456789012:global/webacl/my-web-acl/12345678-1234-1234-1234-123456789012', // 🛡️ WAF protection
});
```

### Origin Access Levels
Grant additional OAC permissions to the website bucket. This can be useful when you need CloudFront to distinguish missing objects from access-denied responses.

```typescript
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';

new CreateCloudfrontSite(this, 'website-with-list-access', {
  websiteFolder: './src/dist',
  indexDoc: 'index.html',
  hostedZone: 'example.com',
  originAccessLevels: [
    cloudfront.AccessLevel.READ,
    cloudfront.AccessLevel.LIST,
  ],
});
```

### CloudFront Function Associations
Attach CloudFront Functions to the default behavior for lightweight viewer request or viewer response logic.

```typescript
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';

const rewriteFunction = new cloudfront.Function(this, 'RewriteFunction', {
  code: cloudfront.FunctionCode.fromInline(
    'function handler(event) { return event.request; }',
  ),
});

new CreateCloudfrontSite(this, 'website-with-function', {
  websiteFolder: './src/dist',
  indexDoc: 'index.html',
  hostedZone: 'example.com',
  functionAssociations: [
    {
      eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
      function: rewriteFunction,
    },
  ],
});
```

### Custom Cache Behaviors
Add custom cache behaviors for different content types:

```typescript
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';

new CreateCloudfrontSite(this, 'optimized-website', {
  websiteFolder: './src/dist',
  indexDoc: 'index.html',
  hostedZone: 'example.com',
  additionalBehaviors: {
    '/api/*': {
      origin: myApiOrigin,
      allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
      cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
    },
    '/static/*': {
      cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED_FOR_UNCOMPRESSED_OBJECTS,
    },
  }, // ⚡ Custom caching strategies
});
```

### Custom Error Responses
Define custom error handling:

```typescript
new CreateCloudfrontSite(this, 'custom-errors-website', {
  websiteFolder: './src/dist',
  indexDoc: 'index.html',
  hostedZone: 'example.com',
  customErrorResponses: [
    {
      httpStatus: 404,
      responseHttpStatus: 200,
      responsePagePath: '/index.html', // SPA routing
    },
    {
      httpStatus: 403,
      responseHttpStatus: 200,
      responsePagePath: '/index.html',
    },
  ], // 🎯 Custom error handling
});
```

### Complete Example with All Features
```typescript
import * as cdk from 'aws-cdk-lib';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import { CreateCloudfrontSite } from 'cdk-simplewebsite-deploy';
import { Construct } from 'constructs';

export class AdvancedWebsiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const rewriteFunction = new cloudfront.Function(this, 'RewriteFunction', {
      code: cloudfront.FunctionCode.fromInline(
        'function handler(event) { return event.request; }',
      ),
    });

    new CreateCloudfrontSite(this, 'advanced-website', {
      websiteFolder: './dist',
      indexDoc: 'index.html',
      errorDoc: 'error.html',
      hostedZone: 'example.com',
      subDomain: 'www.example.com',
      
      // Performance & Security
      priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
      enableSecurityHeaders: true,
      enableIpv6: true,
      originAccessLevels: [
        cloudfront.AccessLevel.READ,
        cloudfront.AccessLevel.LIST,
      ],
      
      // Monitoring & Protection
      enableLogging: true,
      webAclId: 'arn:aws:wafv2:us-east-1:123456789012:global/webacl/my-web-acl/12345678-1234-1234-1234-123456789012',
      
      // Custom Behaviors
      additionalBehaviors: {
        '/api/*': {
          allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
          cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
        },
      },

      // Edge Logic
      functionAssociations: [
        {
          eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          function: rewriteFunction,
        },
      ],
      
      // SPA Error Handling
      customErrorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ],
    });
  }
}
```

## 🎯 Key Benefits

### 🔒 **Enhanced Security**
- **Security Headers**: Automatic HSTS, X-Frame-Options, Content-Type-Options, and XSS protection
- **WAF Integration**: Support for AWS WAF Web ACLs for advanced threat protection
- **Origin Access Control**: Modern S3 bucket protection (replaces deprecated OAI)
- **Configurable OAC Permissions**: Optional origin access levels for the website bucket

### ⚡ **Optimized Performance** 
- **Smart Caching**: Optimized cache policies for better performance
- **HTTP/2 & HTTP/3**: Latest protocol support for faster loading
- **Global Edge Locations**: Configurable price classes for worldwide distribution
- **IPv6 Support**: Dual-stack networking for better connectivity
- **CloudFront Functions**: Optional viewer request and response function associations

### 📊 **Comprehensive Monitoring**
- **Access Logging**: CloudFront access logs for analytics
- **Custom Error Handling**: Flexible error response configuration
- **SPA Support**: Built-in single-page application routing support

### 🚀 **Developer Experience**
- **Backward Compatible**: All existing configurations continue to work
- **Type Safe**: Full TypeScript support with comprehensive interfaces
- **CDK v2 Ready**: Built for the latest AWS CDK version
- **Multi-Language**: Support for TypeScript, Python, and Java

## License

Distributed under the [Apache-2.0](./LICENSE) license.

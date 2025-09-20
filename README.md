[![License](https://img.shields.io/badge/License-Apache%202.0-yellowgreen.svg)](https://opensource.org/licenses/Apache-2.0)
![Build](https://github.com/SnapPetal/cdk-simplewebsite-deploy/workflows/build/badge.svg)
![Release](https://github.com/SnapPetal/cdk-simplewebsite-deploy/workflows/release/badge.svg?branch=main)

# cdk-simplewebsite-deploy
This is an AWS CDK Construct to simplify deploying a single-page website using either S3 buckets or CloudFront distributions with enhanced security, performance, and monitoring capabilities.

## Installation and Usage

### [CreateBasicSite](https://github.com/snappetal/cdk-simplewebsite-deploy/blob/main/API.md#cdk-cloudfront-deploy-createbasicsite)
#### Creates a simple website using S3 buckets with a domain hosted in Route 53.
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
##### C#
```console
dotnet add package ThonBecker.CDK.SimpleWebsiteDeploy
```
```cs
using Amazon.CDK;
using ThonBecker.CDK.SimpleWebsiteDeploy;

namespace SimpleWebsiteDeploy
{
    public class PipelineStack : Stack
    {
        internal PipelineStack(Construct scope, string id, IStackProps props = null) : base(scope, id, props)
        {
            new CreateBasicSite(scope, "test-website", new BasicSiteConfiguration()
            {
                WebsiteFolder = "./src/build",
                IndexDoc = "index.html",
                HostedZone = "example.com",
            });
        }
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

import software.amazon.awscdk.core.Construct;
import software.amazon.awscdk.core.Stack;
import software.amazon.awscdk.core.StackProps;
import com.thonbecker.simplewebsitedeploy.CreateBasicSite;

public class MyProjectStack extends Stack {
    public MyProjectStack(final Construct scope, final String id) {
        this(scope, id, null);
    }

    public MyProjectStack(final Construct scope, final String id, final StackProps props) {
        super(scope, id, props);
        
        CreateBasicSite.Builder.create(this, "test-website")
        		.websiteFolder("./src/build")
        		.indexDoc("index.html")
        		.hostedZone("example.com");
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
### [CreateCloudfrontSite](https://github.com/snappetal/cdk-simplewebsite-deploy/blob/main/API.md#cdk-cloudfront-deploy-createcloudfrontsite)
#### Creates a simple website using a CloudFront distribution with a domain hosted in Route 53.
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
##### C#
```console
dotnet add package ThonBecker.CDK.SimpleWebsiteDeploy
```
```cs
using Amazon.CDK;
using ThonBecker.CDK.SimpleWebsiteDeploy;

namespace SimpleWebsiteDeploy
{
    public class PipelineStack : Stack
    {
        internal PipelineStack(Construct scope, string id, IStackProps props = null) : base(scope, id, props)
        {
            new CreateCloudfrontSite(scope, "test-website", new CloudfrontSiteConfiguration()
            {
                WebsiteFolder = "./src/build",
                IndexDoc = "index.html",
                HostedZone = "example.com",
                SubDomain = "www.example.com",
            });
        }
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

import software.amazon.awscdk.core.Construct;
import software.amazon.awscdk.core.Stack;
import software.amazon.awscdk.core.StackProps;
import com.thonbecker.simplewebsitedeploy.CreateCloudfrontSite;

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
        		.subDomain("www.example.com");
    }
}
```
##### Python
```console
pip install cdk-simplewebsite-deploy
```
```python
from aws_cdk import core
from cdk_simplewebsite_deploy import CreateCloudfrontSite


class MyProjectStack(core.Stack):

    def __init__(self, scope: core.Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        CreateCloudfrontSite(self, 'test-website', website_folder='./src/build',
                             index_doc='index.html',
                             hosted_zone='example.com',
                             sub_domain='www.example.com')
```

## 🚀 Enhanced Features

The `CreateCloudfrontSite` construct now includes several optional advanced features for improved security, performance, and monitoring:

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

### ⚡ **Optimized Performance** 
- **Smart Caching**: Optimized cache policies for better performance
- **HTTP/2 & HTTP/3**: Latest protocol support for faster loading
- **Global Edge Locations**: Configurable price classes for worldwide distribution
- **IPv6 Support**: Dual-stack networking for better connectivity

### 📊 **Comprehensive Monitoring**
- **Access Logging**: CloudFront access logs for analytics
- **Custom Error Handling**: Flexible error response configuration
- **SPA Support**: Built-in single-page application routing support

### 🚀 **Developer Experience**
- **Backward Compatible**: All existing configurations continue to work
- **Type Safe**: Full TypeScript support with comprehensive interfaces
- **CDK v2 Ready**: Built for the latest AWS CDK version
- **Multi-Language**: Support for TypeScript, Python, Java, and C#

## License

Distributed under the [Apache-2.0](./LICENSE) license.

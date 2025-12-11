# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### CreateBasicSite <a name="CreateBasicSite" id="cdk-simplewebsite-deploy.CreateBasicSite"></a>

#### Initializers <a name="Initializers" id="cdk-simplewebsite-deploy.CreateBasicSite.Initializer"></a>

```typescript
import { CreateBasicSite } from 'cdk-simplewebsite-deploy'

new CreateBasicSite(scope: Construct, id: string, props: BasicSiteConfiguration)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-simplewebsite-deploy.CreateBasicSite.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-simplewebsite-deploy.CreateBasicSite.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-simplewebsite-deploy.CreateBasicSite.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-simplewebsite-deploy.BasicSiteConfiguration">BasicSiteConfiguration</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-simplewebsite-deploy.CreateBasicSite.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-simplewebsite-deploy.CreateBasicSite.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-simplewebsite-deploy.CreateBasicSite.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-simplewebsite-deploy.BasicSiteConfiguration">BasicSiteConfiguration</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-simplewebsite-deploy.CreateBasicSite.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-simplewebsite-deploy.CreateBasicSite.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-simplewebsite-deploy.CreateBasicSite.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="cdk-simplewebsite-deploy.CreateBasicSite.isConstruct"></a>

```typescript
import { CreateBasicSite } from 'cdk-simplewebsite-deploy'

CreateBasicSite.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk-simplewebsite-deploy.CreateBasicSite.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-simplewebsite-deploy.CreateBasicSite.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-simplewebsite-deploy.CreateBasicSite.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### CreateCloudfrontSite <a name="CreateCloudfrontSite" id="cdk-simplewebsite-deploy.CreateCloudfrontSite"></a>

#### Initializers <a name="Initializers" id="cdk-simplewebsite-deploy.CreateCloudfrontSite.Initializer"></a>

```typescript
import { CreateCloudfrontSite } from 'cdk-simplewebsite-deploy'

new CreateCloudfrontSite(scope: Construct, id: string, props: CloudfrontSiteConfiguration)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-simplewebsite-deploy.CreateCloudfrontSite.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-simplewebsite-deploy.CreateCloudfrontSite.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-simplewebsite-deploy.CreateCloudfrontSite.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-simplewebsite-deploy.CloudfrontSiteConfiguration">CloudfrontSiteConfiguration</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-simplewebsite-deploy.CreateCloudfrontSite.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-simplewebsite-deploy.CreateCloudfrontSite.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-simplewebsite-deploy.CreateCloudfrontSite.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-simplewebsite-deploy.CloudfrontSiteConfiguration">CloudfrontSiteConfiguration</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-simplewebsite-deploy.CreateCloudfrontSite.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-simplewebsite-deploy.CreateCloudfrontSite.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-simplewebsite-deploy.CreateCloudfrontSite.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="cdk-simplewebsite-deploy.CreateCloudfrontSite.isConstruct"></a>

```typescript
import { CreateCloudfrontSite } from 'cdk-simplewebsite-deploy'

CreateCloudfrontSite.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk-simplewebsite-deploy.CreateCloudfrontSite.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-simplewebsite-deploy.CreateCloudfrontSite.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-simplewebsite-deploy.CreateCloudfrontSite.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### BasicSiteConfiguration <a name="BasicSiteConfiguration" id="cdk-simplewebsite-deploy.BasicSiteConfiguration"></a>

#### Initializer <a name="Initializer" id="cdk-simplewebsite-deploy.BasicSiteConfiguration.Initializer"></a>

```typescript
import { BasicSiteConfiguration } from 'cdk-simplewebsite-deploy'

const basicSiteConfiguration: BasicSiteConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-simplewebsite-deploy.BasicSiteConfiguration.property.hostedZone">hostedZone</a></code> | <code>string</code> | Hosted Zone used to create the DNS record for the website. |
| <code><a href="#cdk-simplewebsite-deploy.BasicSiteConfiguration.property.indexDoc">indexDoc</a></code> | <code>string</code> | The index document of the website. |
| <code><a href="#cdk-simplewebsite-deploy.BasicSiteConfiguration.property.websiteFolder">websiteFolder</a></code> | <code>string</code> | Local path to the website folder you want to deploy on S3. |
| <code><a href="#cdk-simplewebsite-deploy.BasicSiteConfiguration.property.errorDoc">errorDoc</a></code> | <code>string</code> | The error document of the website. |

---

##### `hostedZone`<sup>Required</sup> <a name="hostedZone" id="cdk-simplewebsite-deploy.BasicSiteConfiguration.property.hostedZone"></a>

```typescript
public readonly hostedZone: string;
```

- *Type:* string

Hosted Zone used to create the DNS record for the website.

---

##### `indexDoc`<sup>Required</sup> <a name="indexDoc" id="cdk-simplewebsite-deploy.BasicSiteConfiguration.property.indexDoc"></a>

```typescript
public readonly indexDoc: string;
```

- *Type:* string

The index document of the website.

---

##### `websiteFolder`<sup>Required</sup> <a name="websiteFolder" id="cdk-simplewebsite-deploy.BasicSiteConfiguration.property.websiteFolder"></a>

```typescript
public readonly websiteFolder: string;
```

- *Type:* string

Local path to the website folder you want to deploy on S3.

---

##### `errorDoc`<sup>Optional</sup> <a name="errorDoc" id="cdk-simplewebsite-deploy.BasicSiteConfiguration.property.errorDoc"></a>

```typescript
public readonly errorDoc: string;
```

- *Type:* string
- *Default:* No error document.

The error document of the website.

---

### CloudfrontSiteConfiguration <a name="CloudfrontSiteConfiguration" id="cdk-simplewebsite-deploy.CloudfrontSiteConfiguration"></a>

#### Initializer <a name="Initializer" id="cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.Initializer"></a>

```typescript
import { CloudfrontSiteConfiguration } from 'cdk-simplewebsite-deploy'

const cloudfrontSiteConfiguration: CloudfrontSiteConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.hostedZone">hostedZone</a></code> | <code>string</code> | Hosted Zone used to create the DNS record for the website. |
| <code><a href="#cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.indexDoc">indexDoc</a></code> | <code>string</code> | The index document of the website. |
| <code><a href="#cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.websiteFolder">websiteFolder</a></code> | <code>string</code> | Local path to the website folder you want to deploy on S3. |
| <code><a href="#cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.additionalBehaviors">additionalBehaviors</a></code> | <code>{[ key: string ]: aws-cdk-lib.aws_cloudfront.BehaviorOptions}</code> | Optional cache behaviors for different path patterns. |
| <code><a href="#cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.customErrorResponses">customErrorResponses</a></code> | <code>aws-cdk-lib.aws_cloudfront.ErrorResponse[]</code> | Custom error responses for different HTTP status codes. |
| <code><a href="#cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.domain">domain</a></code> | <code>string</code> | Used to deploy a Cloudfront site with a single domain. |
| <code><a href="#cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.enableIpv6">enableIpv6</a></code> | <code>boolean</code> | Enable IPv6 support with AAAA records. |
| <code><a href="#cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.enableLogging">enableLogging</a></code> | <code>boolean</code> | Enable CloudFront access logging. |
| <code><a href="#cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.enableSecurityHeaders">enableSecurityHeaders</a></code> | <code>boolean</code> | Enable response headers policy for security headers. |
| <code><a href="#cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.errorDoc">errorDoc</a></code> | <code>string</code> | The error document of the website. |
| <code><a href="#cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.logsBucket">logsBucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | S3 bucket for CloudFront access logs. |
| <code><a href="#cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.priceClass">priceClass</a></code> | <code>aws-cdk-lib.aws_cloudfront.PriceClass</code> | The price class determines how many edge locations CloudFront will use for your distribution. |
| <code><a href="#cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.subDomain">subDomain</a></code> | <code>string</code> | The subdomain name you want to deploy. |
| <code><a href="#cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.webAclId">webAclId</a></code> | <code>string</code> | Optional WAF Web ACL ARN for enhanced security. |

---

##### `hostedZone`<sup>Required</sup> <a name="hostedZone" id="cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.hostedZone"></a>

```typescript
public readonly hostedZone: string;
```

- *Type:* string

Hosted Zone used to create the DNS record for the website.

---

##### `indexDoc`<sup>Required</sup> <a name="indexDoc" id="cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.indexDoc"></a>

```typescript
public readonly indexDoc: string;
```

- *Type:* string

The index document of the website.

---

##### `websiteFolder`<sup>Required</sup> <a name="websiteFolder" id="cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.websiteFolder"></a>

```typescript
public readonly websiteFolder: string;
```

- *Type:* string

Local path to the website folder you want to deploy on S3.

---

##### `additionalBehaviors`<sup>Optional</sup> <a name="additionalBehaviors" id="cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.additionalBehaviors"></a>

```typescript
public readonly additionalBehaviors: {[ key: string ]: BehaviorOptions};
```

- *Type:* {[ key: string ]: aws-cdk-lib.aws_cloudfront.BehaviorOptions}
- *Default:* No additional cache behaviors.

Optional cache behaviors for different path patterns.

---

##### `customErrorResponses`<sup>Optional</sup> <a name="customErrorResponses" id="cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.customErrorResponses"></a>

```typescript
public readonly customErrorResponses: ErrorResponse[];
```

- *Type:* aws-cdk-lib.aws_cloudfront.ErrorResponse[]
- *Default:* Default error responses based on errorDoc setting.

Custom error responses for different HTTP status codes.

---

##### `domain`<sup>Optional</sup> <a name="domain" id="cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.domain"></a>

```typescript
public readonly domain: string;
```

- *Type:* string
- *Default:* no value

Used to deploy a Cloudfront site with a single domain.

e.g. sample.example.com
If you include a value for both domain and subDomain,
an error will be thrown.

---

##### `enableIpv6`<sup>Optional</sup> <a name="enableIpv6" id="cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.enableIpv6"></a>

```typescript
public readonly enableIpv6: boolean;
```

- *Type:* boolean
- *Default:* false - No IPv6 support.

Enable IPv6 support with AAAA records.

---

##### `enableLogging`<sup>Optional</sup> <a name="enableLogging" id="cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.enableLogging"></a>

```typescript
public readonly enableLogging: boolean;
```

- *Type:* boolean
- *Default:* false - No access logging.

Enable CloudFront access logging.

---

##### `enableSecurityHeaders`<sup>Optional</sup> <a name="enableSecurityHeaders" id="cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.enableSecurityHeaders"></a>

```typescript
public readonly enableSecurityHeaders: boolean;
```

- *Type:* boolean
- *Default:* false - No security headers policy applied.

Enable response headers policy for security headers.

---

##### `errorDoc`<sup>Optional</sup> <a name="errorDoc" id="cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.errorDoc"></a>

```typescript
public readonly errorDoc: string;
```

- *Type:* string
- *Default:* No error document.

The error document of the website.

---

##### `logsBucket`<sup>Optional</sup> <a name="logsBucket" id="cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.logsBucket"></a>

```typescript
public readonly logsBucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket
- *Default:* New bucket created if logging is enabled.

S3 bucket for CloudFront access logs.

If not provided and logging is enabled, a new bucket will be created.

---

##### `priceClass`<sup>Optional</sup> <a name="priceClass" id="cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.priceClass"></a>

```typescript
public readonly priceClass: PriceClass;
```

- *Type:* aws-cdk-lib.aws_cloudfront.PriceClass
- *Default:* PriceClass.PRICE_CLASS_100.

The price class determines how many edge locations CloudFront will use for your distribution.

> [https://aws.amazon.com/cloudfront/pricing/.](https://aws.amazon.com/cloudfront/pricing/.)

---

##### `subDomain`<sup>Optional</sup> <a name="subDomain" id="cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.subDomain"></a>

```typescript
public readonly subDomain: string;
```

- *Type:* string
- *Default:* no value

The subdomain name you want to deploy.

e.g. www.example.com
If you include a value for both domain and subDomain,
an error will be thrown.

---

##### `webAclId`<sup>Optional</sup> <a name="webAclId" id="cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.webAclId"></a>

```typescript
public readonly webAclId: string;
```

- *Type:* string
- *Default:* No WAF integration.

Optional WAF Web ACL ARN for enhanced security.

---




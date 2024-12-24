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

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-simplewebsite-deploy.CreateBasicSite.isConstruct"></a>

```typescript
import { CreateBasicSite } from 'cdk-simplewebsite-deploy'

CreateBasicSite.isConstruct(x: any)
```

Checks if `x` is a construct.

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

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-simplewebsite-deploy.CreateCloudfrontSite.isConstruct"></a>

```typescript
import { CreateCloudfrontSite } from 'cdk-simplewebsite-deploy'

CreateCloudfrontSite.isConstruct(x: any)
```

Checks if `x` is a construct.

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
| <code><a href="#cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.domain">domain</a></code> | <code>string</code> | Used to deploy a Cloudfront site with a single domain. |
| <code><a href="#cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.errorDoc">errorDoc</a></code> | <code>string</code> | The error document of the website. |
| <code><a href="#cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.priceClass">priceClass</a></code> | <code><a href="#cdk-simplewebsite-deploy.PriceClass">PriceClass</a></code> | The price class determines how many edge locations CloudFront will use for your distribution. |
| <code><a href="#cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.subDomain">subDomain</a></code> | <code>string</code> | The subdomain name you want to deploy. |

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

##### `errorDoc`<sup>Optional</sup> <a name="errorDoc" id="cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.errorDoc"></a>

```typescript
public readonly errorDoc: string;
```

- *Type:* string
- *Default:* No error document.

The error document of the website.

---

##### `priceClass`<sup>Optional</sup> <a name="priceClass" id="cdk-simplewebsite-deploy.CloudfrontSiteConfiguration.property.priceClass"></a>

```typescript
public readonly priceClass: PriceClass;
```

- *Type:* <a href="#cdk-simplewebsite-deploy.PriceClass">PriceClass</a>
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



## Enums <a name="Enums" id="Enums"></a>

### PriceClass <a name="PriceClass" id="cdk-simplewebsite-deploy.PriceClass"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-simplewebsite-deploy.PriceClass.PRICE_CLASS_100">PRICE_CLASS_100</a></code> | USA, Canada, Europe, & Israel. |
| <code><a href="#cdk-simplewebsite-deploy.PriceClass.PRICE_CLASS_200">PRICE_CLASS_200</a></code> | PRICE_CLASS_100 + South Africa, Kenya, Middle East, Japan, Singapore, South Korea, Taiwan, Hong Kong, & Philippines. |
| <code><a href="#cdk-simplewebsite-deploy.PriceClass.PRICE_CLASS_ALL">PRICE_CLASS_ALL</a></code> | All locations. |

---

##### `PRICE_CLASS_100` <a name="PRICE_CLASS_100" id="cdk-simplewebsite-deploy.PriceClass.PRICE_CLASS_100"></a>

USA, Canada, Europe, & Israel.

---


##### `PRICE_CLASS_200` <a name="PRICE_CLASS_200" id="cdk-simplewebsite-deploy.PriceClass.PRICE_CLASS_200"></a>

PRICE_CLASS_100 + South Africa, Kenya, Middle East, Japan, Singapore, South Korea, Taiwan, Hong Kong, & Philippines.

---


##### `PRICE_CLASS_ALL` <a name="PRICE_CLASS_ALL" id="cdk-simplewebsite-deploy.PriceClass.PRICE_CLASS_ALL"></a>

All locations.

---


# API Reference

**Classes**

Name|Description
----|-----------
[CreateBasicSite](#cdk-simplewebsite-deploy-createbasicsite)|*No description*
[CreateCloudfrontSite](#cdk-simplewebsite-deploy-createcloudfrontsite)|*No description*


**Structs**

Name|Description
----|-----------
[BasicSiteConfiguration](#cdk-simplewebsite-deploy-basicsiteconfiguration)|*No description*
[CloudfrontSiteConfiguration](#cdk-simplewebsite-deploy-cloudfrontsiteconfiguration)|*No description*


**Enums**

Name|Description
----|-----------
[PriceClass](#cdk-simplewebsite-deploy-priceclass)|*No description*



## class CreateBasicSite  <a id="cdk-simplewebsite-deploy-createbasicsite"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IDependable](#constructs-idependable)
__Extends__: [Construct](#constructs-construct)

### Initializer




```ts
new CreateBasicSite(scope: Construct, id: string, props: BasicSiteConfiguration)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[BasicSiteConfiguration](#cdk-simplewebsite-deploy-basicsiteconfiguration)</code>)  *No description*
  * **hostedZone** (<code>string</code>)  Hosted Zone used to create the DNS record for the website. 
  * **indexDoc** (<code>string</code>)  The index document of the website. 
  * **websiteFolder** (<code>string</code>)  Local path to the website folder you want to deploy on S3. 
  * **errorDoc** (<code>string</code>)  The error document of the website. __*Default*__: No error document.




## class CreateCloudfrontSite  <a id="cdk-simplewebsite-deploy-createcloudfrontsite"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IDependable](#constructs-idependable)
__Extends__: [Construct](#constructs-construct)

### Initializer




```ts
new CreateCloudfrontSite(scope: Construct, id: string, props: CloudfrontSiteConfiguration)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[CloudfrontSiteConfiguration](#cdk-simplewebsite-deploy-cloudfrontsiteconfiguration)</code>)  *No description*
  * **hostedZone** (<code>string</code>)  Hosted Zone used to create the DNS record for the website. 
  * **indexDoc** (<code>string</code>)  The index document of the website. 
  * **websiteFolder** (<code>string</code>)  Local path to the website folder you want to deploy on S3. 
  * **domain** (<code>string</code>)  Used to deploy a Cloudfront site with a single domain. __*Default*__: no value
  * **errorDoc** (<code>string</code>)  The error document of the website. __*Default*__: No error document.
  * **priceClass** (<code>[PriceClass](#cdk-simplewebsite-deploy-priceclass)</code>)  The price class determines how many edge locations CloudFront will use for your distribution. __*Default*__: PriceClass.PRICE_CLASS_100.
  * **subDomain** (<code>string</code>)  The sub-domain name you want to deploy. __*Default*__: no value




## struct BasicSiteConfiguration  <a id="cdk-simplewebsite-deploy-basicsiteconfiguration"></a>






Name | Type | Description 
-----|------|-------------
**hostedZone** | <code>string</code> | Hosted Zone used to create the DNS record for the website.
**indexDoc** | <code>string</code> | The index document of the website.
**websiteFolder** | <code>string</code> | Local path to the website folder you want to deploy on S3.
**errorDoc**? | <code>string</code> | The error document of the website.<br/>__*Default*__: No error document.



## struct CloudfrontSiteConfiguration  <a id="cdk-simplewebsite-deploy-cloudfrontsiteconfiguration"></a>






Name | Type | Description 
-----|------|-------------
**hostedZone** | <code>string</code> | Hosted Zone used to create the DNS record for the website.
**indexDoc** | <code>string</code> | The index document of the website.
**websiteFolder** | <code>string</code> | Local path to the website folder you want to deploy on S3.
**domain**? | <code>string</code> | Used to deploy a Cloudfront site with a single domain.<br/>__*Default*__: no value
**errorDoc**? | <code>string</code> | The error document of the website.<br/>__*Default*__: No error document.
**priceClass**? | <code>[PriceClass](#cdk-simplewebsite-deploy-priceclass)</code> | The price class determines how many edge locations CloudFront will use for your distribution.<br/>__*Default*__: PriceClass.PRICE_CLASS_100.
**subDomain**? | <code>string</code> | The sub-domain name you want to deploy.<br/>__*Default*__: no value



## enum PriceClass  <a id="cdk-simplewebsite-deploy-priceclass"></a>



Name | Description
-----|-----
**PRICE_CLASS_100** |USA, Canada, Europe, & Israel.
**PRICE_CLASS_200** |PRICE_CLASS_100 + South Africa, Kenya, Middle East, Japan, Singapore, South Korea, Taiwan, Hong Kong, & Philippines.
**PRICE_CLASS_ALL** |All locations.



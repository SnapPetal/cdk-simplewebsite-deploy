# API Reference

**Classes**

Name|Description
----|-----------
[CreateBasicSite](#cdk-simplewebsite-deploy-createbasicsite)|*No description*
[CreateCloudfrontSite](#cdk-simplewebsite-deploy-createcloudfrontsite)|*No description*


**Structs**

Name|Description
----|-----------
[SimpleWebsiteConfiguration](#cdk-simplewebsite-deploy-simplewebsiteconfiguration)|*No description*



## class CreateBasicSite  <a id="cdk-simplewebsite-deploy-createbasicsite"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new CreateBasicSite(scope: Construct, id: string, props: SimpleWebsiteConfiguration)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[SimpleWebsiteConfiguration](#cdk-simplewebsite-deploy-simplewebsiteconfiguration)</code>)  *No description*
  * **hostedZoneDomain** (<code>string</code>)  hosted zone used to create the DNS record of your CloudFront distribution. 
  * **indexDoc** (<code>string</code>)  the index docuement of your CloudFront distribution. 
  * **websiteDomain** (<code>string</code>)  the domain you want to deploy to. 
  * **websiteFolder** (<code>string</code>)  local path to the website folder you want to deploy on S3. 
  * **encryptBucket** (<code>boolean</code>)  enable encryption for files in your S3 Bucket. __*Optional*__
  * **errorDoc** (<code>string</code>)  the error document of your CloudFront distribution. __*Optional*__
  * **priceClass** (<code>[PriceClass](#aws-cdk-aws-cloudfront-priceclass)</code>)  the price class determines how many edge locations CloudFront will use for your distribution. __*Optional*__
  * **websiteSubDomain** (<code>string</code>)  the subdomain you want to deploy to default value is www. __*Optional*__




## class CreateCloudfrontSite  <a id="cdk-simplewebsite-deploy-createcloudfrontsite"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new CreateCloudfrontSite(scope: Construct, id: string, props: SimpleWebsiteConfiguration)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[SimpleWebsiteConfiguration](#cdk-simplewebsite-deploy-simplewebsiteconfiguration)</code>)  *No description*
  * **hostedZoneDomain** (<code>string</code>)  hosted zone used to create the DNS record of your CloudFront distribution. 
  * **indexDoc** (<code>string</code>)  the index docuement of your CloudFront distribution. 
  * **websiteDomain** (<code>string</code>)  the domain you want to deploy to. 
  * **websiteFolder** (<code>string</code>)  local path to the website folder you want to deploy on S3. 
  * **encryptBucket** (<code>boolean</code>)  enable encryption for files in your S3 Bucket. __*Optional*__
  * **errorDoc** (<code>string</code>)  the error document of your CloudFront distribution. __*Optional*__
  * **priceClass** (<code>[PriceClass](#aws-cdk-aws-cloudfront-priceclass)</code>)  the price class determines how many edge locations CloudFront will use for your distribution. __*Optional*__
  * **websiteSubDomain** (<code>string</code>)  the subdomain you want to deploy to default value is www. __*Optional*__




## struct SimpleWebsiteConfiguration  <a id="cdk-simplewebsite-deploy-simplewebsiteconfiguration"></a>






Name | Type | Description 
-----|------|-------------
**hostedZoneDomain** | <code>string</code> | hosted zone used to create the DNS record of your CloudFront distribution.
**indexDoc** | <code>string</code> | the index docuement of your CloudFront distribution.
**websiteDomain** | <code>string</code> | the domain you want to deploy to.
**websiteFolder** | <code>string</code> | local path to the website folder you want to deploy on S3.
**encryptBucket**? | <code>boolean</code> | enable encryption for files in your S3 Bucket.<br/>__*Optional*__
**errorDoc**? | <code>string</code> | the error document of your CloudFront distribution.<br/>__*Optional*__
**priceClass**? | <code>[PriceClass](#aws-cdk-aws-cloudfront-priceclass)</code> | the price class determines how many edge locations CloudFront will use for your distribution.<br/>__*Optional*__
**websiteSubDomain**? | <code>string</code> | the subdomain you want to deploy to default value is www.<br/>__*Optional*__




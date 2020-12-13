# API Reference

**Classes**

Name|Description
----|-----------
[CreateBasicSite](#cdk-cloudfront-deploy-createbasicsite)|*No description*
[CreateCloudfrontSite](#cdk-cloudfront-deploy-createcloudfrontsite)|*No description*


**Structs**

Name|Description
----|-----------
[BasicSiteConfiguration](#cdk-cloudfront-deploy-basicsiteconfiguration)|*No description*
[CloudfrontSiteConfiguration](#cdk-cloudfront-deploy-cloudfrontsiteconfiguration)|*No description*



## class CreateBasicSite  <a id="cdk-cloudfront-deploy-createbasicsite"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new CreateBasicSite(scope: Construct, id: string, props: BasicSiteConfiguration)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[BasicSiteConfiguration](#cdk-cloudfront-deploy-basicsiteconfiguration)</code>)  *No description*
  * **indexDoc** (<code>string</code>)  the index docuement of your S3 Bucket. 
  * **websiteFolder** (<code>string</code>)  local path to the website folder you want to deploy on S3. 
  * **encryptBucket** (<code>boolean</code>)  enable encryption for files in your S3 Bucket. __*Optional*__
  * **errorDoc** (<code>string</code>)  the error document of your S3 Bucket. __*Optional*__
  * **websiteDomain** (<code>string</code>)  the domain you want to deploy to. __*Optional*__
  * **websiteSubDomain** (<code>string</code>)  the subdomain you want to deploy to. __*Optional*__




## class CreateCloudfrontSite  <a id="cdk-cloudfront-deploy-createcloudfrontsite"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new CreateCloudfrontSite(scope: Construct, id: string, props: CloudfrontSiteConfiguration)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[CloudfrontSiteConfiguration](#cdk-cloudfront-deploy-cloudfrontsiteconfiguration)</code>)  *No description*
  * **hostedZoneDomain** (<code>string</code>)  hosted zone used to create the DNS record of your CloudFront distribution. 
  * **indexDoc** (<code>string</code>)  the index docuement of your CloudFront distribution. 
  * **websiteDomain** (<code>string</code>)  the domain you want to deploy to. 
  * **websiteFolder** (<code>string</code>)  local path to the website folder you want to deploy on S3. 
  * **encryptBucket** (<code>boolean</code>)  enable encryption for files in your S3 Bucket. __*Optional*__
  * **errorDoc** (<code>string</code>)  the error document of your CloudFront distribution. __*Optional*__




## struct BasicSiteConfiguration  <a id="cdk-cloudfront-deploy-basicsiteconfiguration"></a>






Name | Type | Description 
-----|------|-------------
**indexDoc** | <code>string</code> | the index docuement of your S3 Bucket.
**websiteFolder** | <code>string</code> | local path to the website folder you want to deploy on S3.
**encryptBucket**? | <code>boolean</code> | enable encryption for files in your S3 Bucket.<br/>__*Optional*__
**errorDoc**? | <code>string</code> | the error document of your S3 Bucket.<br/>__*Optional*__
**websiteDomain**? | <code>string</code> | the domain you want to deploy to.<br/>__*Optional*__
**websiteSubDomain**? | <code>string</code> | the subdomain you want to deploy to.<br/>__*Optional*__



## struct CloudfrontSiteConfiguration  <a id="cdk-cloudfront-deploy-cloudfrontsiteconfiguration"></a>






Name | Type | Description 
-----|------|-------------
**hostedZoneDomain** | <code>string</code> | hosted zone used to create the DNS record of your CloudFront distribution.
**indexDoc** | <code>string</code> | the index docuement of your CloudFront distribution.
**websiteDomain** | <code>string</code> | the domain you want to deploy to.
**websiteFolder** | <code>string</code> | local path to the website folder you want to deploy on S3.
**encryptBucket**? | <code>boolean</code> | enable encryption for files in your S3 Bucket.<br/>__*Optional*__
**errorDoc**? | <code>string</code> | the error document of your CloudFront distribution.<br/>__*Optional*__




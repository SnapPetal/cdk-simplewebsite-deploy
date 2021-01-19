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



## class CreateBasicSite 🔹 <a id="cdk-simplewebsite-deploy-createbasicsite"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new CreateBasicSite(scope: Construct, id: string, props: SimpleWebsiteConfiguration)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[SimpleWebsiteConfiguration](#cdk-simplewebsite-deploy-simplewebsiteconfiguration)</code>)  *No description*
  * **hostedZoneDomain** (<code>string</code>)  Hosted Zone used to create the DNS record for the website. 
  * **indexDoc** (<code>string</code>)  The index document of the website. 
  * **websiteDomain** (<code>string</code>)  The domain names you want to deploy. 
  * **websiteFolder** (<code>string</code>)  Local path to the website folder you want to deploy on S3. 
  * **encryptBucket** (<code>boolean</code>)  Enable encryption for files in your S3 Bucket. __*Optional*__
  * **errorDoc** (<code>string</code>)  The error document of the website. __*Optional*__
  * **priceClass** (<code>[PriceClass](#aws-cdk-aws-cloudfront-priceclass)</code>)  The price class determines how many edge locations CloudFront will use for your distribution. __*Optional*__
  * **websiteSubDomain** (<code>string</code>)  The sub-domain name you want to deploy. __*Optional*__




## class CreateCloudfrontSite 🔹 <a id="cdk-simplewebsite-deploy-createcloudfrontsite"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new CreateCloudfrontSite(scope: Construct, id: string, props: SimpleWebsiteConfiguration)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[SimpleWebsiteConfiguration](#cdk-simplewebsite-deploy-simplewebsiteconfiguration)</code>)  *No description*
  * **hostedZoneDomain** (<code>string</code>)  Hosted Zone used to create the DNS record for the website. 
  * **indexDoc** (<code>string</code>)  The index document of the website. 
  * **websiteDomain** (<code>string</code>)  The domain names you want to deploy. 
  * **websiteFolder** (<code>string</code>)  Local path to the website folder you want to deploy on S3. 
  * **encryptBucket** (<code>boolean</code>)  Enable encryption for files in your S3 Bucket. __*Optional*__
  * **errorDoc** (<code>string</code>)  The error document of the website. __*Optional*__
  * **priceClass** (<code>[PriceClass](#aws-cdk-aws-cloudfront-priceclass)</code>)  The price class determines how many edge locations CloudFront will use for your distribution. __*Optional*__
  * **websiteSubDomain** (<code>string</code>)  The sub-domain name you want to deploy. __*Optional*__




## struct SimpleWebsiteConfiguration 🔹 <a id="cdk-simplewebsite-deploy-simplewebsiteconfiguration"></a>






Name | Type | Description 
-----|------|-------------
**hostedZoneDomain**🔹 | <code>string</code> | Hosted Zone used to create the DNS record for the website.
**indexDoc**🔹 | <code>string</code> | The index document of the website.
**websiteDomain**🔹 | <code>string</code> | The domain names you want to deploy.
**websiteFolder**🔹 | <code>string</code> | Local path to the website folder you want to deploy on S3.
**encryptBucket**?🔹 | <code>boolean</code> | Enable encryption for files in your S3 Bucket.<br/>__*Optional*__
**errorDoc**?🔹 | <code>string</code> | The error document of the website.<br/>__*Optional*__
**priceClass**?🔹 | <code>[PriceClass](#aws-cdk-aws-cloudfront-priceclass)</code> | The price class determines how many edge locations CloudFront will use for your distribution.<br/>__*Optional*__
**websiteSubDomain**?🔹 | <code>string</code> | The sub-domain name you want to deploy.<br/>__*Optional*__




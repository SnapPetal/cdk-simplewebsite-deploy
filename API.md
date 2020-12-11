# API Reference

**Classes**

Name|Description
----|-----------
[CreateBasicSite](#cdk-cloudfront-deploy-createbasicsite)|*No description*


**Structs**

Name|Description
----|-----------
[WebsiteConfiguration](#cdk-cloudfront-deploy-websiteconfiguration)|*No description*



## class CreateBasicSite  <a id="cdk-cloudfront-deploy-createbasicsite"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new CreateBasicSite(scope: Construct, id: string, props: WebsiteConfiguration)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[WebsiteConfiguration](#cdk-cloudfront-deploy-websiteconfiguration)</code>)  *No description*
  * **indexDoc** (<code>string</code>)  *No description* 
  * **websiteFolder** (<code>string</code>)  *No description* 
  * **encryptBucket** (<code>boolean</code>)  *No description* __*Optional*__
  * **errorDoc** (<code>string</code>)  *No description* __*Optional*__




## struct WebsiteConfiguration  <a id="cdk-cloudfront-deploy-websiteconfiguration"></a>






Name | Type | Description 
-----|------|-------------
**indexDoc** | <code>string</code> | <span></span>
**websiteFolder** | <code>string</code> | <span></span>
**encryptBucket**? | <code>boolean</code> | __*Optional*__
**errorDoc**? | <code>string</code> | __*Optional*__




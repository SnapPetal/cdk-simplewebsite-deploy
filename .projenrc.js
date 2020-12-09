const { AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  authorAddress: 'thon.becker@gmail.com',
  authorName: 'Thon',
  cdkVersion: '1.77.0',
  name: 'cdk-cloudfront-deploy',
  repository: 'https://github.com/SnapPetal/cdk-cloudfront-deploy',
  cdkAssert: true, 
  cdkDependencies:['@aws-cdk/core','@aws-cdk/aws-s3','@aws-cdk/aws-certificatemanager','@aws-cdk/aws-cloudfront'] ,
  cdkTestDependencies: undefined,
  description: 'This is an AWS CDK Construct to simplify deploying a single-page website use CloudFront distributions.',        
  jest: true,             
  jestOptions: undefined,
  license: 'GPLv3',
  licensed: true,
  allowLibraryDependencies: true,                                          
  antitamper: true,
  autoDetectBin: true,                                                                  
  buildWorkflow: true,                                                
  defaultReleaseBranch: 'main',                                           
  dependabot: true,                                                         
  entrypoint: 'lib/index.js',                                                                  
  mergify: true,                                                     
  mergifyAutoMergeLabel: 'auto-merge'
});

project.synth();

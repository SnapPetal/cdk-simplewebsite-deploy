const { AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  authorAddress: 'thon.becker@gmail.com',
  authorName: 'Thon Becker',
  cdkVersion: '1.78.0',
  jsiiVersion: '1.16.0',
  name: 'cdk-cloudfront-deploy',
  repository: 'https://github.com/SnapPetal/cdk-cloudfront-deploy',
  cdkAssert: true,
  cdkDependencies: ['@aws-cdk/core', '@aws-cdk/aws-route53', '@aws-cdk/aws-route53-targets', '@aws-cdk/aws-s3', '@aws-cdk/aws-s3-deployment', '@aws-cdk/aws-certificatemanager', '@aws-cdk/aws-cloudfront', '@aws-cdk/aws-cloudfront-origins'],
  cdkTestDependencies: undefined,
  description: 'This is an AWS CDK Construct to simplify deploying a single-page website use CloudFront distributions.',
  jest: true,
  jestOptions: undefined,
  license: 'Apache-2.0',
  licensed: true,
  allowLibraryDependencies: true,
  antitamper: true,
  autoDetectBin: true,
  buildWorkflow: true,
  defaultReleaseBranch: 'main',
  dependabot: true,
  mergify: true,
  mergifyAutoMergeLabel: 'auto-merge',
  projenUpgradeAutoMerge: true,
  projenDevDependency: true,
  docgen: false,
});

project.synth();

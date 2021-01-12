const { AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  authorAddress: 'thon.becker@gmail.com',
  authorName: 'Thon Becker',
  cdkVersion: '1.84.0',
  cdkVersionPinning: true,
  name: 'cdk-simplewebsite-deploy',
  repository: 'https://github.com/SnapPetal/cdk-simplewebsite-deploy',
  cdkAssert: true,
  cdkDependencies: ['@aws-cdk/core', '@aws-cdk/aws-route53', '@aws-cdk/aws-route53-targets', '@aws-cdk/aws-s3', '@aws-cdk/aws-s3-deployment', '@aws-cdk/aws-certificatemanager', '@aws-cdk/aws-cloudfront', '@aws-cdk/aws-cloudfront-origins'],
  cdkTestDependencies: undefined,
  description: 'This is an AWS CDK Construct to simplify deploying a single-page website use CloudFront distributions.',
  jest: true,
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
  docgen: true,
  python: {
    distName: 'cdk-simplewebsite-deploy',
    module: 'cdk_simplewebsite_deploy',
  },
  dotnet: {
    dotNetNamespace: 'ThonBecker.CDK.SimpleWebsiteDeploy',
    packageId: 'ThonBecker.CDK.SimpleWebsiteDeploy',
  },
  publishToMaven: {
    javaPackage: 'com.thonbecker.simplewebsitedeploy',
    mavenGroupId: 'com.thonbecker.simplewebsitedeploy',
    mavenArtifactId: 'cdk-simplewebsite-deploy',
  },
});

project.synth();

const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  authorAddress: 'thon.becker@gmail.com',
  authorName: 'Thon Becker',
  stability: 'stable',
  cdkVersion: '2.0.0',
  name: 'cdk-simplewebsite-deploy',
  repository: 'https://github.com/SnapPetal/cdk-simplewebsite-deploy',
  cdkDependencies: ['aws-cdk-lib'],
  devDeps: ['aws-cdk-lib', 'constructs@10.0.5', 'typescript'],
  description: 'This is an AWS CDK Construct to simplify deploying a single-page website use CloudFront distributions.',
  defaultReleaseBranch: 'main',
  publishToPypi: {
    distName: 'cdk-simplewebsite-deploy',
    module: 'cdk_simplewebsite_deploy',
  },
  publishToNuget: {
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

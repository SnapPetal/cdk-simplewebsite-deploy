import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Thon Becker',
  authorAddress: 'thon.becker@gmail.com',
  stability: 'stable',
  cdkVersion: '2.270.0',
  constructsVersion: '10.8.1',
  minNodeVersion: '24.0.0',
  jsiiVersion: '~5.9.37',
  packageManager: javascript.NodePackageManager.PNPM,
  pnpmVersion: '12.4.2',
  projenVersion: '^0.103.25',
  projenrcTs: true,
  majorVersion: 2,
  gitignore: ['.DS_Store', '.idea'],
  name: 'cdk-simplewebsite-deploy',
  repositoryUrl: 'https://github.com/SnapPetal/cdk-simplewebsite-deploy',
  description: 'This is an AWS CDK v2 Construct to simplify deploying a single-page website use CloudFront distributions.',
  defaultReleaseBranch: 'main',
  publishToPypi: {
    distName: 'cdk-simplewebsite-deploy',
    module: 'cdk_simplewebsite_deploy',
  },
  publishToMaven: {
    javaPackage: 'com.thonbecker.simplewebsitedeploy',
    mavenGroupId: 'com.thonbecker.simplewebsitedeploy',
    mavenArtifactId: 'cdk-simplewebsite-deploy',
    mavenServerId: 'central-ossrh',
  },
});
project.synth();

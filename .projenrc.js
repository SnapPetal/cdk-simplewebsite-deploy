const { awscdk, javascript } = require('projen');

const nodeVersion = '24.14.1';
const mavenVersion = '3.9.14';
const javaVersion = 'corretto-21.0.7.6.1';

const project = new awscdk.AwsCdkConstructLibrary({
  authorAddress: 'thon.becker@gmail.com',
  authorName: 'Thon Becker',
  stability: 'stable',
  cdkVersion: '2.248.0',
  constructsVersion: '10.6.0',
  jsiiVersion: '~5.9.37',
  packageManager: javascript.NodePackageManager.YARN_CLASSIC,
  projenVersion: '^0.99.38',
  majorVersion: 2,
  minorVersion: 248,
  gitignore: ['.DS_Store', '.idea'],
  name: 'cdk-simplewebsite-deploy',
  repository: 'https://github.com/SnapPetal/cdk-simplewebsite-deploy',
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

for (const taskName of ['package:java', 'package-all', 'package']) {
  const task = project.tasks.tryFind(taskName);
  task?.env('ASDF_NODEJS_VERSION', nodeVersion);
  task?.env('ASDF_MAVEN_VERSION', mavenVersion);
  task?.env('ASDF_JAVA_VERSION', javaVersion);
}

project.synth();

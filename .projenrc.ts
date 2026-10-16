import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Thon Becker',
  authorAddress: 'thon.becker@gmail.com',
  stability: 'stable',
  cdkVersion: '2.270.0',
  constructsVersion: '10.8.1',
  minNodeVersion: '20.x',
  // Publish jobs need npm >= 11.5.1 (Node >= 24.5) for OIDC trusted publishing.
  workflowNodeVersion: '24.x',
  jsiiVersion: '~6.0.18',
  typescriptVersion: '~6.0.0',
  jestOptions: {
    jestVersion: '^30',
  },
  packageManager: javascript.NodePackageManager.PNPM,
  pnpmVersion: '12.4.2',
  // pnpm 12 will not install until dependency build scripts are approved.
  pnpmOptions: {
    workspaceYamlOptions: {
      allowBuilds: {
        '@parcel/watcher': true,
        'unrs-resolver': true,
      },
    },
  },
  projenVersion: '^0.103.25',
  projenrcTs: true,
  majorVersion: 3,
  gitignore: ['.DS_Store', '.idea'],
  name: 'cdk-simplewebsite-deploy',
  repositoryUrl: 'https://github.com/SnapPetal/cdk-simplewebsite-deploy',
  description: 'This is an AWS CDK v2 Construct to simplify deploying a single-page website using CloudFront distributions.',
  keywords: ['awscdk', 'cloudfront', 's3', 'static-website', 'spa'],
  defaultReleaseBranch: 'main',
  npmTrustedPublishing: true,
  npmProvenance: true,
  publishToPypi: {
    distName: 'cdk-simplewebsite-deploy',
    module: 'cdk_simplewebsite_deploy',
    trustedPublishing: true,
  },
  publishToMaven: {
    javaPackage: 'com.thonbecker.simplewebsitedeploy',
    mavenGroupId: 'com.thonbecker.simplewebsitedeploy',
    mavenArtifactId: 'cdk-simplewebsite-deploy',
    mavenServerId: 'central-ossrh',
  },
});
project.synth();

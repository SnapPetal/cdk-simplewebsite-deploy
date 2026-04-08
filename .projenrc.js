const { JsonPatch, awscdk, javascript } = require('projen');

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

project.tryFindObjectFile('.github/workflows/release.yml')?.patch(
  JsonPatch.add('/jobs/release_maven/steps/10', {
    name: 'Check Maven Central version',
    id: 'maven_version',
    run: [
      'set -euo pipefail',
      'VERSION="$(node -p "require(\'./.repo/package.json\').version")"',
      'GROUP_PATH="com/thonbecker/simplewebsitedeploy"',
      'ARTIFACT_ID="cdk-simplewebsite-deploy"',
      'POM_URL="https://repo1.maven.org/maven2/${GROUP_PATH}/${ARTIFACT_ID}/${VERSION}/${ARTIFACT_ID}-${VERSION}.pom"',
      'if curl -fsI "$POM_URL" >/dev/null; then',
      '  echo "exists=true" >> "$GITHUB_OUTPUT"',
      '  echo "Maven artifact ${GROUP_PATH}:${ARTIFACT_ID}:${VERSION} already exists; skipping publish."',
      'else',
      '  echo "exists=false" >> "$GITHUB_OUTPUT"',
      'fi',
    ].join('\n'),
  }),
  JsonPatch.add('/jobs/release_maven/steps/11/if', "steps.maven_version.outputs.exists != 'true'"),
  JsonPatch.add('/jobs/release_maven/steps/11/env/MAVEN_VERBOSE', 'true'),
);

project.synth();

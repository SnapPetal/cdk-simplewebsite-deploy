import { awscdk, javascript, JsonPatch, TomlFile } from 'projen';

const nodeVersion = '24.21.0';
const mavenVersion = '3.9.16';
const javaVersion = 'corretto-25.0.3.9.1';
const pnpmVersion = '12.4.2';
const pythonVersion = '3.12.14';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Thon Becker',
  authorAddress: 'thon.becker@gmail.com',
  stability: 'stable',
  cdkVersion: '2.270.0',
  constructsVersion: '10.8.1',
  minNodeVersion: '20.0.0',
  jsiiVersion: '~5.9.37',
  packageManager: javascript.NodePackageManager.PNPM,
  pnpmVersion,
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

new TomlFile(project, 'mise.toml', {
  obj: {
    tools: {
      node: nodeVersion,
      java: javaVersion,
      maven: mavenVersion,
      pnpm: pnpmVersion,
      python: pythonVersion,
    },
  },
});

for (const taskName of ['package:java', 'package-all', 'package']) {
  const task = project.tasks.tryFind(taskName);
  task?.env('MISE_NODE_VERSION', nodeVersion);
  task?.env('MISE_MAVEN_VERSION', mavenVersion);
  task?.env('MISE_JAVA_VERSION', javaVersion);
  task?.env('MISE_PNPM_VERSION', pnpmVersion);
  task?.env('ASDF_NODEJS_VERSION', nodeVersion);
  task?.env('ASDF_MAVEN_VERSION', mavenVersion);
  task?.env('ASDF_JAVA_VERSION', javaVersion);
  task?.env('ASDF_PNPM_VERSION', pnpmVersion);
}

project.tryFindObjectFile('.github/workflows/release.yml')?.patch(
  JsonPatch.add('/jobs/release_maven/steps/11', {
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
  JsonPatch.add('/jobs/release_maven/steps/12/if', "steps.maven_version.outputs.exists != 'true'"),
  JsonPatch.add('/jobs/release_maven/steps/12/env/MAVEN_VERBOSE', 'true'),
  JsonPatch.replace('/jobs/release_maven/steps/12/run', [
    'set -euo pipefail',
    'VERSION="$(node -p "require(\'./.repo/package.json\').version")"',
    'GROUP_PATH="com/thonbecker/simplewebsitedeploy"',
    'ARTIFACT_ID="cdk-simplewebsite-deploy"',
    'POM_URL="https://repo1.maven.org/maven2/${GROUP_PATH}/${ARTIFACT_ID}/${VERSION}/${ARTIFACT_ID}-${VERSION}.pom"',
    'set +e',
    'npx -p publib@latest publib-maven',
    'STATUS=$?',
    'set -e',
    'if [ "$STATUS" -eq 0 ]; then',
    '  exit 0',
    'fi',
    'echo "publib-maven failed with status ${STATUS}; checking Maven Central before failing."',
    'for attempt in 1 2 3 4 5 6 7 8 9 10; do',
    '  if curl -fsI "$POM_URL" >/dev/null; then',
    '    echo "Maven artifact ${GROUP_PATH}:${ARTIFACT_ID}:${VERSION} is available in Maven Central; treating publish as successful."',
    '    exit 0',
    '  fi',
    '  echo "Maven artifact is not visible yet; retry ${attempt}/10."',
    '  sleep 30',
    'done',
    'exit "$STATUS"',
  ].join('\n')),
);

project.synth();

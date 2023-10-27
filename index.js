const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require('octokit');

try {
  // `who-to-greet` input defined in action metadata file
  const imageName = core.getInput('image-name');
  console.log(`Image name is: ${imageName}`);

  const imageVersion = core.getInput('image-version');
  console.log(`Image version is: ${imageVersion}`);

  const artifactoryPath = core.getInput('artifactory-path');
  console.log(`Artifactory path is: ${artifactoryPath}`);

} catch (error) {
  core.setFailed(error.message);
}

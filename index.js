import core from '@actions/core';
import github from '@actions/github';

const token = process.env.token;
const octokit = github.getOctokit(token);

try {
  const imageName = core.getInput('image-name');
  console.log(`Image name is: ${imageName}`);

  const imageVersion = core.getInput('image-version');
  console.log(`Image version is: ${imageVersion}`);

  const artifactoryPath = core.getInput('artifactory-path');
  console.log(`Artifactory path is: ${artifactoryPath}`);

  const payloadJson = github.context.payload;
  const repoName = payloadJson.repository.name;
  console.log(`Repo name: ${repoName}`);

  const splitRepoName = repoName.split('-');
  
  const tenantName = splitRepoName[2];
  console.log(`Team name: ${tenantName}`);
  
  const tenantNar = splitRepoName[0] + '-' + splitRepoName[1];
  console.log(`Team number: ${tenantNar}`);

  const deploymentRepoName = `${tenantNar}-${tenantName}-demo-deployment-repository`;
  console.log(`Deployment Repo Name: ${deploymentRepoName}`);

} catch (error) {
  core.setFailed(error.message);
}

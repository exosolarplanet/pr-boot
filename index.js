const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require('octokit');

try {
  // `who-to-greet` input defined in action metadata file

  const octokit = new Octokit({ 
    auth: process.env.token,
  });

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
  
  const teamName = splitRepoName[1];
  console.log(`Team name: ${teamName}`);
  
  const teamNumber = splitRepoName[0];
  console.log(`Team number: ${teamNumber}`);

  const deploymentRepoName = `${teamNumber}-${teamName}-demo-deployment-repository`;
  console.log(`Deployment Repo Name: ${deploymentRepoName}`);

  
  await octokit.request('POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches', {
    owner: 'exosolarplanet',
    repo: deploymentRepoName,
    workflow_id: 'deploy.yaml',
    ref: 'main',
    // inputs: {
    //   name: 'Mona the Octocat',
    //   home: 'San Francisco, CA'
    // },
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
//   const res = await response;
//   console.log(res.data);

  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);

  
} catch (error) {
  core.setFailed(error.message);
  octokit.setFailed(error.message)
}

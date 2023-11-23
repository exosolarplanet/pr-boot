/******/ var __webpack_modules__ = ({

/***/ 927:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 273:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 665:
/***/ ((module) => {

module.exports = eval("require")("octokit");


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __nccwpck_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	var threw = true;
/******/ 	try {
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 		threw = false;
/******/ 	} finally {
/******/ 		if(threw) delete __webpack_module_cache__[moduleId];
/******/ 	}
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require__(927);
/* harmony import */ var _actions_github__WEBPACK_IMPORTED_MODULE_1__ = __nccwpck_require__(273);
/* harmony import */ var octokit__WEBPACK_IMPORTED_MODULE_2__ = __nccwpck_require__(665);




try {
  // `who-to-greet` input defined in action metadata file
  const octokit = _actions_github__WEBPACK_IMPORTED_MODULE_1__.getOctokit(process.env.token);

  const imageName = _actions_core__WEBPACK_IMPORTED_MODULE_0__.getInput('image-name');
  console.log(`Image name is: ${imageName}`);

  const imageVersion = _actions_core__WEBPACK_IMPORTED_MODULE_0__.getInput('image-version');
  console.log(`Image version is: ${imageVersion}`);

  const artifactoryPath = _actions_core__WEBPACK_IMPORTED_MODULE_0__.getInput('artifactory-path');
  console.log(`Artifactory path is: ${artifactoryPath}`);

  const payloadJson = _actions_github__WEBPACK_IMPORTED_MODULE_1__.context.payload;
  const repoName = payloadJson.repository.name;
  console.log(`Repo name: ${repoName}`);

  const splitRepoName = repoName.split('-');
  
  const teamName = splitRepoName[1];
  console.log(`Team name: ${teamName}`);
  
  const teamNumber = splitRepoName[0];
  console.log(`Team number: ${teamNumber}`);

  const deploymentRepoName = `${teamNumber}-${teamName}-demo-deployment-repository`;
  console.log(`Deployment Repo Name: ${deploymentRepoName}`);

  
  const response = octokit.request('POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches', {
    owner: 'exosolarplanet',
    repo: deploymentRepoName,
    workflow_id: 'deploy.yaml',
    ref: 'main',
    inputs: {
      image_name: imageName,
      image_version: imageVersion,
      artifactory_path: artifactoryPath
    },
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });

  const payload = JSON.stringify(_actions_github__WEBPACK_IMPORTED_MODULE_1__.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);

  
} catch (error) {
  _actions_core__WEBPACK_IMPORTED_MODULE_0__.setFailed(error.message);
  octokit.setFailed(error.message)
}

})();


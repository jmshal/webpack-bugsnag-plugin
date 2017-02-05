import {
  getCurrentBranch,
  getLatestCommitHash,
  getOriginRemoteUrl,
} from './git';

import {
  getPackageVersion,
  getPackageRepository,
} from './package';

class CommonBugsnagPlugin {
  /**
   * Ensures that the basic options required for all Bugsnag plugins are validated.
   * 
   * - apiKey (32 characters string)
   */
  validateOptions() {
    const { apiKey } = this.options;
    if (!apiKey || apiKey.length !== 32) {
      throw new Error('You must provide your Bugsnag API key to the BugsnagPlugin.');
    }
  }

  /**
   * Returns a promise which returns attempts to grab information about the webpack project.
   *
   * This is done by tracking down a package.json file, and extracting information from
   * the git repository. If git is not installed, the appropriate project details should be
   * manually passed to the BugsnagPlugin.
   * 
   * @param {*} compilation
   * @returns {Promise<object>}
   */
  getProjectDetails(compilation) {
    const options = {
      path: compilation.compiler.options.context,
    };
    return Promise.all([
      getCurrentBranch(options),
      getLatestCommitHash(options),
      getOriginRemoteUrl(options),
      getPackageVersion(options),
      getPackageRepository(options),
    ]).then(([
      currentBranch,
      latestCommitHash,
      originRemoteUrl,
      packageVersion,
      packageRepository,
    ]) => {
      return {
        version: packageVersion,
        branch: currentBranch,
        repository: packageRepository || originRemoteUrl,
        revision: latestCommitHash,
      };
    });
  }

  /**
   * Handles errors the "webpack" way, by adding them to the compilation.errors array.
   * 
   * @param {*} compilation
   * @returns {function}
   */
  handleErrors(compilation) {
    const pluginName = Object.getPrototypeOf(this).constructor.name;
    return err => {
      compilation.errors.push(new Error(`${pluginName} (${err.message})`));
    };
  }
}

export default CommonBugsnagPlugin;

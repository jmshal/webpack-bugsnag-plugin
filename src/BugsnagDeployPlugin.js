import request from 'request-promise-native';
import CommonBugsnagPlugin from './helpers/CommonBugsnagPlugin';

const debug = require('debug')('webpack-bugsnag-plugin:BugsnagDeployPlugin');

const USER_AGENT = (
  'WebpackBugsnagDeployPlugin/' +
  require('../package.json').version
);
const BUGSNAG_DEPLOY_URL = 'https://notify.bugsnag.com/deploy';

class BugsnagDeployPlugin extends CommonBugsnagPlugin {
  constructor({
    apiKey = null,
    releaseStage = 'production',
    repository = null,
    provider = null,
    branch = null,
    revision = null, 
    appVersion = null,
  }) {
    super();
    this.options = {
      apiKey,
      releaseStage,
      repository,
      provider,
      branch,
      revision,
      appVersion,
    };
    this.validateOptions();
  }

  apply(compiler) {
    compiler.plugin('after-emit', this.handle.bind(this));
  }

  getPopulatedProperties(obj) {
    const value = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] != null) {
        value[key] = obj[key];
      }
    }
    return value;
  }

  mapProjectDetailsToDeployOptions(details) {
    return this.getPopulatedProperties({
      appVersion: details.version,
      branch: details.branch,
      repository: details.repository,
      revision: details.revision,
    });
  }

  getDeployOptions(compilation) {
    return this.getProjectDetails(compilation).then(details => {
      return {
        ...this.mapProjectDetailsToDeployOptions(details),
        ...this.getPopulatedProperties(this.options), // Don't override with nulls
      };
    });
  }

  sendDeployRequest(options) {
    debug('uploading deployment details', options);
    return request({
      method: 'POST',
      uri: BUGSNAG_DEPLOY_URL,
      body: options,
      json: true,
      headers: {
        'user-agent': USER_AGENT,
      },
    });
  }

  handle(compilation, callback) {
    this.getDeployOptions(compilation)
      .then(options => this.sendDeployRequest(options))
      .catch(this.handleErrors(compilation, callback))
      .then(() => callback());
  }
}

export default BugsnagDeployPlugin;

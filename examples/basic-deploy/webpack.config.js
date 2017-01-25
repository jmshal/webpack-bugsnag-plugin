const webpack = require('webpack');
const { BugsnagDeployPlugin } = require('../../');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: './build',
  },
  plugins: [
    new BugsnagDeployPlugin({
      apiKey: 'e48e13207341b6bffb7fb1622282247b',
      releaseStage: 'production',
      repository: 'https://github.com/jacobmarshall/webpack-bugsnag-plugin.git',
      branch: 'master',
      revision: '9fc759f7c5ecdab9d13a23ac321a106d9f1dc913', 
      appVersion: '1.7.0'
    }),
  ],
};

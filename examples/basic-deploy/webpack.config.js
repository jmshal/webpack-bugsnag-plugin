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
      releaseStage: 'production'
    }),
  ],
};

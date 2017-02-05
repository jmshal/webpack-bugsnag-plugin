const webpack = require('webpack');
const { BugsnagDeployPlugin, BugsnagSourceMapPlugin } = require('../../lib');

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    publicPath: 'https://localhost:8080/build',
    path: './build',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new BugsnagDeployPlugin({
      apiKey: '11ae66b95ade0e3fcd02735d4bb44984',
    }),
    new BugsnagSourceMapPlugin({
      apiKey: '11ae66b95ade0e3fcd02735d4bb44984',
    }),
  ],
};

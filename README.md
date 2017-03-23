# Webpack Bugsnag Plugin(s)

![Latest version](https://img.shields.io/npm/v/webpack-bugsnag-plugin.svg)
![Dependencies](https://david-dm.org/jacobmarshall/webpack-bugsnag-plugin.svg)
![Total downloads](https://img.shields.io/npm/dt/webpack-bugsnag-plugin.svg)

This module contains webpack plugins to help ease Bugsnag into your webpack build process.

## Install

The Bugsnag plugins are available on npm, you can install them into your project by running the following command in the root of your project.

```sh
$ npm i --save-dev webpack-bugsnag-plugin
```

## Usage

```js
const {
  BugsnagDeployPlugin,
  BugsnagSourceMapPlugin
} = require('webpack-bugsnag-plugin');

module.exports = {
  devtool: 'source-map',
  // ...
  plugins: [
    // WebpackS3Plugin(...)
    new BugsnagDeployPlugin({
      apiKey: 'e48e13207341b6bffb7fb1622282247b',
      releaseStage: 'production',
      appVersion: '1.7.0',
    }),
    new BugsnagSourceMapPlugin({
      apiKey: 'e48e13207341b6bffb7fb1622282247b',
      publicPath: 'http*://*example.com/build',
      appVersion: '1.7.0',
    }),
  ],
};
```

## BugsnagSourceMapPlugin

Check out https://docs.bugsnag.com/api/js-source-map-upload/ for more information about uploading sourcemaps to Bugsnag.

The `BugsnagSourceMapPlugin` plugin automatically uploads your bundle sourcemaps to Bugsnag, so when errors occur within your application you see the original source code right within your Bugsnag dashboard.

### Options

|Option    |Description                                                                                                                               |Required|Default            |
|----------|------------------------------------------------------------------------------------------------------------------------------------------|--------|-------------------|
|apiKey    |Your Bugsnag project API key. You can find this key from within your project's settings page.                                             |*       |n/a                |
|publicPath|The url of your minified bundle(s). This option supports wildcards (eg. `http*://example.com` if your bundle is served from HTTP & HTTPS).|*       |`output.publicPath`|
|appVersion|The version of your app your bundle relates to. This option is automatically calculated from your `package.json` if one exists.           |        |**                 |
|overwrite |If you have already pushed sourcemap files to Bugsnag for a particular version of your app, you can pass this option to replace it.       |        |`false`            |

__** These options automatically default to information within your project's `package.json` file, or your local Git repository.__

## BugsnagDeployPlugin

Check out https://docs.bugsnag.com/api/deploy-tracking/ for more information about Bugsnag deploy tracking.

The `BugsnagDeployPlugin` plugin automatically pushes deploy events to Bugsnag when your webpack bundle builds successfully. This makes it easy from your Bugsnag dashboard when you deployed changes to your app, and the impact it had on the number of errors have occurred since.

### Options

|Option      |Description                                                                                                                                                                 |Required|Default     |
|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------|------------|
|apiKey      |Your Bugsnag project API key. You can find this key from within your project's settings page.                                                                               |*       |n/a         |
|releaseStage|The environment in which the deployed occurred (eg. `production`, `testing`, `development`).                                                                                |        |`production`|
|repository  |The Git repository which contains the source code being deployed.                                                                                                           |        |**          |
|provider    |If your repository is hosted on a on-premise solution, you will need to supply the provider (eg. `github-enterprise`, `bitbucket-server`, `gitlab-onpremise`).              |        |            |
|branch      |The source control branch from which you are deploying the code. Only relevant when `repository` is supplied.                                                               |        |**          |
|revision    |The source control revision id for the code you are deploying. Required when `repository` is supplied.                                                                      |        |**          |
|appVersion  |The app version of the code you are currently deploying. Only set this if you tag your releases with [semantic version numbers](http://semver.org/) and deploy infrequently.|        |**          |

__** These options automatically default to information within your project's `package.json` file, or your local Git repository.__

## License

MIT License ❤️

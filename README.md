> ⚠️ This project is currently a work in progress. Please proceed with caution.

# Webpack Bugsnag Plugin(s)

This module contains webpack plugins to help ease Bugsnag into your webpack build process.

## Installation

```sh
$ npm i --save webpack-bugsnag-plugin
```

## Usage

```js
const {
  BugsnagDeployPlugin,
  BugsnagSourceMapPlugin
} = require('webpack-bugsnag-plugin');

module.exports = {
  // ...
  plugins: [
    // WebpackS3Plugin(...)
    new BugsnagDeployPlugin({
      apiKey: 'e48e13207341b6bffb7fb1622282247b', // required
      releaseStage: 'production',
      repository: 'https://github.com/jacobmarshall/webpack-bugsnag-plugin.git',
      branch: 'master',
      revision: '9fc759f7c5ecdab9d13a23ac321a106d9f1dc913', 
      appVersion: '1.7.0'
    }),
    new BugsnagSourceMapPlugin({
      apiKey: 'e48e13207341b6bffb7fb1622282247b', // required
      publicPath: 'http*://*example.com/build', // or `output.publicPath`
      appVersion: '1.7.0',
      overwrite: true
    })
  ]
};
```

## Plugins

### BugsnagSourceMapPlugin(options)

Check out https://docs.bugsnag.com/api/js-source-map-upload/ for more information about uploading sourcemaps to Bugsnag.

The `BugsnagSourceMapPlugin` plugin automatically uploads your bundle's sourcemaps to Bugsnag.

#### Options

**apiKey**

The Bugsnag API key that is used in your app.

**publicPath** (optional)

The url of the minified JavaScript file that the source map relates to. Asterisks can be used as a [wildcard](https://docs.bugsnag.com/api/js-source-map-upload/#do-you-support-partial-matching-wildcards-for-the-minified-url).

**appVersion** (optional)

The version of the app that the source map applies to (as set in the [JavaScript notifier](https://docs.bugsnag.com/platforms/browsers/configuration-options/#appversion)). If the version isn’t set in the notifier this should be omitted (and the most recent upload will be used for error events).

**overwrite** (optional)

Specifies whether to overwrite any existing version of the files for this minified url and app version. Defaults to false.

### BugsnagDeployPlugin(options)

Check out https://docs.bugsnag.com/api/deploy-tracking/ for more information about Bugsnag deploy tracking.

The `BugsnagDeployPlugin` plugin automatically pushes deploy events to Bugsnag when your webpack bundle builds successfully.

#### Options

**apiKey**

The API Key associated with the project. Informs Bugsnag which project has been deployed. This is the only required field.

**releaseStage** (optional)

The release stage (eg, production, staging) currently being deployed. (Optional, defaults to `production`.)

**repository** (optional)

The URL of the repository containing the source code being deployed. We can use this to link directly to your source code on [GitHub](https://github.com/), [Bitbucket](https://bitbucket.org/) or [GitLab](https://gitlab.com/) from the Bugsnag dashboard. (Required for source code integration.)

**provider** (optional)

The name of your source control provider. Required when repository is supplied and only for on-premise services (for cloud services the provider will be derived from the URL.)

When supplied must be one of:

- `github-enterprise` for [GitHub Enterprise](https://enterprise.github.com/)
- `bitbucket-server` for [Bitbucket Server](https://www.atlassian.com/software/bitbucket/server) (formerly Stash)
- `gitlab-onpremise` for [GitLab CE](https://about.gitlab.com/downloads/) or [GitLab Enterprise](https://about.gitlab.com/downloads-ee/)

**branch** (optional)

The source control branch from which you are deploying the code. (Optional, only relevant when `repository` is supplied.)

**revision** (optional)

The source control revision id for the code you are deploying. (Required when `repository` is supplied.)

**appVersion** (optional)

The app version of the code you are currently deploying. Only set this if you tag your releases with [semantic version numbers](http://semver.org/) and deploy infrequently. (Optional.)

## License

MIT License ❤️

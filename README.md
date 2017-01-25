> ⚠️ This project is currently a work in progress. Please proceed with caution.

# Webpack Bugsnag Plugin(s)

This module contains webpack plugins to help ease Bugsnag into your webpack build process.

## Example

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
      publicUrl: 'https://s3.amazonaws.com/my-app', // required
      appVersion: '1.7.0',
      override: true
    })
  ]
};
```

## Plugins

### BugsnagDeployPlugin(options)

Check out https://docs.bugsnag.com/api/deploy-tracking/ for more information about Bugsnag deploy tracking.

#### Options

**apiKey**

The API Key associated with the project. Informs Bugsnag which project has been deployed. This is the only required field.

**releaseStage**

The release stage (eg, production, staging) currently being deployed. (Optional, defaults to `production`.)

**repository**

The URL of the repository containing the source code being deployed. We can use this to link directly to your source code on [GitHub](https://github.com/), [Bitbucket](https://bitbucket.org/) or [GitLab](https://gitlab.com/) from the Bugsnag dashboard. (Required for source code integration.)

**provider**

The name of your source control provider. Required when repository is supplied and only for on-premise services (for cloud services the provider will be derived from the URL.)

When supplied must be one of:

- `github-enterprise` for [GitHub Enterprise](https://enterprise.github.com/)
- `bitbucket-server` for [Bitbucket Server](https://www.atlassian.com/software/bitbucket/server) (formerly Stash)
- `gitlab-onpremise` for [GitLab CE](https://about.gitlab.com/downloads/) or [GitLab Enterprise](https://about.gitlab.com/downloads-ee/)

**branch**

The source control branch from which you are deploying the code. (Optional, only relevant when `repository` is supplied.)

**revision**

The source control revision id for the code you are deploying. (Required when `repository` is supplied.)

**appVersion**

The app version of the code you are currently deploying. Only set this if you tag your releases with [semantic version numbers](http://semver.org/) and deploy infrequently. (Optional.)

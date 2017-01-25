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

### BugsnagDeployPlugin

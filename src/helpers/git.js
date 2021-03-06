import url from 'url';
import child from 'child_process';

const debug = require('debug')('webpack-bugsnag-plugin:git');

function exec(cmd, options) {
  return new Promise((resolve, reject) => {
    child.exec(cmd, { cwd: options.path }, (err, stdout, stderr) => {
      if (err) {
        if (options.volatile) {
          reject(err);
        } else {
          debug(`exec "${cmd}" resulted in error: ${err.message}`);
          resolve(null);
        }
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

function getCurrentBranch(options) {
  return exec(`git symbolic-ref HEAD | sed 's!refs\/heads\/!!'`, options); // TODO Remove `sed` for Windows support
}

function getLatestCommitHash(options) {
  return exec(`git log -n 1 --pretty=format:"%H"`, options);
}

function getOriginRemoteUrl(options) {
  return exec(`git config --get remote.origin.url`, {
    ...options,
    volatile: true,
  })
  .then(getSafeRepositoryUrl)
  .catch(() => null);
}

function getSafeRepositoryUrl(repositoryUrl) {
  const parsed = url.parse(repositoryUrl);
  parsed.auth = null;
  return url.format(parsed);
}

export {
  getCurrentBranch,
  getLatestCommitHash,
  getOriginRemoteUrl,
  getSafeRepositoryUrl,
};

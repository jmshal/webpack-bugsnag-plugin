const child = require('child_process');

function exec(cmd, options) {
  return new Promise((resolve, reject) => {
    child.exec(cmd, options, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

function getCurrentBranch(options) {
  return exec(`git symbolic-ref HEAD | sed 's!refs\/heads\/!!'`, {
    cwd: options.path,
  });
}

function getLatestCommitHash(options) {
  return exec(`git log -n 1 --pretty=format:"%H"`, {
    cwd: options.path,
  });
}

function getOriginRemoteUrl(options) {
  return exec(`git remote get-url origin`, {
    cwd: options.path,
  });
}

module.exports = {
  getCurrentBranch,
  getLatestCommitHash,
  getOriginRemoteUrl,
};

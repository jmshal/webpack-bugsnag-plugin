import url from 'url';
import child from 'child_process';

function exec(cmd, options) {
  return new Promise((resolve, reject) => {
    child.exec(cmd, { cwd: options.path }, (err, stdout, stderr) => {
      if (err) {
        reject(err);
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
  return exec(`git remote get-url origin`, options).then(getSafeRepositoryUrl);
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

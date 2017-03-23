import pkgUp from 'pkg-up';
import {
  getSafeRepositoryUrl,
} from './git';

const REPOSITORY_STRING_REGEX = /((gist|bitbucket|gitlab):)?(\w+)\/(\w+)/;

function getPackage({ path }, callback) {
  return pkgUp(path).then(packagePath => {
    let value = null;
    if (packagePath) {
      const pkg = require(packagePath);
      if ((value = callback(pkg)) == null) { // undefined/null
        value = null;
      }
    }
    return value;
  });
}

function getPackageVersion(options) {
  return getPackage(options, pkg => {
    if (pkg.version) {
      return pkg.version;
    }
  });
}

function stringifyRepository(type, owner, name) {
  switch (type) {
    case 'github': return `https://github.com/${owner}/${name}.git`;
    case 'gitlab': return `https://gitlab.com/${owner}/${name}.git`;
    case 'bitbucket': return `https://bitbucket.org/${owner}/${name}.git`;
    default: return null;
  }
}

function getPackageRepository(options) {
  return getPackage(options, pkg => {
    if (pkg.repository) {
      const { repository } = pkg;
      switch(typeof repository) {
        case 'string': {
          if (repository.match(REPOSITORY_STRING_REGEX)) {
            const [, , type = 'github', owner, name] = repository.split(REPOSITORY_STRING_REGEX);
            return stringifyRepository(type, owner, name);
          }
          break;
        }
        case 'object': {
          if (repository.type === 'git') {
            // The repository.url field should probably not contain auth info, but in case it does
            // we strip out any potential username/password within. #savinglives
            return getSafeRepositoryUrl(repository.url);
          }
          break;
        }
        default: {
          // It must be in some other weird/non-standard format...
          break;
        }
      }
    }
  });
}

export {
  getPackageVersion,
  getPackageRepository,
};

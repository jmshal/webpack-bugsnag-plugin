const somethingElse = require('./something-else');

function badFunction(param) {
  if (param.nonExistentMethod()) {
    somethingElse(param);
  }
}

module.exports = badFunction;

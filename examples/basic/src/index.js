const badFunction = require('./bad-function');

function buildTheStack() {
  performNotMuch('tuesday');
}

function performNotMuch(today) {
  if (today === 'tuesday') {
    startWorking();
  } else {
    haveABreak();
  }
}

function startWorking() {
  badFunction();
}

function haveABreak() {
  //
}

buildTheStack();

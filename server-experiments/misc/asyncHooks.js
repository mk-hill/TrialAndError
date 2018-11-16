/**
 * Async hooks example
 */

const async_hooks = require('async_hooks');

// ? Use fs.writeSync as opposed to console.log to track async operations sycnhronously ?
// ? clg asynchronous? console api -> event loop?
// todo research further
const fs = require('fs');

const targetExecutionContext = false;

// Arbitrary async function
const whatTimeIsIt = callback => {
  setInterval(() => {
    fs.writeSync(
      1,
      `When the setInterval runs, the execution context is ${async_hooks.executionAsyncId()}\n`,
      callback(Date.now())
    );
  }, 1000);
};

whatTimeIsIt(time => {
  fs.writeSync(1, `The time is ${time} \n`);
});

const hooks = {
  init(asyncId, type, triggerAsyncId, resource) {
    fs.writeSync(1, `Hook init ${asyncId}\n`);
  },

  before(asyncId, type, triggerAsyncId, resource) {
    fs.writeSync(1, `Hook before ${asyncId}\n`);
  },

  after(asyncId, type, triggerAsyncId, resource) {
    fs.writeSync(1, `Hook after ${asyncId}\n`);
  },

  destroy(asyncId, type, triggerAsyncId, resource) {
    fs.writeSync(1, `Hook destroy ${asyncId}\n`);
  },

  promiseResolve(asyncId, type, triggerAsyncId, resource) {
    fs.writeSync(1, `Hook promiseResolve ${asyncId}\n`);
  },
};

// Create a new async hooks instance
const asyncHook = async_hooks.createHook(hooks);
asyncHook.enable();

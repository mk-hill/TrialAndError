/**
 * Example virtual machine running arbitrary commands
 */

const vm = require('vm');

// Define a context for the script to run in
let context = {
  foo: 25,
};

// Define the script
const script = new vm.Script(`
  foo = foo * 2;
  this.bar = foo + 1;
  this.fizz = 52;
  const buzz = 'aliens';
`);

// Run script
script.runInNewContext(context);
console.log(context);

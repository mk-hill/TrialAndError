/**
 * Example REPL server
 * Take in the word "fizz" and log out "buzz"
 */

const repl = require('repl');

const configObj = {
  prompt: '>',
  eval(str) {
    // Evaluation function for incoming input
    console.log('Evaluating: ', str);

    if (str.includes('fizz')) {
      console.log('buzz');
    }
  },
};
// Start the repl
repl.start(configObj);

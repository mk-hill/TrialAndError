/* eslint-disable max-len */
/**
 * Matrix Spiral Copy
Given a 2D array (matrix) inputMatrix of integers, create a function spiralCopy that copies inputMatrix’s values into a 1D array in a spiral order, clockwise. Your function then should return that array. Analyze the time and space complexities of your solution.
 */

const test = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20]];

function spiralCopy(inputMatrix) {
  const output = [];

  // Assuming all arrays of equal length
  // edges will shrink as pushed onto output
  const edges = {
    top: 0,
    bottom: inputMatrix.length - 1,
    left: 0,
    right: inputMatrix[0].length - 1,
  };

  const totalItems = inputMatrix.reduce((totalLength, arr) => totalLength + arr.length, 0);

  while (output.length < totalItems) {
    output.push(...inputMatrix[edges.top].slice(edges.left, edges.right + 1));
    edges.top++;

    output.push(...inputMatrix.map(ar => ar[edges.right]));
    edges.right--;

    output.push(...inputMatrix[edges.bottom].slice(edges.left, edges.right + 1).reverse());
    edges.bottom--;

    output.push(...inputMatrix.reverse().map(ar => ar[edges.left]));
    edges.left++;
  }

  return output;
}

const testResult = spiralCopy(test);

console.log(testResult);
console.assert(testResult === [1, 2, 3, 4, 5, 10, 15, 20, 19, 18, 17, 16, 11, 6, 7, 8, 9, 14, 13, 12], 'asd');

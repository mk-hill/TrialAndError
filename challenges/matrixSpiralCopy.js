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

// peer's recursive solution
// todo look into further levels after 2
// /**
// function spiralCopy(inputMatrix) {
//   const result = [];
//   while (result.length < inputMatrix[0].length * inputMatrix.length) {
//     result.concat(spiralCopy2(inputMatrix));
//   }
//   return result;
// }
// */

// function spiralCopy(inputMatrix) {
//   // your code goes here
//   let result = [];
//   if (inputMatrix.length === 0) {
//     return result;
//   }

//   if (inputMatrix.length === 1) {
//     forwardCopy(inputMatrix, 0, result);
//     return result;
//   }
//   // inputMatrix.length = number of arrays
//   forwardCopy(inputMatrix, 0, result);
//   verticalDownwards(inputMatrix, inputMatrix[0].length - 1, result);
//   reverseCopy(inputMatrix, inputMatrix.length - 1, result);
//   verticalUpwards(inputMatrix, 0, result);

//   inputMatrix = sliceMatrix(inputMatrix);
//   console.log('intputMatrix', inputMatrix);
//   let spiralCopyResult = spiralCopy(inputMatrix);

//   console.log('result', result); // [ 1, 2, 3, 4, 5, 10, 15, 20, 19, 18, 17, 16, 11, 6 ] [ 7, 8, 9, 14, 13, 12 ]

//   console.log('spiralCopyResult', spiralCopyResult);
//   if (spiralCopyResult) {
//     console.assert(result.length > 0, 'result is empty!!!');
//     return result.concat(spiralCopyResult);
//   }
// }

// function forwardCopy(inputMatrix, rowNumber, result) {
//   for (let col = 0; col < inputMatrix[rowNumber].length; col++) {
//     result.push(inputMatrix[rowNumber][col]);
//   }
// }

// function verticalDownwards(inputMatrix, colNumber, result) {
//   for (let rows = 1; rows <= inputMatrix.length - 2; rows++) {
//     result.push(inputMatrix[rows][colNumber]);
//   }
// }

// function reverseCopy(inputMatrix, rowNumber, result) {
//   for (let col = inputMatrix[rowNumber].length - 1; col >= 0; col--) {
//     result.push(inputMatrix[rowNumber][col]);
//   }
// }

// function verticalUpwards(inputMatrix, colNumber, result) {
//   for (let rows = inputMatrix.length - 2; rows >= 1; rows--) {
//     result.push(inputMatrix[rows][colNumber]);
//   }
// }

// // at level 2, after sliceMatrix ran one time on:
// /**
// input:  inputMatrix  = [ [1,    2,   3,  4,    5], arr[0]
//                          [6,    7,   8,  9,   10],
//                          [11,  12,  13,  14,  15],
//                          [16,  17,  18,  19,  20] ]
//                          */

// // [[ 6, 7, 8, 9],
// //  [12,13,14]]

// function sliceMatrix(inputMatrix) {
//   let slicedMatrix = [];
//   for (let row = 1; row <= inputMatrix.length - 2; row++) {
//     slicedMatrix[row - 1] = [];
//     for (let col = 1; col <= inputMatrix[0].length - 2; col++) {
//       slicedMatrix[row - 1].push(inputMatrix[row][col]);
//     }
//   }

//   return slicedMatrix;
// }
// // []

// /**

// Test Case #6
// Input:

// [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20]]

// Expected:

// [1,2,3,4,5,10,15,20,19,18,17,16,11,6,   7,8,9,14,13,12]

// Actual:

// [ 1, 2, 3, 4, 5, 10, 15, 20, 19, 18, 17, 16, 11, 6 ]

// StdOut:
// [ 7, 8, 9, 14, 13, 12 ]
// [ 1, 2, 3, 4, 5, 10, 15, 20, 19, 18, 17, 16, 11, 6 ]

// */

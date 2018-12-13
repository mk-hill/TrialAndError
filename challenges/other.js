//
// ─── REVERSE STRING ─────────────────────────────────────────────────────────────
//

const string = 'This is a test string';
function reverse(str) {
  // Validate input
  if (!str || str.length < 2 || typeof str !== 'string') {
    return 'Invalid input';
  }
  // const inputArr = str.split('');
  const outputArr = [];
  for (let i = str.length - 1; i >= 0; i--) {
    outputArr.push(str[i]);
  }
  return outputArr.join('');
}

const reverse2 = str => str
  .split('')
  .reverse()
  .join('');

const reverse3 = str => [...str].reverse().join('');

reverse3(string);

//
// ─── MERGE SORTED ARRAYS ────────────────────────────────────────────────────────
// Output must remain sorted

// ? Positive ? Int ? Only numbers ?

const array1 = [0, 3, 5, 23, 78, 123, 538];
const array2 = [4, 8, 12, 59, 172, 234, 617];

function mergeSorted(arr1, arr2) {
  const newArr = [];
  let i = 0;
  let j = 0;
  while (i < arr1.length || j < arr2.length) {
    const item1 = arr1[i];
    const item2 = arr2[j];
    if (!item2 || item1 < item2) {
      newArr.push(item1);
      i++;
    } else {
      newArr.push(item2);
      j++;
    }
  }
  return newArr;
}

mergeSorted(array1, array2);

//
// ─── FIND FIRST RECURRING ITEM ──────────────────────────────────────────────────
//
// Given an array = [2,5,1,2,3,5,1,2,4]:
// It should return 2

// Given an array = [2,1,1,2,3,5,1,2,4]:
// It should return 1

// Given an array = [2,3,4,5]:
// It should return undefined

// Bonus... What if we had this:
const recArr = [2, 5, 5, 2, 3, 5, 1, 2, 4];
// return 5 because the pairs are before 2,2

function findFirstRecurringItem(arr) {
  const found = {};
  let result;
  arr.some((item) => {
    if (!found[item]) {
      found[item] = true;
      return false;
    }
    result = item;
    return true;
  });
  return result;
}
// ? Use a set ?

findFirstRecurringItem(recArr);

//
// ─── ROMAN TO INTEGER ───────────────────────────────────────────────────────────
//
/*
Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
For example, two is written as II in Roman numeral, just two one's added together. Twelve is written as, XII, which is simply X + II. The number twenty seven is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right.However, the numeral for four is not IIII.Instead, the number four is written as IV.Because the one is before the five we subtract it making four.The same principle applies to the number nine, which is written as IX.There are six instances where subtraction is used:

I can be placed before V(5) and X(10) to make 4 and 9.
X can be placed before L(50) and C(100) to make 40 and 90.
C can be placed before D(500) and M(1000) to make 400 and 900.
Given a roman numeral, convert it to an integer.Input is guaranteed to be within the range from 1 to 3999.

Example 1:

Input: "III"
Output: 3
Example 2:

Input: "IV"
Output: 4
Example 3:

Input: "IX"
Output: 9
Example 4:

Input: "LVIII"
Output: 58
Explanation: L = 50, V = 5, III = 3.
Example 5:

Input: "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
*/

/**
 * @param {string} s
 * @return {number}
 */
const romanToInt2 = (s) => {
  let result = 0;
  const values = {
    i: 1,
    v: 5,
    x: 10,
    l: 50,
    c: 100,
    d: 500,
    m: 1000,
  };
  const chars = s.toLowerCase().split('');
  chars.forEach((char, index) => {
    if (index === chars.length - 1 || values[char] >= values[chars[index + 1]]) {
      result += values[char];
    } else if (values[char] < values[chars[index + 1]]) {
      result -= values[char];
    }
  });
  return result;
};

/**
 *
 * @param {string} s testing123
 */
const romanToInt = (s) => {
  const values = {
    i: 1,
    v: 5,
    x: 10,
    l: 50,
    c: 100,
    d: 500,
    m: 1000,
  };
  const chars = s.toLowerCase().split('');
  return chars.reduce((acc, char, i) => {
    if (i === chars.length - 1 || values[char] >= values[chars[i + 1]]) {
      return acc + values[char];
    }
    if (values[char] < values[chars[i + 1]]) {
      return acc - values[char];
    }
  }, 0);
};

romanToInt();

// Advent of code earlier year example

const fs = require('fs');

const q1a = () => {
  fs.readFile('./santa.txt', (err, data) => {
    console.time('santa');
    const input = data.toString();
    const answer = input.match(/\(/g).length - input.match(/\)/g).length;
    console.log(`q1a = ${answer}`);
    console.timeEnd('santa');
  });
};

const q1b = () => {
  fs.readFile('./santa.txt', (err, data) => {
    console.time('santa2');
    const inputArr = data.toString().split('');
    const result = inputArr.reduce(
      (acc, val) => (val === '(' ? (acc += 1) : val === ')' ? (acc -= 1) : acc),
      0,
    );
    console.log(`q1b = ${result}`);
    console.timeEnd('santa2');
  });
};

const q1c = () => {
  fs.readFile('./santa.txt', (err, data) => {
    console.time('santa3');
    const inputArr = data.toString().split('');
    const result = inputArr.reduce((acc, val) => {
      if (val === '(') {
        acc += 1;
      }
      if (val === ')') {
        acc -= 1;
      }
      return acc;
    }, 0);
    console.log(`q1c = ${result}`);
    console.timeEnd('santa3');
  });
};

const q2a = () => {
  fs.readFile('./santa.txt', (err, data) => {
    console.time('santa4');
    let position = 0;
    const inputArr = data.toString().split('');
    const result = inputArr.reduce((acc, val) => {
      if (acc >= 0) {
        if (val === '(') {
          acc += 1;
        }
        if (val === ')') {
          acc -= 1;
        }
        position++;
        return acc;
      }
    }, 0);
    console.log(`q2a = ${position}`);
    console.timeEnd('santa4');
  });
};

const q2b = () => {
  fs.readFile('./santa.txt', (err, data) => {
    console.time('santa5');
    let acc = 0;
    let position = 0;
    const inputArr = data.toString().split('');
    const result = inputArr.some((val) => {
      if (val === '(') {
        acc += 1;
      }
      if (val === ')') {
        acc -= 1;
      }
      position++;
      return acc < 0;
    }, 0);
    console.log(`q2b = ${position}`);
    console.timeEnd('santa5');
  });
};

q1a();
q1b();
q1c();
q2a();
q2b();

function romanNumerals(arg) {
  function romanToInt(str) {
    const values = {
      i: 1,
      v: 5,
      x: 10,
      l: 50,
      c: 100,
      d: 500,
      m: 1000,
    };
    const chars = [...str.toLowerCase()];
    return chars.reduce((acc, char, i) => {
      if (i === chars.length - 1 || values[char] >= values[chars[i + 1]]) {
        return acc + values[char];
      }
      if (values[char] < values[chars[i + 1]]) {
        return acc - values[char];
      }
    }, 0);
  }
  function intToRoman(n) {
    const values = [
      [1000, 'M'],
      [900, 'CM'],
      [500, 'D'],
      [400, 'CD'],
      [100, 'C'],
      [90, 'XC'],
      [50, 'L'],
      [40, 'XL'],
      [10, 'X'],
      [9, 'IX'],
      [5, 'V'],
      [4, 'IV'],
      [1, 'I'],
    ];
    let currentVal = n;
    return values.reduce((str, arr) => {
      const [num, char] = arr;
      while (currentVal >= num) {
        currentVal -= num;
        str += char;
      }
      return str;
    }, '');
  }
  return typeof arg === 'number' ? intToRoman(arg) : romanToInt(arg);
}

// Pig latin translator

function TranslateWord(word) {
  if (typeof word !== 'string' || word.length === 0) return '';
  const vowels = 'aeiou';
  const startsWithVowel = vowels.includes(word[0].toLowerCase());
  if (startsWithVowel) return `${word}yay`;
  const firstVowel = [...vowels]
    .map(vowel => word.indexOf(vowel))
    .filter(i => i > -1)
    .sort((a, b) => a - b)[0];
  const isCapitalized = word[0] !== word[0].toLowerCase();
  if (!isCapitalized) return `${word.slice(firstVowel)}${word.slice(0, firstVowel)}ay`;
  return `${word.slice(firstVowel)[0].toUpperCase()}${word.slice(firstVowel + 1)}${word
    .slice(0, firstVowel)
    .toLowerCase()}ay`;
}

function TranslateSentence(sentence) {
  if (typeof sentence !== 'string' || sentence.length === 0) return '';
  return sentence
    .split(' ')
    .map((word) => {
      let hasPunctuation = false;
      const punctuation = /[?\\"",]/g;
      const indexes = [...word].reduce((tally, char) => {
        if (punctuation.test(char)) {
          hasPunctuation = true;

          tally.push([char, word.indexOf(char)]);
        } else if (char === '"') {
          tally.push([char, word.indexOf(char)]);
        }
        return tally;
      }, []);
      if (!hasPunctuation) return TranslateWord(word);
      const translatedChars = [...TranslateWord(word.replace(punctuation, ''))];
      indexes.forEach(arr => (arr[1] > 0 ? translatedChars.push(arr[0]) : translatedChars.unshift(arr[0])));
      return `${translatedChars.join('')}`;
    })
    .join(' ');
}

/**
 * Given a square matrix, calculate the absolute difference between the sums of its diagonals.

For example, the square matrix  is shown below:

1 2 3
4 5 6
9 8 9
The left-to-right diagonal = . The right to left diagonal = . Their absolute difference is .

Function description

Complete the  function in the editor below. It must return an integer representing the absolute diagonal difference.

diagonalDifference takes the following parameter:

arr: an array of integers .
Input Format

The first line contains a single integer, , the number of rows and columns in the matrix .
Each of the next  lines describes a row, , and consists of  space-separated integers .

Constraints

Output Format

Print the absolute difference between the sums of the matrix's two diagonals as a single integer.

Sample Input

3
11 2 4
4 5 6
10 8 -12
Sample Output

15
Explanation

The primary diagonal is:

11
   5
     -12
Sum across the primary diagonal: 11 + 5 - 12 = 4

The secondary diagonal is:

     4
   5
10
Sum across the secondary diagonal: 4 + 5 + 10 = 19
Difference: |4 - 19| = 15

Note: |x| is the absolute value of x
 */

//! incomplete
// function diagonalDifference(arr) {
//   return Math.abs(
//     arr
//       .reduce(
//         (tally, subArr, i) => {
//           tally[0] += subArr[i];
//           tally[1] += subArr[subArr.length - (i + 1)];
//           return tally;
//         },
//         [0, 0],
//       )
//       .reduce((x, y) => x - y),
//   );
// }

function miniMaxSum(arr) {
  const sorted = [...arr].sort((x, y) => x - y);
  return console.log(
    `${sorted.slice(0, 4).reduce((x, y) => x + y)} ${sorted.slice(1).reduce((x, y) => x + y)}`,
  );
}

// Complete the playingWithNumbers function below.
function playingWithNumbers(arr, queries) {
  return queries.map((q) => {
    arr = arr.map(n => n + q);
    const absSum = arr.reduce((x, y) => Math.abs(x) + Math.abs(y));
    console.log(absSum);
    return absSum;
  });
}

// Complete the climbingLeaderboard function below.
function climbingLeaderboard(scores, alice) {
  const uniqueScores = [...new Set(scores)];
  const scoreMap = {};
  uniqueScores.forEach((score, index) => {
    scoreMap[score] = index + 1;
  });
  let startingPoint;

  return alice.map((score) => {
    if (score > uniqueScores[0]) return 1;
    if (score < uniqueScores[uniqueScores.length - 1]) {
      return scoreMap[uniqueScores[uniqueScores.length - 1]] + 1;
    }

    if (!startingPoint) {
      let chunk = [...uniqueScores];
      while (chunk.length > 1000) {
        const mid = Math.floor(chunk.length / 2);
        if (score === chunk[mid]) return scoreMap[chunk[mid]];
        chunk = score > chunk[mid] ? chunk.slice(0, mid) : chunk.slice(mid);
      }
      startingPoint = scoreMap[chunk[chunk.length - 1]] - 1;
    }

    let lastScore;
    for (let i = startingPoint; i >= 0; i--) {
      if (uniqueScores[i] > score) break;
      lastScore = uniqueScores[i];
    }
    startingPoint = scoreMap[lastScore] - 1;
    return scoreMap[lastScore];
  });
}

function gradingStudents(grades) {
  return grades.map((grade) => {
    if (grade < 38 || grade % 5 < 3) return grade;
    return grade + (5 - (grade % 5));
  });
}

// Complete the designerPdfViewer function below.
function designerPdfViewer(h, word) {
  const heights = [...word]
    .map((c, i) => {
      const code = word.charCodeAt(i);
      if (code > 64 && code < 96) {
        return code - 65;
      }
      return code - 97;
    })
    .map(i => h[i]);
  return Math.max(...heights) * word.length;
}

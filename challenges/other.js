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

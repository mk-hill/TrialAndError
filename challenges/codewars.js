// Given an array, find the int that appears an odd number of times.
// There will always be only one integer that appears an odd number of times.

function findOdd(A) {
  const counts = A.reduce((countObj, num) => {
    countObj[num] = (countObj[num] || 0) + 1;
    return countObj;
  }, {});
  let result;
  Object.keys(counts).forEach((key) => {
    if (counts[key] % 2 !== 0) {
      result = Number(key);
    }
  });
  return result;
}

findOdd([1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 5]);

// Your goal in this kata is to implement a difference function, which subtracts one list from another and returns the result.
// It should remove all values from list a, which are present in list b.
// array_diff([1, 2], [1]) == [2]
// If a value is present in b, all of its occurrences must be removed from the other:
// array_diff([1, 2, 2, 2, 3], [2]) == [1, 3]

function array_diff(a, b) {
  return a.filter(x => !b.includes(x));
}

// Jaden Smith, the son of Will Smith, is the star of films such as The Karate Kid(2010) and After Earth(2013).Jaden is also known for some of his philosophy that he delivers via Twitter.When writing on Twitter, he is known for almost always capitalizing every word.
// Your task is to convert strings to how they would be written by Jaden Smith.The strings are actual quotes from Jaden Smith, but they are not capitalized in the same way he originally typed them.

//   Example:
// Not Jaden - Cased: "How can mirrors be real if our eyes aren't real"
// Jaden - Cased: "How Can Mirrors Be Real If Our Eyes Aren't Real"

String.prototype.toJadenCase = function () {
  const words = this.split(' ');
  const jadenWords = words.map(word => word.replace(word[0], word[0].toUpperCase()));
  return jadenWords.join(' ');
};

function getWordScore(word) {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  return [...word].reduce((totalScore, char) => {
    totalScore += letters.indexOf(char.toLowerCase()) + 1;
    return totalScore;
  }, 0);
}

function high(x) {
  const words = x.split(' ');
  const scores = words.map(word => getWordScore(word));

  const max = Math.max(...scores);
  const maxScores = scores.filter(score => score === max);

  return words[scores.indexOf(maxScores[0])];
}

function countKprimes(k, start, nd) {
  const kPrimes = [];

  for (let n = start; n <= nd; n++) {
    const primeFactors = n === 0 ? 0 : getPrimeFactors(n);
    if (primeFactors === k) {
      kPrimes.push(n);
    }
  }
  return kPrimes;
}

function puzzle(s) {
  const [aPrimes, bPrimes, cPrimes] = [1, 3, 7].map(num => countKprimes(num, 2, s));
  let solutions = 0;

  aPrimes.forEach((a) => {
    bPrimes.forEach((b) => {
      cPrimes.forEach((c) => {
        if (a + b + c > s) return;
        if (a + b + c === s) solutions++;
      });
    });
  });

  return solutions;
}

function getPrimeFactors(num) {
  const primeFactors = [];
  while (num % 2 === 0) {
    primeFactors.push(2);
    num /= 2;
  }

  const sqrt = Math.sqrt(num);

  for (let i = 3; i <= sqrt; i++) {
    while (num % i === 0) {
      primeFactors.push(i);
      num /= i;
    }
  }

  if (num > 2) {
    primeFactors.push(num);
  }
  return primeFactors.length;
}

// Total amount of points
function points(games) {
  return games.reduce((totalScore, scoreString) => {
    const x = Number(scoreString[0]);
    const y = Number(scoreString[2]);

    if (x > y) {
      totalScore += 3;
    } else if (x === y) {
      totalScore += 1;
    }

    return totalScore;
  }, 0);
}

// https://www.codewars.com/kata/5502c9e7b3216ec63c0001aa/train/javascript

function openOrSenior(data) {
  return data.map(ar => (ar[0] >= 55 && ar[1] > 7 ? 'Senior' : 'Open'));
}

// https://www.codewars.com/kata/vasya-clerk/train/javascript

function tickets(peopleInLine) {
  const register = {
    25: 0,
    50: 0,
    hasChangeFor(bill) {
      if (bill === 25) {
        this['25']++;
        return true;
      }
      if (bill === 50) {
        if (this['25']) {
          this['50']++;
          this['25']--;
          return true;
        }
        return false;
      }
      if (bill === 100) {
        if (this['50'] && this['25']) {
          this['50']--;
          this['25']--;
          return true;
        }
        if (this['25'] >= 3) {
          this['25'] -= 3;
          return true;
        }
        return false;
      }
    },
  };
  return peopleInLine.every(bill => register.hasChangeFor(bill)) ? 'YES' : 'NO';
}

// https://www.codewars.com/kata/514b92a657cdc65150000006/

function sumThreesAndFives(number) {
  const numsToSum = {};

  for (let x = 3; x < number; x += 3) {
    numsToSum[x] = x;
  }
  for (let x = 5; x < number; x += 5) {
    numsToSum[x] = x;
  }

  return Object.values(numsToSum).reduce((total, num) => total + num, 0);
}

function countSheep(num) {
  return Array(num)
    .fill()
    .map((undef, i) => `${i + 1} sheep...`)
    .join('');
}

// https://www.codewars.com/kata/meeting/
const meeting = s => s
  .split(';')
  .map((name) => {
    const [f, l] = name.split(':');
    return { first: f.toUpperCase(), last: l.toUpperCase() };
  })
  .sort((x, y) => {
    const compare = (a, b) => (a > b ? 1 : -1);
    return x.last === y.last ? compare(x.first, y.first) : compare(x.last, y.last);
  })
  .map(name => `(${name.last}, ${name.first})`)
  .join('');

function nthSmallest(arr, n) {
  // your code
  return [...new Set(arr)].sort((x, y) => x - y)[n - 1] || null;
}

// https://www.codewars.com/kata/is-there-a-vowel-in-there/train/javascript
function isVow(a) {
  const codes = ['a', 'e', 'i', 'o', 'u'].reduce((obj, char) => {
    obj[char.charCodeAt(0)] = char;
    return obj;
  }, {});
  return a.map(num => (num in codes ? codes[num] : num));
}

// https://www.codewars.com/kata/stop-gninnips-my-sdrow/train/javascript
function spinWords(str) {
  return str
    .split(' ')
    .map(word => (word.length > 4 ? [...word].reverse().join('') : word))
    .join(' ');
}

// https://www.codewars.com/kata/541c8630095125aba6000c00/solutions/javascript
function digital_root(n) {
  const sum = [...`${n}`].reduce((x, y) => Number(x) + Number(y));
  return `${sum}`.length > 1 ? digital_root(sum) : Number(sum);
}

/**
 * function digital_root(n) {
 *   return (n - 1) % 9 + 1;
 * }
 */

// https://www.codewars.com/kata/find-the-parity-outlier/train/javascript

function findOutlier(integers) {
  const isEven = integers
    .slice(0, 3)
    .reduce(
      (tally, int) => {
        if (int % 2 === 0) {
          tally.even++;
        } else {
          tally.odd++;
        }
        return tally;
      },
      {
        even: 0,
        odd: 0,
        isEven() {
          return this.even > this.odd;
        },
      },
    )
    .isEven();
  return isEven ? integers.find(int => int % 2 !== 0) : integers.find(int => int % 2 === 0);
}

// https://www.codewars.com/kata/who-likes-it/train/javascript
function likes(names) {
  if (names.length < 2) {
    return `${names[0] || 'no one'} likes this`;
  }

  let output = '';

  if (names.length > 2) {
    output += `${names[0]}, `;
  }

  if (names.length < 4) {
    output += names.slice(-2).join(' and ');
  } else {
    output += `${names[1]} and ${names.length - 2} others`;
  }

  return `${output} like this`;
}

// https://www.codewars.com/kata/mexican-wave/train/javascript asd
const wave = str => [...str]
  .map((char, i) => {
    const newStr = [...str];
    newStr[i] = char.toUpperCase();
    return newStr.join('');
  })
  .filter(s => s !== str);

// https://www.codewars.com/kata/abbreviate-a-two-word-name/train/javascript
function abbrevName(name) {
  return name
    .split(' ')
    .map(word => word[0].toUpperCase())
    .join('.');
}

// https://www.codewars.com/kata/return-the-day/train/javascript
function whatDay(num) {
  const days = {
    1: 'Sunday',
    2: 'Monday',
    3: 'Tuesday',
    4: 'Wednesday',
    5: 'Thursday',
    6: 'Friday',
    7: 'Saturday',
  };

  return num in days ? days[num] : 'Wrong, please enter a number between 1 and 7';
}

// https://www.codewars.com/kata/will-there-be-enough-space/train/javascript
function enough(cap, on, wait) {
  return cap >= on + wait ? 0 : on + wait - cap;
}

// https://www.codewars.com/kata/58dbdccee5ee8fa2f9000058/solutions/javascript
function spEng(sentence) {
  return /english/gi.test(sentence);
}

// https://www.codewars.com/kata/string-scramble/train/javascript
function scramble(str, arr) {
  const scrambled = [];
  arr.forEach((targetIndex, currentIndex) => {
    scrambled[targetIndex] = str[currentIndex];
  });
  return scrambled.join('');
}

// https://www.codewars.com/kata/sum-strings-as-numbers/train/javascript
function sumStrings(a, b) {
  const result = [];
  const addDigitsAndCarry = (x = 0, y = 0, carry = 0) => {
    const sum = Number(x) + Number(y) + Number(carry);
    if (sum < 10) return { digit: `${sum}`, carry: false };
    return { digit: `${sum - 10}`, carry: true };
  };
  let lastCarry = false;
  for (let i = 1; i <= Math.max(a.length, b.length) + 1; i++) {
    const { digit, carry } = addDigitsAndCarry(a[a.length - i], b[b.length - i], lastCarry);
    result.push(digit);
    lastCarry = carry;
  }
  while (result[result.length - 1] === '0') result.pop();
  return result.reverse().join('');
}

// https://www.codewars.com/kata/shortest-word/train/javascript
function findShort(s) {
  return Math.min(...s.split(' ').map(word => word.length));
}

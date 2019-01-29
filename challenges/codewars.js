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

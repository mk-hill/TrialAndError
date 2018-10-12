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

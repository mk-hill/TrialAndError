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

const reverse2 = str =>
  str
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
  arr.some(item => {
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

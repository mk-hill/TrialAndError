//
// ─── BUBBLE SORT ────────────────────────────────────────────────────────────────
//
const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

// * Unnecessary variable assignments
function oldBubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      const first = array[j];
      const second = array[j + 1];
      if (first > second) {
        array[j] = second;
        array[j + 1] = first;
      }
    }
  }
  return array;
}

function bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (array[j] > array[j + 1]) {
        const first = array[j];
        array[j] = array[j + 1];
        array[j + 1] = first;
      }
    }
  }
  return array;
}

bubbleSort(numbers);
console.log(numbers);

//
// ─── SELECTION SORT ─────────────────────────────────────────────────────────────
//

function notQuiteSelectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[i]) {
        const jItem = arr[j];
        arr[j] = arr[i];
        arr[i] = jItem;
      }
    }
  }
  return arr;
}

// ? No need to swap as above ?

function selectionSort(arr) {
  const length = arr.length;
  for (let i = 0; i < length; i++) {
    // set current index as minimum
    let min = i;
    const temp = arr[i];
    for (let j = i + 1; j < length; j++) {
      if (arr[j] < arr[min]) {
        // Update minimum if current is lower that what we had previously
        min = j;
      }
    }
    arr[i] = arr[min];
    arr[min] = temp;
  }
  return arr;
}

//
// ─── INSERTION SORT ─────────────────────────────────────────────────────────────
// Fast for nearly sorted data

function insertionSort(arr) {
  const sortedArr = [];
  sortedArr.push(arr[0]);
  for (let i = 1; i < arr.length; i++) {
    let j = sortedArr.length;
    while (arr[i] < sortedArr[j - 1]) {
      j--;
    }
    sortedArr.splice(j, 0, arr[i]);
  }
  return sortedArr;
}

// Todo compare performance of these two

function insertionSort2(array) {
  const length = array.length;
  for (let i = 0; i < length; i++) {
    if (array[i] < array[0]) {
      // move number to the first position
      array.unshift(array.splice(i, 1)[0]);
    } else {
      // find where number should go
      for (let j = 1; j < i; j++) {
        if (array[i] > array[j - 1] && array[i] < array[j]) {
          // move number to the right spot
          array.splice(j, 0, array.splice(i, 1)[0]);
        }
      }
    }
  }
}

//
// ─── MERGE SORT ─────────────────────────────────────────────────────────────────
//

function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  }
  // Split Array in into right and left
  // ? Math.floor in case length is odd ?
  const mid = Math.floor(arr.length / 2);
  const firstHalf = arr.slice(0, mid);
  const secondHalf = arr.slice(mid);
  return merge(mergeSort(firstHalf), mergeSort(secondHalf));
}

function merge(left, right) {
  const newArr = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      newArr.push(left.shift());
    } else if (left[0] > right[0]) {
      newArr.push(right.shift());
    }
  }
  // Concat any remaining
  return newArr.concat(left.length ? left : right);
}

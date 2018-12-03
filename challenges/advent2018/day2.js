/* eslint-disable no-console */
/* eslint-disable max-len */
const input = require('./input');

/**
 * --- Day 2: Inventory Management System ---
You stop falling through time, catch your breath, and check the screen on the device. "Destination reached. Current Year: 1518. Current Location: North Pole Utility Closet 83N10." You made it! Now, to find those anomalies.

Outside the utility closet, you hear footsteps and a voice. "...I'm not sure either. But now that so many people have chimneys, maybe he could sneak in that way?" Another voice responds, "Actually, we've been working on a new kind of suit that would let him fit through tight spaces like that. But, I heard that a few days ago, they lost the prototype fabric, the design plans, everything! Nobody on the team can even seem to remember important details of the project!"

"Wouldn't they have had enough fabric to fill several boxes in the warehouse? They'd be stored together, so the box IDs should be similar. Too bad it would take forever to search the warehouse for two similar box IDs..." They walk too far away to hear any more.

Late at night, you sneak to the warehouse - who knows what kinds of paradoxes you could cause if you were discovered - and use your fancy wrist device to quickly scan every box and produce a list of the likely candidates (your puzzle input).

To make sure you didn't miss any, you scan the likely candidate boxes again, counting the number that have an ID containing exactly two of any letter and then separately counting those with exactly three of any letter. You can multiply those two counts together to get a rudimentary checksum and compare it to what your device predicts.

For example, if you see the following box IDs:

abcdef contains no letters that appear exactly two or three times.
bababc contains two a and three b, so it counts for both.
abbcde contains two b, but no letter appears exactly three times.
abcccd contains three c, but no letter appears exactly two times.
aabcdd contains two a and two d, but it only counts once.
abcdee contains two e.
ababab contains three a and three b, but it only counts once.
Of these box IDs, four of them contain a letter which appears exactly twice, and three of them contain a letter which appears exactly three times. Multiplying these together produces a checksum of 4 * 3 = 12.

What is the checksum for your list of box IDs?
 */

const boxIds = input.day2.split('\n');

function getChecksum(ids) {
  let twoLetterCount = 0;
  let threeLetterCount = 0;

  ids.forEach((id) => {
    const charCounts = id.split('').reduce((tally, char) => {
      tally[char] = tally[char] ? tally[char] + 1 : 1;
      return tally;
    }, {});

    const incrementTwoCount = Object.keys(charCounts).some(key => charCounts[key] === 2);
    const incrementThreeCount = Object.keys(charCounts).some(key => charCounts[key] === 3);

    if (incrementTwoCount) {
      twoLetterCount += 1;
    }
    if (incrementThreeCount) {
      threeLetterCount += 1;
    }
  });

  return twoLetterCount * threeLetterCount;
}

console.group('Day 2');
console.log('Checksum: ', getChecksum(boxIds)); // 6696

/**
 * Your puzzle answer was 6696.

The first half of this puzzle is complete! It provides one gold star: *

--- Part Two ---
Confident that your list of box IDs is complete, you're ready to find the boxes full of prototype fabric.

The boxes will have IDs which differ by exactly one character at the same position in both strings. For example, given the following box IDs:

abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz
The IDs abcde and axcye are close, but they differ by two characters (the second and fourth). However, the IDs fghij and fguij differ by exactly one character, the third (h and u). Those must be the correct boxes.

What letters are common between the two correct box IDs? (In the example above, this is found by removing the differing character from either ID, producing fgij.)

Although it hasn't changed, you can still get your puzzle input.
 */

console.log(
  'All ids same length? ',
  boxIds.every(
    (id, index) => id.length === (boxIds[index + 1] ? boxIds[index + 1] : boxIds[boxIds.length - 1]).length,
  ),
);
// All ID's appear to be the same length

function compareTwoIds(id1, id2 = '') {
  const commonChars = id1.split('').filter((char, index) => char === id2.split('')[index]);
  return commonChars.length === id1.length - 1 ? commonChars : false;
}

function getCorrectIds(ids) {
  const results = [];
  ids.forEach((id, index) => {
    let nextIndex = index + 1;
    while (nextIndex < ids.length) {
      const found = compareTwoIds(id, ids[nextIndex]);
      if (found) {
        results.push(found);
      }
      nextIndex += 1;
    }
  });

  return results.length > 1 ? `Error: more than one match found. ${results}` : results[0].join('');
}

console.log('Common characters in correct box IDs: ', getCorrectIds(boxIds)); // bvnfawcnyoeyudzrpgslimtkj

console.groupEnd('Day 2');

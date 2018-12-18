/* eslint-disable no-console */
/* eslint-disable max-len */
const input = require('./input');

/**
 * --- Day 18: Settlers of The North Pole ---
On the outskirts of the North Pole base construction project, many Elves are collecting lumber.

The lumber collection area is 50 acres by 50 acres; each acre can be either open ground (.), trees (|), or a lumberyard (#). You take a scan of the area (your puzzle input).

Strange magic is at work here: each minute, the landscape looks entirely different. In exactly one minute, an open acre can fill with trees, a wooded acre can be converted to a lumberyard, or a lumberyard can be cleared to open ground (the lumber having been sent to other projects).

The change to each acre is based entirely on the contents of that acre as well as the number of open, wooded, or lumberyard acres adjacent to it at the start of each minute. Here, "adjacent" means any of the eight acres surrounding that acre. (Acres on the edges of the lumber collection area might have fewer than eight adjacent acres; the missing acres aren't counted.)

In particular:

An open acre will become filled with trees if three or more adjacent acres contained trees. Otherwise, nothing happens.
An acre filled with trees will become a lumberyard if three or more adjacent acres were lumberyards. Otherwise, nothing happens.
An acre containing a lumberyard will remain a lumberyard if it was adjacent to at least one other lumberyard and at least one acre containing trees. Otherwise, it becomes open.
These changes happen across all acres simultaneously, each of them using the state of all acres at the beginning of the minute and changing to their new form by the end of that same minute. Changes that happen during the minute don't affect each other.

For example, suppose the lumber collection area is instead only 10 by 10 acres with this initial configuration:

Initial state:
.#.#...|#.
.....#|##|
.|..|...#.
..|#.....#
#.#|||#|#|
...#.||...
.|....|...
||...#|.#|
|.||||..|.
...#.|..|.

After 1 minute:
.......##.
......|###
.|..|...#.
..|#||...#
..##||.|#|
...#||||..
||...|||..
|||||.||.|
||||||||||
....||..|.

After 2 minutes:
.......#..
......|#..
.|.|||....
..##|||..#
..###|||#|
...#|||||.
|||||||||.
||||||||||
||||||||||
.|||||||||

After 3 minutes:
.......#..
....|||#..
.|.||||...
..###|||.#
...##|||#|
.||##|||||
||||||||||
||||||||||
||||||||||
||||||||||

After 4 minutes:
.....|.#..
...||||#..
.|.#||||..
..###||||#
...###||#|
|||##|||||
||||||||||
||||||||||
||||||||||
||||||||||

After 5 minutes:
....|||#..
...||||#..
.|.##||||.
..####|||#
.|.###||#|
|||###||||
||||||||||
||||||||||
||||||||||
||||||||||

After 6 minutes:
...||||#..
...||||#..
.|.###|||.
..#.##|||#
|||#.##|#|
|||###||||
||||#|||||
||||||||||
||||||||||
||||||||||

After 7 minutes:
...||||#..
..||#|##..
.|.####||.
||#..##||#
||##.##|#|
|||####|||
|||###||||
||||||||||
||||||||||
||||||||||

After 8 minutes:
..||||##..
..|#####..
|||#####|.
||#...##|#
||##..###|
||##.###||
|||####|||
||||#|||||
||||||||||
||||||||||

After 9 minutes:
..||###...
.||#####..
||##...##.
||#....###
|##....##|
||##..###|
||######||
|||###||||
||||||||||
||||||||||

After 10 minutes:
.||##.....
||###.....
||##......
|##.....##
|##.....##
|##....##|
||##.####|
||#####|||
||||#|||||
||||||||||
After 10 minutes, there are 37 wooded acres and 31 lumberyards. Multiplying the number of wooded acres by the number of lumberyards gives the total resource value after ten minutes: 37 * 31 = 1147.

What will the total resource value of the lumber collection area be after 10 minutes?
 */

// Format: mapStrings[y][x]
const mapStrings = input.day18.split('\n');

class Acre {
  constructor(x, y, char) {
    this.x = x;
    this.y = y;
    this.char = char;
    this.surroundings = []; // Actual surrounding nodes updating in real time
    this.lastSurroundingChars = []; // Container for what the chars of each surrounding node was at the end of the last minute
  }

  setChar(char) {
    this.char = char;
  }

  passMinute() {
    const [surroundingTrees, surroundingLumberyards] = this.lastSurroundingChars.reduce(
      (tally, char) => {
        if (char === '|') tally[0] += 1;
        if (char === '#') tally[1] += 1;
        return tally;
      },
      [0, 0],
    );
    if (this.char === '.' && surroundingTrees > 2) return this.setChar('|');
    if (this.char === '|' && surroundingLumberyards > 2) return this.setChar('#');
    if (this.char === '#' && (surroundingTrees < 1 || surroundingLumberyards < 1)) return this.setChar('.');
  }

  updateSurroundingChars() {
    this.lastSurroundingChars = this.surroundings.map(acre => acre.char);
  }
}

function generateMap(lines = mapStrings) {
  const nodes = lines.map((line, y) => [...line].map((char, x) => new Acre(x, y, char)));
  nodes.forEach(line => line.forEach((node) => {
    [node.y - 1, node.y, node.y + 1].forEach((y) => {
      [node.x - 1, node.x, node.x + 1].forEach((x) => {
        // Account for map edges and node itself
        if (!nodes[y] || !nodes[y][x] || nodes[y][x] === node) return;
        node.surroundings.push(nodes[y][x]);
        node.lastSurroundingChars.push(nodes[y][x].char);
      });
    });
  }));
  // No longer need array of arrays for [y][x], returning flattened
  return [].concat(...nodes);
}

// Get resource value of any given map
const calculateResourceValue = map => map
  .reduce(
    (tally, acre) => {
      if (acre.char === '|') tally[0] += 1;
      if (acre.char === '#') tally[1] += 1;
      return tally;
    },
    [0, 0],
  )
  .reduce((trees, lumberyards) => trees * lumberyards);

// Return value for final map after given number of minutes
function advanceTime(minsToGo = 10, map = generateMap()) {
  let minsPassed = 0;
  while (minsPassed < minsToGo) {
    map.forEach(acre => acre.passMinute());
    map.forEach(acre => acre.updateSurroundingChars());
    minsPassed += 1;
  }
  return calculateResourceValue(map);
}
console.group('Day 18');
console.log(`Resource value after 10 minutes: \x1b[32m${advanceTime()}\x1b[0m`); // 623583

/**
 * Your puzzle answer was 623583.

The first half of this puzzle is complete! It provides one gold star: *

--- Part Two ---
This important natural resource will need to last for at least thousands of years. Are the Elves collecting this lumber sustainably?

What will the total resource value of the lumber collection area be after 1000000000 minutes?
 */

function advanceMoreTime(minsToGo = 1000000000, maxPatternLength = 1000, map = generateMap()) {
  let minsElapsed = 0;
  const resourceValues = [calculateResourceValue(map)]; // Values in order of appearance - adding current value for min 0 to match index to minsElapsed
  const valueOccurrences = { [resourceValues[0]]: minsElapsed }; // Each past resource value and the minute it occurred after
  // Keep calculating until some values start repeating consistently, unless minsToGo is set low enough that they don't
  while (minsElapsed < minsToGo && !Object.values(valueOccurrences).some(ar => ar.length > 100)) {
    map.forEach(acre => acre.passMinute());
    map.forEach(acre => acre.updateSurroundingChars());
    minsElapsed += 1;
    const value = calculateResourceValue(map);
    if (!valueOccurrences[value]) valueOccurrences[value] = [];
    valueOccurrences[value].push(minsElapsed);
    resourceValues.push(value);
  }
  // No need to do pattern stuff if we've already calculated desired minsToGo (part 1)
  if (minsElapsed === minsToGo) return resourceValues[resourceValues.length - 1];
  // Set to eliminate duplicates, Math.min in case larger length than available is given
  const valuesToCheck = [
    ...new Set(resourceValues.slice(-Math.min(resourceValues.length, maxPatternLength))),
  ];
  // Check each value and set patternLength to highest repetition interval to account for values occurring more than once in the pattern
  const patternLength = valuesToCheck.reduce((tally, value) => {
    const repetitionInterval = valueOccurrences[value][valueOccurrences[value].length - 1]
      - valueOccurrences[value][valueOccurrences[value].length - 2];
    if (repetitionInterval > tally) tally = repetitionInterval;
    return tally;
  }, 0);

  // Return corresponding index from the repeated slice
  return resourceValues.slice(-patternLength)[((minsToGo - minsElapsed) % patternLength) - 1];
}

console.log(`Resource value after 1000000000 minutes: \x1b[32m${advanceMoreTime()}\x1b[0m`); // 107912
console.groupEnd('Day 18');

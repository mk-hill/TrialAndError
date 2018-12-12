/* eslint-disable no-console */
/* eslint-disable max-len */
const input = require('./input');

/**
 *--- Day 12: Subterranean Sustainability ---
The year 518 is significantly more underground than your history books implied. Either that, or you've arrived in a vast cavern network under the North Pole.

After exploring a little, you discover a long tunnel that contains a row of small pots as far as you can see to your left and right. A few of them contain plants - someone is trying to grow things in these geothermally-heated caves.

The pots are numbered, with 0 in front of you. To the left, the pots are numbered -1, -2, -3, and so on; to the right, 1, 2, 3.... Your puzzle input contains a list of pots from 0 to the right and whether they do (#) or do not (.) currently contain a plant, the initial state. (No other pots currently contain plants.) For example, an initial state of #..##.... indicates that pots 0, 3, and 4 currently contain plants.

Your puzzle input also contains some notes you find on a nearby table: someone has been trying to figure out how these plants spread to nearby pots. Based on the notes, for each generation of plants, a given pot has or does not have a plant based on whether that pot (and the two pots on either side of it) had a plant in the last generation. These are written as LLCRR => N, where L are pots to the left, C is the current pot being considered, R are the pots to the right, and N is whether the current pot will have a plant in the next generation. For example:

A note like ..#.. => . means that a pot that contains a plant but with no plants within two pots of it will not have a plant in it during the next generation.
A note like ##.## => . means that an empty pot with two plants on each side of it will remain empty in the next generation.
A note like .##.# => # means that a pot has a plant in a given generation if, in the previous generation, there were plants in that pot, the one immediately to the left, and the one two pots to the right, but not in the ones immediately to the right and two to the left.
It's not clear what these plants are for, but you're sure it's important, so you'd like to make sure the current configuration of plants is sustainable by determining what will happen after 20 generations.

For example, given the following input:

initial state: #..#.#..##......###...###

...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #
For brevity, in this example, only the combinations which do produce a plant are listed. (Your input includes all possible combinations.) Then, the next 20 generations will look like this:

                 1         2         3
       0         0         0         0
 0: ...#..#.#..##......###...###...........
 1: ...#...#....#.....#..#..#..#...........
 2: ...##..##...##....#..#..#..##..........
 3: ..#.#...#..#.#....#..#..#...#..........
 4: ...#.#..#...#.#...#..#..##..##.........
 5: ....#...##...#.#..#..#...#...#.........
 6: ....##.#.#....#...#..##..##..##........
 7: ...#..###.#...##..#...#...#...#........
 8: ...#....##.#.#.#..##..##..##..##.......
 9: ...##..#..#####....#...#...#...#.......
10: ..#.#..#...#.##....##..##..##..##......
11: ...#...##...#.#...#.#...#...#...#......
12: ...##.#.#....#.#...#.#..##..##..##.....
13: ..#..###.#....#.#...#....#...#...#.....
14: ..#....##.#....#.#..##...##..##..##....
15: ..##..#..#.#....#....#..#.#...#...#....
16: .#.#..#...#.#...##...#...#.#..##..##...
17: ..#...##...#.#.#.#...##...#....#...#...
18: ..##.#.#....#####.#.#.#...##...##..##..
19: .#..###.#..#.#.#######.#.#.#..#.#...#..
20: .#....##....#####...#######....#.#..##.
The generation is shown along the left, where 0 is the initial state. The pot numbers are shown along the top, where 0 labels the center pot, negative-numbered pots extend to the left, and positive pots extend toward the right. Remember, the initial state begins at pot 0, which is not the leftmost pot used in this example.

After one generation, only seven plants remain. The one in pot 0 matched the rule looking for ..#.., the one in pot 4 matched the rule looking for .#.#., pot 9 matched .##.., and so on.

In this example, after 20 generations, the pots shown as # contain plants, the furthest left of which is pot -2, and the furthest right of which is pot 34. Adding up all the numbers of plant-containing pots after the 20th generation produces 325.

After 20 generations, what is the sum of the numbers of all pots which contain a plant?
 */

const [firstLine, ...ruleStrings] = input.day12.split('\n').filter(line => line !== '');

const initialState = firstLine.split(' ')[2];

const spreadRules = ruleStrings
  .map(str => str.split(' => '))
  .reduce((obj, rule) => {
    const [pattern, result] = rule;
    obj[pattern] = result;
    return obj;
  }, {});

// console.log(initialState, spreadRules);

const getSurroundings = (str, i) => `${str[i - 2] ? str[i - 2] : '.'}${str[i - 1] ? str[i - 1] : '.'}${str[i]}${
  str[i + 1] ? str[i + 1] : '.'
}${str[i + 2] ? str[i + 2] : '.'}`;

// Modified for part 2
function calculateGenerations({
  gensToGo = 20,
  print = true,
  state = initialState,
  rules = spreadRules,
} = {}) {
  let currentState = state;
  let nextState = [];
  let currentGen = 0;
  if (print) console.log(`00 - ${currentState}`);
  while (currentGen < gensToGo) {
    if (currentState[currentState.length - 1] === '#') {
      currentState = `${currentState}.`;
    }
    for (let i = 0; i < currentState.length; i++) {
      nextState.push(rules[getSurroundings(currentState, i)]);
    }
    currentState = nextState.join('');
    nextState = [];
    currentGen += 1;
    if (print) {
      console.log(
        currentGen < 9 ? `0${currentGen} - ${currentState}` : `${currentGen} - ${currentState}`,
      );
    }
  }
  const totalPlantValue = [...currentState].reduce((total, char, i) => {
    if (char === '#') total += i;
    return total;
  }, 0);
  const numPlants = [...currentState].filter(char => char === '#').length;
  const plantIndices = [...currentState].reduce((arr, char, i) => {
    if (char === '#') arr.push(i);
    return arr;
  }, []);
  return {
    totalPlantValue,
    numPlants,
    plantIndices,
    state: currentState,
  };
}

console.group('Day 12');
console.log(
  'Answer after 20 generations:',
  `\x1b[32m${calculateGenerations().totalPlantValue}\x1b[0m`,
); // 1787

/**
 * Your puzzle answer was 1787.

The first half of this puzzle is complete! It provides one gold star: *

--- Part Two ---
You realize that 20 generations aren't enough. After all, these plants will need to last another 1500 years to even reach your timeline, not to mention your future.

After fifty billion (50000000000) generations, what is the sum of the numbers of all pots which contain a plant?
 */

// Find a generation after which the number of plants do not change
function findStableGen() {
  let lastState = calculateGenerations({ gensToGo: 0, print: false });
  let gensPassed = 0;
  let currentState = {};
  let lastNums = [];
  let lastPlantIndices = [];

  while (lastNums.length < 10) {
    lastNums.push(lastState.numPlants);
    lastPlantIndices.push(lastState.plantIndices);
    currentState = calculateGenerations({ gensToGo: 1, state: lastState.state, print: false });
    lastState = currentState;
    gensPassed += 1;
    // Keep flushing lastNums and lastPlantIndices until number of plants stops changing
    if (lastNums.length > 5 && !lastNums.every(n => n === lastNums[0])) {
      lastNums = [];
      lastPlantIndices = [];
    }
  }

  // Make sure I didn't mess up
  if (currentState.state !== calculateGenerations({ gensToGo: gensPassed, print: false }).state) throw new Error('Incorrect state calculation');

  lastPlantIndices.push(currentState.plantIndices);
  return {
    stableState: {
      ...currentState,
      gen: gensPassed,
    },
    lastPlantIndices,
  };
}

// Find how much each plant's value increases per generation once number of plants is stable
function getChangePerGen(lastPlantIndices) {
  const last = lastPlantIndices[lastPlantIndices.length - 2];
  const current = lastPlantIndices[lastPlantIndices.length - 1];
  const differences = current.map((n, i) => n - last[i]);

  // Validate that the changes are the same for each number
  if (!differences.every(n => n === differences[0])) throw new Error('Unable to find consistent difference');

  return differences[0];
}

function calculateMoreGens(gensToGo = 50000000000) {
  const {
    stableState: { gen, numPlants, totalPlantValue },
    lastPlantIndices,
  } = findStableGen();

  const change = getChangePerGen(lastPlantIndices);

  return totalPlantValue + (gensToGo - gen) * numPlants * change;
}

console.log('Answer after 50000000000 generations:', `\x1b[32m${calculateMoreGens()}\x1b[0m`); // 1100000000475
console.log(
  'Answer after 9999999999999999999 generations:',
  `\x1b[32m${calculateMoreGens(9999999999999999999)}\x1b[0m`,
); // Because why not
console.groupEnd('Day 12');

/* eslint-disable no-console */
/* eslint-disable max-len */

/**
 * --- Day 11: Chronal Charge ---
You watch the Elves and their sleigh fade into the distance as they head toward the North Pole.

Actually, you're the one fading. The falling sensation returns.

The low fuel warning light is illuminated on your wrist-mounted device. Tapping it once causes it to project a hologram of the situation: a 300x300 grid of fuel cells and their current power levels, some negative. You're not sure what negative power means in the context of time travel, but it can't be good.

Each fuel cell has a coordinate ranging from 1 to 300 in both the X (horizontal) and Y (vertical) direction. In X,Y notation, the top-left cell is 1,1, and the top-right cell is 300,1.

The interface lets you select any 3x3 square of fuel cells. To increase your chances of getting to your destination, you decide to choose the 3x3 square with the largest total power.

The power level in a given fuel cell can be found through the following process:

Find the fuel cell's rack ID, which is its X coordinate plus 10.
Begin with a power level of the rack ID times the Y coordinate.
Increase the power level by the value of the grid serial number (your puzzle input).
Set the power level to itself multiplied by the rack ID.
Keep only the hundreds digit of the power level (so 12345 becomes 3; numbers with no hundreds digit become 0).
Subtract 5 from the power level.
For example, to find the power level of the fuel cell at 3,5 in a grid with serial number 8:

The rack ID is 3 + 10 = 13.
The power level starts at 13 * 5 = 65.
Adding the serial number produces 65 + 8 = 73.
Multiplying by the rack ID produces 73 * 13 = 949.
The hundreds digit of 949 is 9.
Subtracting 5 produces 9 - 5 = 4.
So, the power level of this fuel cell is 4.

Here are some more example power levels:

Fuel cell at  122,79, grid serial number 57: power level -5.
Fuel cell at 217,196, grid serial number 39: power level  0.
Fuel cell at 101,153, grid serial number 71: power level  4.
Your goal is to find the 3x3 square which has the largest total power. The square must be entirely within the 300x300 grid. Identify this square using the X,Y coordinate of its top-left fuel cell. For example:

For grid serial number 18, the largest total 3x3 square has a top-left corner of 33,45 (with a total power of 29); these fuel cells appear in the middle of this 5x5 region:

-2  -4   4   4   4
-4   4   4   4  -5
 4   3   3   4  -4
 1   1   2   4  -3
-1   0   2  -5  -2
For grid serial number 42, the largest 3x3 square's top-left is 21,61 (with a total power of 30); they are in the middle of this region:

-3   4   2   2   2
-4   4   3   3   4
-5   3   3   4  -4
 4   3   3   4  -3
 3   3   3  -5  -1
What is the X,Y coordinate of the top-left fuel cell of the 3x3 square with the largest total power?

Your puzzle input is 7403.
 */
const serialNum = 7403;

function createGrid(serial) {
  const grid = {};
  for (let x = 1; x < 301; x++) {
    for (let y = 1; y < 301; y++) {
      const rackId = x + 10;
      let power = (rackId * y + serial) * rackId;
      power = power > 99 ? Number([...`${power}`].slice(-3, -2)[0]) - 5 : -5;
      grid[x] = { ...grid[x], [y]: power };
    }
  }
  return grid;
}

// modified to support part 2
function getMaxBlockValue(blockSize = 3, grid, serial = serialNum) {
  const cells = grid || createGrid(serial);
  // Format: ['x,y', value]
  let maxBlock = ['0,0', -Infinity];
  // Only check coords that can form a square of desired size within grid
  for (let x = 1; x < 302 - blockSize; x++) {
    for (let y = 1; y < 302 - blockSize; y++) {
      let total = 0;
      for (let i = 0; i < blockSize; i++) {
        for (let j = 0; j < blockSize; j++) {
          total += cells[x + i][y + j];
        }
      }
      if (total > maxBlock[1]) maxBlock = [`${x},${y}`, total];
    }
  }
  return maxBlock;
}

const p1 = getMaxBlockValue();
console.group('Day 11');
console.log(
  `Highest value 3x3 fuel cell block is \x1b[32m${p1[0]}\x1b[0m with a power level of ${p1[1]}.`,
); // 235,48

/**
 *Your puzzle answer was 235,48.

The first half of this puzzle is complete! It provides one gold star: *

--- Part Two ---
You discover a dial on the side of the device; it seems to let you select a square of any size, not just 3x3. Sizes from 1x1 to 300x300 are supported.

Realizing this, you now must find the square of any size with the largest total power. Identify this square by including its size as a third parameter after the top-left coordinate: a 9x9 square with a top-left corner of 3,5 is identified as 3,5,9.

For example:

For grid serial number 18, the largest total square (with a total power of 113) is 16x16 and has a top-left corner of 90,269, so its identifier is 90,269,16.
For grid serial number 42, the largest total square (with a total power of 119) is 12x12 and has a top-left corner of 232,251, so its identifier is 232,251,12.
What is the X,Y,size identifier of the square with the largest total power?
 */

function checkBlockSizes(serial = serialNum) {
  const grid = createGrid(serial);
  const maxBlocks = {};
  // Don't need to keep checking larger grids once largest block consistently returns negative
  let negatives = 0;
  for (let blockSize = 1; blockSize < 301; blockSize++) {
    maxBlocks[blockSize] = getMaxBlockValue(blockSize, grid);
    if (maxBlocks[blockSize][1] < 0) negatives += 1;
    if (negatives > 5) break;
  }
  return Object.entries(maxBlocks).sort((x, y) => y[1][1] - x[1][1])[0];
}

const p2 = checkBlockSizes();
console.log(
  `Ideal block size for maximum power: ${p2[0]}x${p2[0]}. 
Highest value block starts at ${p2[1][0]} and has ${p2[1][1]} units of power.
Answer format to enter for part two: \x1b[32m${p2[1][0]},${p2[0]}\x1b[0m`,
); // 285,113,11
console.groupEnd('Day 11');

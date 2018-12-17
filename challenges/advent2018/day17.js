/* eslint-disable no-console */
/* eslint-disable max-len */
const input = require('./input');

/**
 * --- Day 17: Reservoir Research ---
You arrive in the year 18. If it weren't for the coat you got in 1018, you would be very cold: the North Pole base hasn't even been constructed.

Rather, it hasn't been constructed yet. The Elves are making a little progress, but there's not a lot of liquid water in this climate, so they're getting very dehydrated. Maybe there's more underground?

You scan a two-dimensional vertical slice of the ground nearby and discover that it is mostly sand with veins of clay. The scan only provides data with a granularity of square meters, but it should be good enough to determine how much water is trapped there. In the scan, x represents the distance to the right, and y represents the distance down. There is also a spring of water near the surface at x=500, y=0. The scan identifies which square meters are clay (your puzzle input).

For example, suppose your scan shows the following veins of clay:

x=495, y=2..7
y=7, x=495..501
x=501, y=3..7
x=498, y=2..4
x=506, y=1..2
x=498, y=10..13
x=504, y=10..13
y=13, x=498..504
Rendering clay as #, sand as ., and the water spring as +, and with x increasing to the right and y increasing downward, this becomes:

   44444455555555
   99999900000000
   45678901234567
 0 ......+.......
 1 ............#.
 2 .#..#.......#.
 3 .#..#..#......
 4 .#..#..#......
 5 .#.....#......
 6 .#.....#......
 7 .#######......
 8 ..............
 9 ..............
10 ....#.....#...
11 ....#.....#...
12 ....#.....#...
13 ....#######...
The spring of water will produce water forever. Water can move through sand, but is blocked by clay. Water always moves down when possible, and spreads to the left and right otherwise, filling space that has clay on both sides and falling out otherwise.

For example, if five squares of water are created, they will flow downward until they reach the clay and settle there. Water that has come to rest is shown here as ~, while sand through which water has passed (but which is now dry again) is shown as |:

......+.......
......|.....#.
.#..#.|.....#.
.#..#.|#......
.#..#.|#......
.#....|#......
.#~~~~~#......
.#######......
..............
..............
....#.....#...
....#.....#...
....#.....#...
....#######...
Two squares of water can't occupy the same location. If another five squares of water are created, they will settle on the first five, filling the clay reservoir a little more:

......+.......
......|.....#.
.#..#.|.....#.
.#..#.|#......
.#..#.|#......
.#~~~~~#......
.#~~~~~#......
.#######......
..............
..............
....#.....#...
....#.....#...
....#.....#...
....#######...
Water pressure does not apply in this scenario. If another four squares of water are created, they will stay on the right side of the barrier, and no water will reach the left side:

......+.......
......|.....#.
.#..#.|.....#.
.#..#~~#......
.#..#~~#......
.#~~~~~#......
.#~~~~~#......
.#######......
..............
..............
....#.....#...
....#.....#...
....#.....#...
....#######...
At this point, the top reservoir overflows. While water can reach the tiles above the surface of the water, it cannot settle there, and so the next five squares of water settle like this:

......+.......
......|.....#.
.#..#||||...#.
.#..#~~#|.....
.#..#~~#|.....
.#~~~~~#|.....
.#~~~~~#|.....
.#######|.....
........|.....
........|.....
....#...|.#...
....#...|.#...
....#~~~~~#...
....#######...
Note especially the leftmost |: the new squares of water can reach this tile, but cannot stop there. Instead, eventually, they all fall to the right and settle in the reservoir below.

After 10 more squares of water, the bottom reservoir is also full:

......+.......
......|.....#.
.#..#||||...#.
.#..#~~#|.....
.#..#~~#|.....
.#~~~~~#|.....
.#~~~~~#|.....
.#######|.....
........|.....
........|.....
....#~~~~~#...
....#~~~~~#...
....#~~~~~#...
....#######...
Finally, while there is nowhere left for the water to settle, it can reach a few more tiles before overflowing beyond the bottom of the scanned data:

......+.......    (line not counted: above minimum y value)
......|.....#.
.#..#||||...#.
.#..#~~#|.....
.#..#~~#|.....
.#~~~~~#|.....
.#~~~~~#|.....
.#######|.....
........|.....
...|||||||||..
...|#~~~~~#|..
...|#~~~~~#|..
...|#~~~~~#|..
...|#######|..
...|.......|..    (line not counted: below maximum y value)
...|.......|..    (line not counted: below maximum y value)
...|.......|..    (line not counted: below maximum y value)
How many tiles can be reached by the water? To prevent counting forever, ignore tiles with a y coordinate smaller than the smallest y coordinate in your scan data or larger than the largest one. Any x coordinate is valid. In this example, the lowest y coordinate given is 1, and the highest is 13, causing the water spring (in row 0) and the water falling off the bottom of the render (in rows 14 through infinity) to be ignored.

So, in the example above, counting both water at rest (~) and other sand tiles the water can hypothetically reach (|), the total number of tiles the water can reach is 57.

How many tiles can the water reach within the range of y values in your scan?
 */

const clayVeins = input.day17.split('\n').map((line) => {
  const [p1, p2] = line.split(', ');
  const [start, stop] = p2
    .split('..')
    .map((part, i) => (i === 0 ? Number(part.slice(2)) : Number(part)));
  // create obj with array for x and y values - first value should create array with length of 1
  return {
    [p1[0]]: [Number(p1.slice(2))],
    [p2[0]]: Array(stop - start + 1)
      .fill()
      .map((_, i) => start + i),
  };
});

const getBoundaries = (veins = clayVeins) => veins.reduce(
  (tally, vein) => {
    if (vein.y[0] < tally.minY) [tally.minY] = vein.y;
    if (vein.y[vein.y.length - 1] > tally.maxY) tally.maxY = vein.y[vein.y.length - 1];
    if (vein.x[0] < tally.minX) [tally.minX] = vein.x;
    if (vein.x[vein.x.length - 1] > tally.maxX) tally.maxX = vein.x[vein.x.length - 1];
    return tally;
  },
  {
    minY: Infinity,
    maxY: -Infinity,
    minX: Infinity,
    maxX: -Infinity,
  },
);

function generateMap(boundaries = getBoundaries(), veins = clayVeins) {
  const {
    minY, maxY, minX, maxX,
  } = boundaries;
  // Offset by minX -- Add 1 to each end to allow water flow
  const emptyLine = '.'.repeat(maxX - minX + 2);
  // Format map[y][x]
  const map = [];
  // Fill map with sand lines, offset by minY to ignore top layer
  while (map.length <= maxY - minY) map.push([...emptyLine]);
  veins.forEach((vein) => {
    // At least one of x or y will be an array with a single item
    vein.y.forEach((y) => {
      vein.x.forEach((x) => {
        map[y - minY][x - minX + 1] = '#';
      });
    });
  });
  return map;
}

class Stream {
  constructor(x, y, map) {
    this.x = x;
    this.y = y;
    this.isFlowing = true;
    this.streamsToSpawn = [];
    if (map[y][x] !== '~') map[y][x] = '|';
  }

  checkMovement(x, y, map) {
    if (!map[y]) return false;
    if (map[y][x] === '.' || map[y][x] === '|') return true;
    return false;
  }

  // Flow downwards
  flow(map) {
    if (this.checkMovement(this.x, this.y + 1, map)) {
      this.y += 1;
      map[this.y][this.x] = '|';
      return this.flow(map);
    }
    if (map[this.y][this.x - 1] === '|' && this.checkMovement(this.x - 1, this.y + 1, map)) {
      this.x -= 1;
      return this.flow(map);
    }
    if (map[this.y][this.x + 1] === '|' && this.checkMovement(this.x + 1, this.y + 1, map)) {
      this.x += 1;
      return this.flow(map);
    }
    this.isFlowing = false;
    return this.spread(map);
  }

  // Spread sideways
  getSpreadableArea(map) {
    if (this.y > map.length - 2) return [];
    const spreadableX = [this.x];
    // Spread right and left while tile below is not sand and tile on next x is sand
    for (
      let x = this.x - 1;
      '#~'.includes(map[this.y + 1][x]) && '.|'.includes(map[this.y][x]);
      x--
    ) {
      spreadableX.push(x);
    }
    for (
      let x = this.x + 1;
      '#~'.includes(map[this.y + 1][x]) && '.|'.includes(map[this.y][x]);
      x++
    ) {
      spreadableX.push(x);
    }
    spreadableX.sort((a, b) => a - b);
    return spreadableX;
  }

  spread(map) {
    const xAround = this.getSpreadableArea(map);
    if (
      map[this.y][xAround[0] - 1] === '#'
      && map[this.y][xAround[xAround.length - 1] + 1] === '#'
    ) {
      xAround.forEach((x) => {
        map[this.y][x] = '~';
      });
    } else {
      xAround.forEach((x) => {
        map[this.y][x] = '|';
      });

      if (map[this.y][xAround[0] - 1] === '.') {
        this.streamsToSpawn.push({ x: xAround[0] - 1, y: this.y });
      }
      if (map[this.y][xAround[xAround.length - 1] + 1] === '.') {
        this.streamsToSpawn.push({ x: xAround[xAround.length - 1] + 1, y: this.y });
      }
    }
  }
}

function runningWater(map = generateMap(), streamX = 500, { minX } = getBoundaries()) {
  const newStreams = {};
  // Increase rounds until results stop changing
  for (let rounds = 0; rounds < 1000; rounds++) {
    if (Object.keys(newStreams).length > 0) {
      Object.keys(newStreams).forEach((key) => {
        newStreams[key].forEach((coordSet) => {
          if (map[coordSet.y][coordSet.x] === '~') return newStreams[key].splice(newStreams[key].indexOf(coordSet), 1);
          const stream = new Stream(coordSet.x, coordSet.y, map);
          stream.flow(map);
          if (stream.streamsToSpawn.length > 0) {
            newStreams[`${stream.x},${stream.x}`] = stream.streamsToSpawn;
          }
        });
      });
    } else {
      const stream = new Stream(streamX - minX + 1, 0, map);
      stream.flow(map);
      if (stream.streamsToSpawn.length > 0) {
        newStreams[`${stream.x},${stream.x}`] = stream.streamsToSpawn;
      }
    }
  }

  return map;
}

const results = runningWater();

const allWaterTiles = results.reduce((total, line) => {
  total += line.filter(char => '|~'.includes(char)).length;
  return total;
}, 0);
// results.forEach((line, i) => (i < 100 && i < 1000 ? console.log(line.join('')) : null));

console.group('Day 17');
console.log(`\x1b[32m${allWaterTiles}\x1b[0m tiles reached by water.`); // 31641

/**
 * Your puzzle answer was 31641.

The first half of this puzzle is complete! It provides one gold star: *

--- Part Two ---
After a very long time, the water spring will run dry. How much water will be retained?

In the example above, water that won't eventually drain out is shown as ~, a total of 29 tiles.

How many water tiles are left after the water spring stops producing water and all remaining water not at rest has drained?
 */

const stableWaterTiles = results.reduce((total, line) => {
  total += line.filter(char => char === '~').length;
  return total;
}, 0);

console.log(`\x1b[32m${stableWaterTiles}\x1b[0m stable water tiles.`); // 26321
console.groupEnd('Day 17');

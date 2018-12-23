/* eslint-disable no-console */
/* eslint-disable max-len */
const input = require('./input');

/**
 *--- Day 23: Experimental Emergency Teleportation ---
Using your torch to search the darkness of the rocky cavern, you finally locate the man's friend: a small reindeer.

You're not sure how it got so far in this cave. It looks sick - too sick to walk - and too heavy for you to carry all the way back. Sleighs won't be invented for another 1500 years, of course.

The only option is experimental emergency teleportation.

You hit the "experimental emergency teleportation" button on the device and push I accept the risk on no fewer than 18 different warning messages. Immediately, the device deploys hundreds of tiny nanobots which fly around the cavern, apparently assembling themselves into a very specific formation. The device lists the X,Y,Z position (pos) for each nanobot as well as its signal radius (r) on its tiny screen (your puzzle input).

Each nanobot can transmit signals to any integer coordinate which is a distance away from it less than or equal to its signal radius (as measured by Manhattan distance). Coordinates a distance away of less than or equal to a nanobot's signal radius are said to be in range of that nanobot.

Before you start the teleportation process, you should determine which nanobot is the strongest (that is, which has the largest signal radius) and then, for that nanobot, the total number of nanobots that are in range of it, including itself.

For example, given the following nanobots:

pos=<0,0,0>, r=4
pos=<1,0,0>, r=1
pos=<4,0,0>, r=3
pos=<0,2,0>, r=1
pos=<0,5,0>, r=3
pos=<0,0,3>, r=1
pos=<1,1,1>, r=1
pos=<1,1,2>, r=1
pos=<1,3,1>, r=1
The strongest nanobot is the first one (position 0,0,0) because its signal radius, 4 is the largest. Using that nanobot's location and signal radius, the following nanobots are in or out of range:

The nanobot at 0,0,0 is distance 0 away, and so it is in range.
The nanobot at 1,0,0 is distance 1 away, and so it is in range.
The nanobot at 4,0,0 is distance 4 away, and so it is in range.
The nanobot at 0,2,0 is distance 2 away, and so it is in range.
The nanobot at 0,5,0 is distance 5 away, and so it is not in range.
The nanobot at 0,0,3 is distance 3 away, and so it is in range.
The nanobot at 1,1,1 is distance 3 away, and so it is in range.
The nanobot at 1,1,2 is distance 4 away, and so it is in range.
The nanobot at 1,3,1 is distance 5 away, and so it is not in range.
In this example, in total, 7 nanobots are in range of the nanobot with the largest signal radius.

Find the nanobot with the largest signal radius. How many nanobots are in range of its signals?
 */

// todo current attempts take too long, calculate overlapping edges instead?

const bots = input.day23
  .split('\n')
  .map(line => line
    .slice(5)
    .split('>, r=')
    .map(str => str.split(',').map(num => Number(num))))
  .map(ar => ({
    x: ar[0][0],
    y: ar[0][1],
    z: ar[0][2],
    range: ar[1][0],
  }))
  .sort((a, b) => b.range - a.range);

function calculateDistance({ x: x1, y: y1, z: z1 }, { x: x2, y: y2, z: z2 }) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2) + Math.abs(z1 - z2);
}

function getBotsInRange(target = bots[0]) {
  return bots.filter(bot => calculateDistance(target, bot) <= target.range).length;
}

console.group('Day 23');

console.log(
  `\x1b[32m${getBotsInRange()}\x1b[0m nanobots are in range of the bot with the highest range.`,
); // 730

/**
 * --- Part Two ---
Now, you just need to figure out where to position yourself so that you're actually teleported when the nanobots activate.

To increase the probability of success, you need to find the coordinate which puts you in range of the largest number of nanobots. If there are multiple, choose one closest to your position (0,0,0, measured by manhattan distance).

For example, given the following nanobot formation:

pos=<10,12,12>, r=2
pos=<12,14,12>, r=2
pos=<16,12,12>, r=4
pos=<14,14,14>, r=6
pos=<50,50,50>, r=200
pos=<10,10,10>, r=5
Many coordinates are in range of some of the nanobots in this formation. However, only the coordinate 12,12,12 is in range of the most nanobots: it is in range of the first five, but is not in range of the nanobot at 10,10,10. (All other coordinates are in range of fewer than five nanobots.) This coordinate's distance from 0,0,0 is 36.

Find the coordinates that are in range of the largest number of nanobots. What is the shortest manhattan distance between any of those points and 0,0,0?
 */

// todo current attempts taking too long. calculate overlaps from edges instead?

function getBoundaries(botList = bots) {
  return botList.reduce(
    (tally, bot) => {
      const { x, y, z } = bot;
      if (x < tally.minX) tally.minX = x;
      if (x > tally.maxX) tally.maxX = x;
      if (y < tally.minY) tally.minY = y;
      if (y > tally.maxY) tally.maxY = y;
      if (z < tally.minZ) tally.minZ = z;
      if (z > tally.maxZ) tally.maxZ = z;
      return tally;
    },
    {
      minX: Infinity,
      maxX: -Infinity,
      minY: Infinity,
      maxY: -Infinity,
      minZ: Infinity,
      maxZ: -Infinity,
    },
  );
}

function getBotsInRangeOfLocation(location, botList = bots) {
  return botList.filter(bot => calculateDistance(location, bot) <= bot.range).length;
}

console.log(getBotsInRangeOfLocation({ x: 1000000, y: -1000000, z: -1000000 }));

function getCoordsInBotsRange(bot) {
  const {
    x, y, z, range,
  } = bot;
  return {
    minX: x - range,
    maxX: x + range,
    minY: y - range,
    maxY: y + range,
    minZ: z - range,
    maxZ: z + range,
  };
}

const rangeMap = {
  nodes: {},
  add(x, y, z) {
    if (!this.nodes[x]) this.nodes[x] = {};
    if (!this.nodes[x][y]) this.nodes[x][y] = {};
    if (!this.nodes[x][y][z]) this.nodes[x][y][z] = 0;
    this.nodes[x][y][z] += 1;
  },
  get(x, y, z) {
    if (!this.nodes[x] || !this.nodes[x][y] || !this.nodes[x][y][z]) return 0;
    return this.nodes[x][y][z];
  },
};

function fillRangeMap() {
  shrinkedBots.forEach((bot) => {
    const {
      minX, maxX, minY, maxY, minZ, maxZ,
    } = getCoordsInBotsRange(bot);
    for (let x = minX; x < maxX; x++) {
      for (let y = minY; y < maxY; y++) {
        for (let z = minZ; z < maxZ; z++) {
          rangeMap.add(x, y, z);
          // if (z % 10 === 0) console.log(rangeMap.get(x, y, z));
        }
      }
    }
  });
}

// ? Perhaps try with a smaller version, expand and start from previously found best location until we get full size answer?

const shrinkedBots = bots.map(bot => ({
  y: Math.floor(bot.y / 1000000),
  z: Math.floor(bot.z / 1000000),
  x: Math.floor(bot.x / 1000000),
  range: Math.floor(bot.range / 1000000),
}));
// console.log(fillRangeMap());
function generateMap(boundaries = getBoundaries(shrinkedBots)) {
  const {
    minX, maxX, minY, maxY, minZ, maxZ,
  } = boundaries;
  const map = [];
  for (let x = 1; x < maxX; x++) {
    for (let y = 0; y < maxY; y++) {
      for (let z = 0; z < maxZ; z++) {
        const botsInRange = getBotsInRangeOfLocation({ x, y, z }, shrinkedBots);
        // console.log(botsInRange);
        map.push({
          x,
          y,
          z,
          botsInRange,
        });
      }
    }
  }
  return map.sort((a, b) => b.botsInRange - a.botsInRange);
}

// console.log(getBoundaries(shrinkedBots));
// console.log(generateMap());

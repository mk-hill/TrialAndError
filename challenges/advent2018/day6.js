/* eslint-disable no-console */
/* eslint-disable max-len */
const input = require('./input');

/**
 * --- Day 6: Chronal Coordinates ---
The device on your wrist beeps several times, and once again you feel like you're falling.

"Situation critical," the device announces. "Destination indeterminate. Chronal interference detected. Please specify new target coordinates."

The device then produces a list of coordinates (your puzzle input). Are they places it thinks are safe or dangerous? It recommends you check manual page 729. The Elves did not give you a manual.

If they're dangerous, maybe you can minimize the danger by finding the coordinate that gives the largest distance from the other points.

Using only the Manhattan distance, determine the area around each coordinate by counting the number of integer X,Y locations that are closest to that coordinate (and aren't tied in distance to any other coordinate).

Your goal is to find the size of the largest area that isn't infinite. For example, consider the following list of coordinates:

1, 1
1, 6
8, 3
3, 4
5, 5
8, 9
If we name these coordinates A through F, we can draw them on a grid, putting 0,0 at the top left:

..........
.A........
..........
........C.
...D......
.....E....
.B........
..........
..........
........F.
This view is partial - the actual grid extends infinitely in all directions. Using the Manhattan distance, each location's closest coordinate can be determined, shown here in lowercase:

aaaaa.cccc
aAaaa.cccc
aaaddecccc
aadddeccCc
..dDdeeccc
bb.deEeecc
bBb.eeee..
bbb.eeefff
bbb.eeffff
bbb.ffffFf
Locations shown as . are equally far from two or more coordinates, and so they don't count as being closest to any.

In this example, the areas of coordinates A, B, C, and F are infinite - while not shown here, their areas extend forever outside the visible grid. However, the areas of coordinates D and E are finite: D is closest to 9 locations, and E is closest to 17 (both including the coordinate's location itself). Therefore, in this example, the size of the largest area is 17.

What is the size of the largest area that isn't infinite?
 */

const coordinates = input.day6
  .split('\n')
  .map(pointCoords => pointCoords.split(', ').map(str => Number(str)));

function calculateDistance([x1, y1], [x2, y2]) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

// Get closest of coords in input to given location
// return null if tied
function getSingleClosestPoint(target, points) {
  const distances = points
    .map(coords => ({ coords, dist: calculateDistance(target, coords) }))
    .sort((x, y) => x.dist - y.dist);

  return distances[0].dist !== distances[1].dist ? distances[0].coords : null;
}

// Get surrounding areas for each location
function getAreas(points, searchGrid) {
  const [minX, minY, maxX, maxY] = searchGrid;
  const areas = {};

  for (let x = minX; x < maxX; x++) {
    for (let y = minY; y < maxY; y++) {
      const closest = getSingleClosestPoint([x, y], points);
      if (closest) areas[closest] = areas[closest] + 1 || 1;
    }
  }
  return areas;
}

function getMaxXAndY(points) {
  return points.reduce(
    (maxes, xAndY) => {
      xAndY.forEach((n, i) => {
        if (n > maxes[i]) maxes[i] = n;
      });
      return maxes;
    },
    [0, 0],
  );
}

// Finite areas shouldn't change past 0,0 and furthest out x,y
function getLargestFiniteArea(points) {
  const [maxX, maxY] = getMaxXAndY(points);

  const areas1 = getAreas(points, [0, 0, maxX, maxY]);
  const areas2 = getAreas(points, [-10, -10, maxX + 10, maxY + 10]);

  return points
    .filter(coords => areas1[coords] === areas2[coords])
    .map(coords => ({ coords, area: areas1[coords] }))
    .sort((x, y) => y.area - x.area)[0];
}

console.group('Day 6');
console.log('Largest finite area:', getLargestFiniteArea(coordinates)); // 3687

/**
 *Your puzzle answer was 3687.

The first half of this puzzle is complete! It provides one gold star: *

--- Part Two ---
On the other hand, if the coordinates are safe, maybe the best you can do is try to find a region near as many coordinates as possible.

For example, suppose you want the sum of the Manhattan distance to all of the coordinates to be less than 32. For each location, add up the distances to all of the given coordinates; if the total of those distances is less than 32, that location is within the desired region. Using the same coordinates as above, the resulting region looks like this:

..........
.A........
..........
...###..C.
..#D###...
..###E#...
.B.###....
..........
..........
........F.
In particular, consider the highlighted location 4,3 located at the top middle of the region. Its calculation is as follows, where abs() is the absolute value function:

Distance to coordinate A: abs(4-1) + abs(3-1) =  5
Distance to coordinate B: abs(4-1) + abs(3-6) =  6
Distance to coordinate C: abs(4-8) + abs(3-3) =  4
Distance to coordinate D: abs(4-3) + abs(3-4) =  2
Distance to coordinate E: abs(4-5) + abs(3-5) =  3
Distance to coordinate F: abs(4-8) + abs(3-9) = 10
Total distance: 5 + 6 + 4 + 2 + 3 + 10 = 30
Because the total distance to all coordinates (30) is less than 32, the location is within the region.

This region, which also includes coordinates D and E, has a total size of 16.

Your actual region will need to be much larger than this example, though, instead including all locations with a total distance of less than 10000.

What is the size of the region containing all locations which have a total distance to all given coordinates of less than 10000?
 */

// Calculate size of the area within given distance to every coordinate
function getAreaWithinDistance(points, distance) {
  const [maxX, maxY] = getMaxXAndY(points);
  let totalArea = 0;

  for (let x = 0; x < maxX; x++) {
    for (let y = 0; y < maxY; y++) {
      let totalDist = 0;
      // every instead of forEach to break out of loop early if it goes above specified distance
      points.every((point) => {
        totalDist += calculateDistance([x, y], point);
        return totalDist < distance;
      });
      if (totalDist < distance) totalArea += 1;
    }
  }

  return totalArea;
}

console.log(
  'Size of area within given distance to all coordinates:',
  getAreaWithinDistance(coordinates, 10000),
); // 40134
console.groupEnd('Day 6');

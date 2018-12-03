/* eslint-disable no-console */
/* eslint-disable max-len */
const input = require('./input');

/**
 * --- Day 3: No Matter How You Slice It ---
The Elves managed to locate the chimney-squeeze prototype fabric for Santa's suit (thanks to someone who helpfully wrote its box IDs on the wall of the warehouse in the middle of the night). Unfortunately, anomalies are still affecting them - nobody can even agree on how to cut the fabric.

The whole piece of fabric they're working on is a very large square - at least 1000 inches on each side.

Each Elf has made a claim about which area of fabric would be ideal for Santa's suit. All claims have an ID and consist of a single rectangle with edges parallel to the edges of the fabric. Each claim's rectangle is defined as follows:

The number of inches between the left edge of the fabric and the left edge of the rectangle.
The number of inches between the top edge of the fabric and the top edge of the rectangle.
The width of the rectangle in inches.
The height of the rectangle in inches.
A claim like #123 @ 3,2: 5x4 means that claim ID 123 specifies a rectangle 3 inches from the left edge, 2 inches from the top edge, 5 inches wide, and 4 inches tall. Visually, it claims the square inches of fabric represented by # (and ignores the square inches of fabric represented by .) in the diagram below:

...........
...........
...#####...
...#####...
...#####...
...#####...
...........
...........
...........
The problem is that many of the claims overlap, causing two or more claims to cover part of the same areas. For example, consider the following claims:

#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2
Visually, these claim the following areas:

........
...2222.
...2222.
.11XX22.
.11XX22.
.111133.
.111133.
........
The four square inches marked with X are claimed by both 1 and 2. (Claim 3, while adjacent to the others, does not overlap either of them.)

If the Elves all proceed with their own plans, none of them will have enough fabric. How many square inches of fabric are within two or more claims?
 */

const claimsArr = input.day3.split('\n');

function formatClaim(claim) {
  const pound = claim.indexOf('#');
  const at = claim.indexOf('@');
  const comma = claim.indexOf(',');
  const colon = claim.indexOf(':');
  const x = claim.indexOf('x');
  return {
    id: claim.slice(pound + 1, at).trim(),
    left: parseInt(claim.slice(at + 1, comma).trim(), 10),
    top: parseInt(claim.slice(comma + 1, colon).trim(), 10),
    width: parseInt(claim.slice(colon + 1, x).trim(), 10),
    height: parseInt(claim.slice(x + 1).trim(), 10),
  };
}

function calculateGrid(claims) {
  const grid = {};
  claims.forEach((claimString) => {
    const {
      id, left, top, width, height,
    } = formatClaim(claimString);

    for (let col = left; col < left + width; col++) {
      for (let row = top; row < top + height; row++) {
        grid[`${col}x${row}`] = grid[`${col}x${row}`] ? grid[`${col}x${row}`].concat(id) : [id];
      }
    }
  });
  return grid;
}

function getTotalOverlap(claims) {
  const grid = calculateGrid(claims);
  return Object.keys(grid).reduce((total, key) => {
    if (grid[key].length > 1) {
      total += 1;
    }
    return total;
  }, 0);
}

console.group('Day 3');
console.log('Total overlap: ', getTotalOverlap(claimsArr)); // 124850

/**
 * Your puzzle answer was 124850.

The first half of this puzzle is complete! It provides one gold star: *

--- Part Two ---
Amidst the chaos, you notice that exactly one claim doesn't overlap by even a single square inch of fabric with any other claim. If you can somehow draw attention to it, maybe the Elves will be able to make Santa's suit after all!

For example, in the claims above, only claim 3 is intact after all claims are made.

What is the ID of the only claim that doesn't overlap?
 */

function findClaimWithoutOverlap(claims) {
  const grid = calculateGrid(claims);
  const gridBlocks = Object.keys(grid);
  const claimIds = claims.map(claim => formatClaim(claim).id);
  const overlappingClaims = {};

  gridBlocks.forEach((block) => {
    if (grid[block].length > 1) {
      grid[block].forEach((id) => {
        overlappingClaims[id] = true;
      });
    }
  });
  const result = claimIds.filter(id => !overlappingClaims[id]);

  return result.length === 1 ? result[0] : `Error: more than one result found. ${result}`;
}

console.log('Claim without overlap: ', findClaimWithoutOverlap(claimsArr)); // 1097
console.groupEnd('Day 3');

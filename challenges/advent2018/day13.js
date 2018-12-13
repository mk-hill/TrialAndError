/* eslint-disable no-console */
/* eslint-disable max-len */
const fs = require('fs');

/**
 * --- Day 13: Mine Cart Madness ---
A crop of this size requires significant logistics to transport produce, soil, fertilizer, and so on. The Elves are very busy pushing things around in carts on some kind of rudimentary system of tracks they've come up with.

Seeing as how cart-and-track systems don't appear in recorded history for another 1000 years, the Elves seem to be making this up as they go along. They haven't even figured out how to avoid collisions yet.

You map out the tracks (your puzzle input) and see where you can help.

Tracks consist of straight paths (| and -), curves (/ and \), and intersections (+). Curves connect exactly two perpendicular pieces of track; for example, this is a closed loop:

/----\
|    |
|    |
\----/
Intersections occur when two perpendicular paths cross. At an intersection, a cart is capable of turning left, turning right, or continuing straight. Here are two loops connected by two intersections:

/-----\
|     |
|  /--+--\
|  |  |  |
\--+--/  |
   |     |
   \-----/
Several carts are also on the tracks. Carts always face either up (^), down (v), left (<), or right (>). (On your initial map, the track under each cart is a straight path matching the direction the cart is facing.)

Each time a cart has the option to turn (by arriving at any intersection), it turns left the first time, goes straight the second time, turns right the third time, and then repeats those directions starting again with left the fourth time, straight the fifth time, and so on. This process is independent of the particular intersection at which the cart has arrived - that is, the cart has no per-intersection memory.

Carts all move at the same speed; they take turns moving a single step at a time. They do this based on their current location: carts on the top row move first (acting from left to right), then carts on the second row move (again from left to right), then carts on the third row, and so on. Once each cart has moved one step, the process repeats; each of these loops is called a tick.

For example, suppose there are two carts on a straight track:

|  |  |  |  |
v  |  |  |  |
|  v  v  |  |
|  |  |  v  X
|  |  ^  ^  |
^  ^  |  |  |
|  |  |  |  |
First, the top cart moves. It is facing down (v), so it moves down one square. Second, the bottom cart moves. It is facing up (^), so it moves up one square. Because all carts have moved, the first tick ends. Then, the process repeats, starting with the first cart. The first cart moves down, then the second cart moves up - right into the first cart, colliding with it! (The location of the crash is marked with an X.) This ends the second and last tick.

Here is a longer example:

/->-\
|   |  /----\
| /-+--+-\  |
| | |  | v  |
\-+-/  \-+--/
  \------/

/-->\
|   |  /----\
| /-+--+-\  |
| | |  | |  |
\-+-/  \->--/
  \------/

/---v
|   |  /----\
| /-+--+-\  |
| | |  | |  |
\-+-/  \-+>-/
  \------/

/---\
|   v  /----\
| /-+--+-\  |
| | |  | |  |
\-+-/  \-+->/
  \------/

/---\
|   |  /----\
| /->--+-\  |
| | |  | |  |
\-+-/  \-+--^
  \------/

/---\
|   |  /----\
| /-+>-+-\  |
| | |  | |  ^
\-+-/  \-+--/
  \------/

/---\
|   |  /----\
| /-+->+-\  ^
| | |  | |  |
\-+-/  \-+--/
  \------/

/---\
|   |  /----<
| /-+-->-\  |
| | |  | |  |
\-+-/  \-+--/
  \------/

/---\
|   |  /---<\
| /-+--+>\  |
| | |  | |  |
\-+-/  \-+--/
  \------/

/---\
|   |  /--<-\
| /-+--+-v  |
| | |  | |  |
\-+-/  \-+--/
  \------/

/---\
|   |  /-<--\
| /-+--+-\  |
| | |  | v  |
\-+-/  \-+--/
  \------/

/---\
|   |  /<---\
| /-+--+-\  |
| | |  | |  |
\-+-/  \-<--/
  \------/

/---\
|   |  v----\
| /-+--+-\  |
| | |  | |  |
\-+-/  \<+--/
  \------/

/---\
|   |  /----\
| /-+--v-\  |
| | |  | |  |
\-+-/  ^-+--/
  \------/

/---\
|   |  /----\
| /-+--+-\  |
| | |  X |  |
\-+-/  \-+--/
  \------/
After following their respective paths for a while, the carts eventually crash. To help prevent crashes, you'd like to know the location of the first crash. Locations are given in X,Y coordinates, where the furthest left column is X=0 and the furthest top row is Y=0:

           111
 0123456789012
0/---\
1|   |  /----\
2| /-+--+-\  |
3| | |  X |  |
4\-+-/  \-+--/
5  \------/
In this example, the location of the first crash is 7,3.
 */

const mapString = fs.readFileSync('./txt/day13.txt', 'utf8', (err, data) => {
  if (err) throw err;
  return data;
});

// Format: gridLines[y][x];
const gridLines = mapString.split('\n');

const cartTypes = {
  '>': {
    char: '>',
    left: '^',
    right: 'v',
    movement: { x: 1, y: 0 },
  },
  '<': {
    char: '<',
    left: 'v',
    right: '^',
    movement: { x: -1, y: 0 },
  },
  '^': {
    char: '^',
    left: '<',
    right: '>',
    movement: { x: 0, y: -1 },
  },
  v: {
    char: 'v',
    left: '>',
    right: '<',
    movement: { x: 0, y: 1 },
  },
  X: {
    char: 'X',
    left: 'X',
    right: 'X',
    movement: { x: 0, y: 0 },
  },
};

Object.keys(cartTypes).forEach((char) => {
  cartTypes[char].left = cartTypes[cartTypes[char].left];
  cartTypes[char].right = cartTypes[cartTypes[char].right];
});

const turns = {
  left: { val: 'left' },
  straight: { val: null },
  right: { val: 'right' },
};

turns.left.next = turns.straight;
turns.straight.next = turns.right;
turns.right.next = turns.left;

const corners = {
  '/': {
    '>': 'left',
    '<': 'left',
    '^': 'right',
    v: 'right',
  },
  '\\': {
    '>': 'right',
    '<': 'right',
    '^': 'left',
    v: 'left',
  },
};

class Cart {
  constructor(char, x, y) {
    this.type = cartTypes[char];
    this.x = x;
    this.y = y;
    this.nextTurn = turns.left;
    this.tick = 0;
    this.onTrackChar = char === '>' || char === '<' ? '-' : '|';
    this.hasCrashed = false;
  }

  handleIntersection() {
    if (this.nextTurn.val) {
      this.type = this.type[this.nextTurn.val];
    }
    this.nextTurn = this.nextTurn.next;
  }

  turnOnCorner(corner) {
    this.type = this.type[corners[corner][this.type.char]];
  }

  collide(char, print = true) {
    if (char === 'X') this.tick += 1;
    if (print) {
      console.log(
        `${this.type.char} collided with ${char} at ${this.x},${this.y} on tick ${this.tick}`,
      );
    }
    this.type = cartTypes.X;
    this.hasCrashed = true;
  }

  getNextX() {
    return this.x + this.type.movement.x;
  }

  getNextY() {
    return this.y + this.type.movement.y;
  }

  moveTo(track) {
    if (track === ' ') throw new Error('Trying to move off track');
    this.tick += 1;
    this.x = this.getNextX();
    this.y = this.getNextY();
    this.onTrackChar = track;
    if (track === '+') this.handleIntersection();
    if (track in corners) this.turnOnCorner(track);
    if (track in cartTypes) this.collide(track);
  }
}

function createCarts(lines = gridLines) {
  return lines
    .map((lineStr, y) => [...lineStr]
      .map((char, x) => {
        if (char in cartTypes) return new Cart(char, x, y);
        return null;
      })
      .filter(x => x !== null))
    .filter(ar => ar.length > 0)
    .reduce((flat, ar) => [...flat, ...ar], []);
}

// Modified for part 2
function moveCarts(linesInput = gridLines) {
  const lines = [...linesInput.map(lineStr => [...lineStr])];
  const carts = createCarts();
  let firstCollision;
  let crashedCarts = 0;
  while (crashedCarts < carts.length - 1) {
    // Keep carts sorted so they move in the correct order
    carts.sort((a, b) => a.y * 9001 - b.y * 9001 + (a.x - b.x)); // Row first, x matters only when y is equal
    carts.forEach((cart) => {
      if (cart.type !== cartTypes.X) {
        const targetChar = lines[cart.getNextY()][cart.getNextX()];
        lines[cart.y][cart.x] = cart.onTrackChar;
        cart.moveTo(targetChar);
        lines[cart.y][cart.x] = cart.type.char;
        if (cart.hasCrashed) {
          // Current collision caused by the carts with same x and y as the last cart that moved
          const colliders = carts.filter(
            cartToCheck => cartToCheck.x === cart.x && cartToCheck.y === cart.y,
          );
          colliders.forEach((crashingCart) => {
            if (!crashingCart.hasCrashed) crashingCart.collide('X', false);
          });
          if (!crashedCarts) firstCollision = colliders;
          crashedCarts += colliders.length;
          // Clear collision by reverting coords to track char underneath both carts
          lines[cart.y][cart.x] = colliders.reduce((char, crashingCart) => {
            if ('-+|/\\'.includes(crashingCart.onTrackChar)) char = crashingCart.onTrackChar;
            return char;
          }, '');
          // Make sure I didn't mess up
          if (!lines[cart.y][cart.x]) throw new Error('Could not find track char to replace crash with');
        }
      }
    });
  }

  return {
    firstCollision,
    soleSurvivor: carts.filter(cart => !cart.hasCrashed)[0],
  };
}

console.group('Day 13');
const answers = moveCarts();
console.log(
  `First collision occurred at \x1b[32m${answers.firstCollision[0].x},${
    answers.firstCollision[0].y
  }\x1b[0m on tick ${answers.firstCollision[0].tick}.`,
); // 41,22

/**
 * Your puzzle answer was 41,22.

--- Part Two ---
There isn't much you can do to prevent crashes in this ridiculous system. However, by predicting the crashes, the Elves know where to be in advance and instantly remove the two crashing carts the moment any crash occurs.

They can proceed like this for a while, but eventually, they're going to run out of carts. It could be useful to figure out where the last cart that hasn't crashed will end up.

For example:

/>-<\
|   |
| /<+-\
| | | v
\>+</ |
  |   ^
  \<->/

/---\
|   |
| v-+-\
| | | |
\-+-/ |
  |   |
  ^---^

/---\
|   |
| /-+-\
| v | |
\-+-/ |
  ^   ^
  \---/

/---\
|   |
| /-+-\
| | | |
\-+-/ ^
  |   |
  \---/
After four very expensive crashes, a tick ends with only one cart remaining; its final location is 6,4.

What is the location of the last cart at the end of the first tick where it is the only cart left?
 */

console.log(
  `The single remaining cart was located at \x1b[32m${answers.soleSurvivor.x},${
    answers.soleSurvivor.y
  }\x1b[0m when the final collision occurred on tick ${answers.soleSurvivor.tick}.`,
); // 84,90

/* eslint-disable max-len */

//
// ─── MODIFIED SOLUTION FOR VISUALIZER ───────────────────────────────────────────
//

let gridLines; // Moved out of moveCarts for visualizer
let carts; // Moved out of moveCarts for visualizer

// Keep track of what each character becomes when it turns, and how it moves per tick
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

// Point turn results to appropriate cartTypes rather than just the character to avoid constant lookups
Object.keys(cartTypes).forEach((char) => {
  cartTypes[char].left = cartTypes[cartTypes[char].left];
  cartTypes[char].right = cartTypes[cartTypes[char].right];
});

// Circular links to keep track of each cart's next turn when they arrive at an intersection
const turns = {
  left: { val: 'left' },
  straight: { val: null },
  right: { val: 'right' },
};
turns.left.next = turns.straight;
turns.straight.next = turns.right;
turns.right.next = turns.left;

// Which direction each cart type turns to when arriving at a corner
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
    // this.nextTurn.val is null if it's pointing to turns.straight
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
      addLog(`${this.type.char} collided with ${char} at ${this.x},${this.y} on tick ${this.tick}`);
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
    if (track === ' ') throw new Error('Trying to move off track'); // Just in case the calculations below go wrong somehow
    this.tick += 1;
    this.x = this.getNextX();
    this.y = this.getNextY();
    this.onTrackChar = track;
    if (track === '+') this.handleIntersection();
    if (track in corners) this.turnOnCorner(track);
    if (track in cartTypes) this.collide(track);
  }
}

// Returning array of Cart objects ordered by their y and x
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

let crashedCarts = 0; // Moved out of moveCarts for visualizer

// Modified for part 2
function moveCarts(linesInput = gridLines, ticksToMove = 1) {
  const lines = [...linesInput.map(lineStr => [...lineStr])];

  let ticks = 0;
  while (ticks < ticksToMove) {
    // Keep carts sorted so they move in the correct order
    carts.sort((a, b) => a.y * 9001 - b.y * 9001 + (a.x - b.x)); // Row first, x matters only when y is equal
    carts.forEach((cart) => {
      // Remove crashed carts from carts array instead of this if number of carts increase to the point where it causes performance issues
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
          // Correct the status of the cart that doesn't know it has been crashed into
          colliders.forEach((crashingCart) => {
            if (!crashingCart.hasCrashed) crashingCart.collide('X', false);
          });
          crashedCarts += colliders.length;
          addLog(
            carts.length - crashedCarts > 1
              ? `${carts.length - crashedCarts} carts left.`
              : 'Last cart!',
          );
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
    ticks += 1;
  }
  gridLines = lines;
  return lines;
}

//
// ─── VISUALIZER DOM STUFF ───────────────────────────────────────────────────────
//

const inputField = document.getElementById('map-input');
const submitButton = document.getElementById('input-submit');
const mapContainer = document.getElementById('map');
const tickSetter = document.getElementById('tick-setting');
const log = document.getElementById('log');
const logList = document.getElementById('log-list');
const tickDisplay = document.getElementById('current-tick');
const autoToggle = document.getElementById('auto-button');
const autoDisplay = document.getElementById('auto-display');
const leftHud = document.getElementById('left-hud');
const instructions = document.querySelector('h3');
const autoSpeedSetter = document.getElementById('auto-speed');

let visualized = false;
let ticksToGo = 1;
let currentTick = 0;
let auto = false;
let autoSpeed = 250;

function visualize(lines = gridLines) {
  mapContainer.innerHTML = '';
  lines.forEach((line) => {
    const highlightedLine = [...line]
      .map(char => (char in cartTypes ? `<span class="cart">${char}</span>` : char))
      .join('');
    const p = document.createElement('p');
    p.innerHTML = highlightedLine;
    mapContainer.appendChild(p);
  });
  instructions.textContent = auto
    ? 'Key press disabled, ticks set to 1. Select auto speed below.'
    : 'Press right arrow to advance ticks. Set number of ticks to advance per key press below.';
  tickDisplay.textContent = `Current Tick: ${currentTick}`;
  autoDisplay.textContent = auto ? 'Auto mode enabled.' : 'Auto mode disabled.';
}

function addLog(str) {
  const newLi = document.createElement('li');
  newLi.textContent = str;
  logList.appendChild(newLi);
}
// ${auto ? 'Auto mode enabled' : 'Press right arrow to advance ticks.'}
submitButton.addEventListener('click', messyInit);

function advanceTicks(ticksPerCalc = ticksToGo) {
  gridLines = moveCarts(gridLines, ticksPerCalc);
  currentTick += ticksPerCalc;
  visualize();
}

document.body.onkeydown = (e) => {
  if (e.keyCode === 39 && visualized && !auto) advanceTicks();
};

tickSetter.onchange = (e) => {
  ticksToGo = Math.abs(Number(e.target.value));
  if (Math.abs(Number(e.target.value)) !== Number(e.target.value)) instructions.textContent = 'Absolute values are used for negative numbers. Please enter a positive number.';
};

let autoInterval;

autoSpeedSetter.onchange = (e) => {
  autoSpeed = Number(e.target.value);
  clearInterval(autoInterval);
  autoInterval = setInterval(() => advanceTicks(1), autoSpeed);
};

autoToggle.addEventListener('click', () => {
  auto = !auto;
  if (auto) {
    tickSetter.classList.add('disabled');
    autoSpeedSetter.classList.remove('disabled');
    autoInterval = setInterval(() => advanceTicks(1), autoSpeed);
  } else {
    clearInterval(autoInterval);
    tickSetter.classList.remove('disabled');
    autoSpeedSetter.classList.add('disabled');
    visualize();
  }
});

function messyInit() {
  const input = inputField.value;
  gridLines = input.split('\n');
  carts = createCarts();
  inputField.classList.add('disabled');
  submitButton.classList.add('disabled');
  log.style.opacity = '1';
  leftHud.style.opacity = '1';
  instructions.textContent = 'Press right arrow to advance ticks. Set number of ticks to advance per key press below.';
  setTimeout(() => document.body.removeChild(inputField), 100);
  setTimeout(() => document.body.removeChild(submitButton), 100);
  setTimeout(() => tickSetter.classList.remove('disabled'), 200);
  setTimeout(() => {
    autoToggle.style.display = 'inline-block';
    autoDisplay.style.display = 'inline-block';
  }, 200);
  setTimeout(() => {
    autoToggle.style.opacity = '1';
    autoDisplay.style.opacity = '1';
  }, 400);
  setTimeout(visualize, 200);
  setTimeout(() => {
    visualized = true;
  }, 200);
}

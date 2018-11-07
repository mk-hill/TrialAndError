const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

/**
 * Returns random ms value between min and max
 * @param {number} min unit ms
 * @param {number} max unit ms
 */
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(list) {
  const index = Math.floor(Math.random() * list.length);
  const hole = list[index];
  if (hole === lastHole) {
    // Prevent consecutive same hole
    return randomHole(list);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(250, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => {
    timeUp = true;
  }, 15000);
}

function bonk(e) {
  // Check for isTrusted to counter clicks user simulates in js
  if (!e.isTrusted) return;
  // Prevent multiple clicks before mole goes down
  if (!this.parentNode.classList.contains('up')) return;
  score++;
  // up class on parent hole not mole
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));

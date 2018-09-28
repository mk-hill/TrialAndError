/*
GAME FUNCTIONS:
- Generate random min and max
- Ensure player guess is between min and max
- Limit number of player guesses
- Notify player of remaining guesses
- Notify player what the correct answer was on loss
- Allow multiple rounds
*/

/* eslint-disable */

// Game values
let min = 1,
    max = 10,
    winningNum = 2,
    guessesLeft = 3;

// DOM Elements
const gameEl = document.querySelector('#game'),
      minNumEl = document.querySelector('.min-num'),
      maxNumEl = document.querySelector('.max-num'),
      guessBtnEl = document.querySelector('#guess-btn'),
      guessInputEl = document.querySelector('#guess-input'),
      messageEl = document.querySelector('.message');

/* eslint-enable */

// Assign DOM min and max values
minNumEl.textContent = min;
maxNumEl.textContent = max;

// Insert message into <p>
const setMessage = (msg, color) => {
  messageEl.style.color = color;
  messageEl.textContent = msg;
};

// Listen for guess
guessBtnEl.addEventListener('click', () => {
  const guess = parseInt(guessInputEl.value, 10);

  // Validate input
  if (!guess || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
  }

  // Check win case
  if (guess === winningNum) {
    guessInputEl.disabled = true;
    guessInputEl.style.borderColor = 'green';
    setMessage(`${winningNum} is correct, you win!`, 'green');
  }
});

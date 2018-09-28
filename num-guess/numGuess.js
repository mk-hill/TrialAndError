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

// Use classes for stuff like this? ^
/* eslint-enable */

// Assign DOM min and max values
minNumEl.textContent = min;
maxNumEl.textContent = max;

// Insert message into <p>
const setMessage = (msg, color) => {
  messageEl.style.color = color;
  messageEl.textContent = msg;
};

// Take boolean for win state
const gameOver = (won, msg) => { 
  const color = won ? 'green' : 'red';
  guessInputEl.disabled = true;
  guessInputEl.style.borderColor = color;
  setMessage(msg, color);
}

// Listen for guess
guessBtnEl.addEventListener('click', () => {
  const guess = parseInt(guessInputEl.value, 10);

  // Validate input
  if (!guess || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}.`);
  }

  // Check win case
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct, you win!`, 'green');
    // guessInputEl.disabled = true;
    // guessInputEl.style.borderColor = 'green';
    // setMessage(`${winningNum} is correct, you win!`, 'green');
  } else {
    guessesLeft -= 1;
    
    if (guessesLeft === 0) {
      // Game over - lose
      gameOver(false, `Game over, you lost. The correct number was ${winningNum}`);
    } else {
      // Game continues - wrong answer
      guessInputEl.style.borderColor = 'red';
      // Clear input field
      guessInputEl.value = '';
      setMessage(`${guess} is not correct. You have ${guessesLeft} guesses left.`, 'red');
    }
  }
});

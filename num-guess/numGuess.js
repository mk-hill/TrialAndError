(function () {

  // ? Wrapping entire code in an IIFE to prevent console exploit ?
  // ? Seems to work, undo in case of issues ?
  // ? Any performance cost due to additional execution context ?
  // ? Maybe wrap only winningNum related code in IIFE ?
  // ? Though libraries seem to do the same ?

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
      winningNum = getWinningNum(),
      guessesLeft = 3;

  // DOM Elements
  const gameEl = document.querySelector('#game'),
        minNumEl = document.querySelector('.min-num'),
        maxNumEl = document.querySelector('.max-num'),
        guessBtnEl = document.querySelector('#guess-btn'),
        guessInputEl = document.querySelector('#guess-input'),
        messageEl = document.querySelector('.message');

  // ? Use classes for stuff like this? ^
  // ? Look into reasons/best practices on eslint rule requiring separate declarations
  /* eslint-enable */
  // Might as well:
  // console.log(`Here you go: ${winningNum}`);
  // Solved with IIFE
  // Hoisting this function so we don't have to split up the variable declarations above
  function getWinningNum() {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

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

    // New round prompt add class for new event handler
    guessBtnEl.value = 'Play again?';

    guessBtnEl.className = 'play-again';
  };

  // Listen for guess
  guessBtnEl.addEventListener('click', () => {
    const guess = parseInt(guessInputEl.value, 10);

    // Validate input
    if (!guess || guess < min || guess > max) {
      setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
      return;
    }

    // Check win case
    if (guess === winningNum) {
      gameOver(true, `${winningNum} is correct, you win!`, 'green');
    } else {
      guessesLeft -= 1;

      // Check lose case
      if (guessesLeft === 0) {
        gameOver(false, `Game over, you lost. The correct number was ${winningNum}`);
      } else {
        // Game continues - wrong answer
        guessInputEl.style.borderColor = 'red';
        // Clear input field
        guessInputEl.value = '';
        setMessage(`${guess} is not correct. Remaining guesses: ${guessesLeft}`, 'red');
      }
    }
  });

  // Listen for new round. new-round class not present on dom load, delegating event
  gameEl.addEventListener('mousedown', (e) => {
    if (e.target.className === 'play-again') {
      window.location.reload();
    }
  });

}());

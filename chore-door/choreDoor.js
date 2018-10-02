// * Written for codecademy project - HTML, CSS & images provided by codecademy *

const doorImage1 = document.getElementById('door1');
const doorImage2 = document.getElementById('door2');
const doorImage3 = document.getElementById('door3');
const botDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
const beachDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
const spaceDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';
const closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';
let openDoor1;
let openDoor2;
let openDoor3;
let numClosedDoors = 3;
const startButton = document.getElementById('start');
let currentlyPlaying = true;
let score = 0;
let highScore = 0;
const currentStreak = document.getElementById('current-score');
const bestStreak = document.getElementById('high-score');
currentStreak.innerHTML = score;
bestStreak.innerHTML = highScore;

const isBot = (door) => {
  if (door.src === botDoorPath) {
    return true;
  }
  return false;
};

const isClicked = (door) => {
  if (door.src === closedDoorPath) {
    return false;
  }
  return true;
};

const playDoor = (door) => {
  numClosedDoors--;
  if (numClosedDoors === 0) {
    gameOver('win');
  } else if (isBot(door)) {
    gameOver('lose');
  }
};

const randomChoreDoorGenerator = () => {
  const choreDoor = Math.floor(Math.random() * numClosedDoors);
  if (choreDoor === 0) {
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor === 1) {
    openDoor2 = botDoorPath;
    openDoor1 = spaceDoorPath;
    openDoor3 = beachDoorPath;
  } else if (choreDoor === 2) {
    openDoor3 = botDoorPath;
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath;
  }
};

door1.onclick = () => {
  if (currentlyPlaying && !isClicked(door1)) {
    doorImage1.src = openDoor1;
    playDoor(door1);
  }
};
door2.onclick = () => {
  if (currentlyPlaying && !isClicked(door2)) {
    doorImage2.src = openDoor2;
    playDoor(door2);
  }
};
door3.onclick = () => {
  if (currentlyPlaying && !isClicked(door3)) {
    doorImage3.src = openDoor3;
    playDoor(door3);
  }
};

const startRound = () => {
  numClosedDoors = 3;
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  startButton.innerHTML = 'Good Luck!';
  currentlyPlaying = true;
  randomChoreDoorGenerator();
};

startButton.onclick = () => {
  if (!currentlyPlaying) {
    startRound();
  }
};

const getScore = () => {
  score++;
  currentStreak.innerHTML = score;
  if (score > highScore) {
    highScore = score;
    bestStreak.innerHTML = highScore;
  }
};

function gameOver(str) {
  if (str === 'win') {
    startButton.innerHTML = 'You win! Play again?';
    getScore();
  } else if (str === 'lose') {
    startButton.innerHTML = 'Game over! Play again?';
    score = 0;
    currentStreak.innerHTML = score;
  }
  currentlyPlaying = false;
}

startRound();

let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const displayContent = `${minutes < 10 ? `0${minutes}` : minutes}:${
    remainderSeconds < 10 ? `0${remainderSeconds}` : remainderSeconds
  }`;
  document.title = displayContent;
  timerDisplay.textContent = displayContent;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${hour > 12 ? hour - 12 : hour}:${
    minutes < 10 ? `0${minutes}` : minutes
  }.`;
}

function timer(seconds) {
  // Clear any existing timers first
  clearInterval(countdown);

  const now = Date.now();
  // now is in ms
  const end = now + seconds * 1000;
  // Using setInterval only to update display every 1s rather than keeping
  // the time so time is kept accurately regardless of whether the browser
  // stops calling func below due to scrolling/being on another tab etc
  displayTimeLeft(seconds);
  displayEndTime(end);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((end - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

function startCustomTimer(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
}

buttons.forEach(button => button.addEventListener('click', startTimer));
// * Can use name attribute to select directly
document.customForm.addEventListener('submit', startCustomTimer);

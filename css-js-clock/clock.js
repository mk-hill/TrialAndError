const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours() % 12;

  // Default rotation at 90deg is all hands stacked at 9 oclock
  // Adding 90 deg to offset starting point to to 12
  const secondsDeg = (90 + seconds * 6); // % 360;
  const minsDeg = (90 + minutes * 6); // % 360;
  const hoursDeg = (90 + hours * 30); // % 360;

  // Transition forces a full rotation after 0 which looks janky
  // Commenting out %360 above so the transitionless tick happens at 12
  // rather than arbitrary 9 - jank deg becomes 90 instead of 0
  // ? Could just continue tallying degs inifitely instead ?
  if (secondsDeg === 90 || minsDeg === 90 || hoursDeg === 90) {
    secondHand.style.transition = 'none';
    minHand.style.transition = 'none';
    hourHand.style.transition = 'none';
  } else {
    secondHand.style.transition = 'all .05s cubic-bezier(.1, 2.7, .58, 1)';
    minHand.style.transition = 'all .05s cubic-bezier(.1, 2.7, .58, 1)';
    hourHand.style.transition = 'all .05s cubic-bezier(.1, 2.7, .58, 1)';
  }
  secondHand.style.transform = `rotate(${secondsDeg}deg)`;
  minHand.style.transform = `rotate(${minsDeg}deg)`;
  hourHand.style.transform = `rotate(${hoursDeg}deg)`;
}

setInterval(setDate, 1000);

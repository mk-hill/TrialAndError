const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-bar');
const video = document.querySelector('.flex');

function scrubSpeed(e) {
  // Get px y value within elem
  const y = e.pageY - this.offsetTop;
  // Convert to percentage
  const percent = y / this.offsetHeight;
  const min = 0.4;
  const max = 4;
  const height = `${Math.round(percent * 100)}%`;
  const playbackRate = percent * (max - min) + min;
  bar.textContent = `${playbackRate.toFixed(2)}x`;
  bar.style.height = height;
  video.playbackRate = playbackRate;
}

speed.addEventListener('mousemove', scrubSpeed);

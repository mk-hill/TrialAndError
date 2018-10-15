// Get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggleBtn = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip');
const ranges = player.querySelectorAll('.player__slider');
let mousedown = false;

// Build functions

const togglePlay = () => {
  // Video already has paused/play()/pause()
  // if (video.paused) {
  //   video.play();
  // } else {
  //   video.pause();
  // }
  const method = video.paused ? 'play' : 'pause';
  video[method]();
};

// Func declaration allows this = video
function updateToggleBtn() {
  const icon = this.paused ? '►' : '❚❚';
  toggleBtn.textContent = icon;
}

function skip() {
  // Getting skip values from html button elem [data-skip] attribute
  video.currentTime += parseFloat(this.dataset.skip);
}

function updateRange() {
  // Html elems given the same names as their respective video attribute
  video[this.name] = this.value;
}

function scrub(e) {
  // e.offsetX gives distance from left end which was clicked in px
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleVideoProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Add event listeners

video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleVideoProgress);
toggleBtn.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', updateRange));
ranges.forEach(range => range.addEventListener('mousemove', updateRange));
progress.addEventListener('click', scrub);
// Only run scrub() if mousedown is true
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => {
  mousedown = true;
});
progress.addEventListener('mouseup', () => {
  mousedown = false;
});
// Adding separate event listeners to video to detect when its paused/playing
// to update play/pause button appearance instead of typing it into togglePlay()\
// in case user toggles the video another way (plugin etc.)
video.addEventListener('play', updateToggleBtn);
video.addEventListener('pause', updateToggleBtn);

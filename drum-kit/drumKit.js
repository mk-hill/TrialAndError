function removeTransition(e) {
  // 'transitionend' event triggers on every property of the element that has transitioned
  // focusing on only one, potentially longest - transform.
  if (e.propertyName !== 'transform') return;
  this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
// Using transitionend preferable to set timeout because it will remain in sync
// even if css transition duration is changed
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

const playSound = (e) => {
  const audioEl = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const keyEl = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (!audioEl) return; // Stop function if event listener picked up an unassigned keydown
  audioEl.currentTime = 0; // Rewind audio if it was already playing
  audioEl.play();
  keyEl.classList.add('playing');
};

window.addEventListener('keydown', playSound);

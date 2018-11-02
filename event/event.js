const divs = document.querySelectorAll('div');

function logText(e) {
  console.log(this.classList.value);
  // * Stops propagation regardless of direction determined
  // * by capture value below. If capture is true this line will
  // * cause only the parent event to be triggered. child if false.
  // e.stopPropagation();
}

divs.forEach(div => div.addEventListener('click', logText, {
  // * False by default, if set to true events trigger downwards
  // * during capture rather than upwards during bubble
  capture: false,
  // * Listens to event once then removes the event listener
  // * once it has triggerred
  once: true,
}));

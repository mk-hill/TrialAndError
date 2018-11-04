const slider = document.querySelector('.items');
let mouseIsDown = false;
let startX;
let initialScrollPoint;

function handleMouseDown(e) {
  mouseIsDown = true;
  slider.classList.add('active');
  // Account for any margins or other elems offsetting slider elem
  startX = e.pageX - slider.offsetLeft;
  // Save how far slider was scrolled initially
  initialScrollPoint = slider.scrollLeft;
}
function handleMouseLeave() {
  // Prevent scrolling from continuing if user leaves area while
  // lmb is pressed and returns later
  mouseIsDown = false;
  slider.classList.remove('active');
}
function handleMouseUp() {
  mouseIsDown = false;
  slider.classList.remove('active');
}
function handleMouseMove(e) {
  if (!mouseIsDown) return;
  // Preventing mouse hold from selecting text/elems etc
  e.preventDefault();
  const currentX = e.pageX - slider.offsetLeft;
  const dX = (currentX - startX) * 2;
  slider.scrollLeft = initialScrollPoint - dX;
}

slider.addEventListener('mousedown', handleMouseDown);
slider.addEventListener('mouseleave', handleMouseLeave);
slider.addEventListener('mouseup', handleMouseUp);
slider.addEventListener('mousemove', handleMouseMove);

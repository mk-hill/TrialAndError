const canvas = document.querySelector('#draw');

// Canvas can also be used for 3d rendering, using 2d in this case
const ctx = canvas.getContext('2d');

// Resizing canvas to cover entire window - couldn't we have done this with css?
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
// ctx.globalCompositeOperation = 'color-dodge';

// isDrawing will be kept true while mouse is pressed down
let isDrawing = false;

// Will be used to keep track of coords and color
let lastX = 0;
let lastY = 0;
let hue = 0;
let lineWidth = 11;
let incrementWidth = true;

const draw = (e) => {
  if (!isDrawing) return; // Stop fn from running when mouse isn't pressed
  console.log(e);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY); // Start
  ctx.lineTo(e.offsetX, e.offsetY); // End
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue++;
  hue %= 360;
  incrementWidth = lineWidth > 99 || lineWidth < 11 ? !incrementWidth : incrementWidth;
  if (incrementWidth) {
    lineWidth++;
  } else {
    lineWidth--;
  }
};

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  // Update starting position to current mouse location so that we're
  // not stuck with one continuous line
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});
canvas.addEventListener('mouseout', () => {
  isDrawing = false;
});

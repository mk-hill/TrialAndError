const output = document.querySelector('h3');
const colorLeft = document.getElementById('color-left');
const colorRight = document.getElementById('color-right');
const body = document.getElementById('gradient');
const current = document.getElementById('current');

function setGradient() {
  body.style.background = `linear-gradient(to right, ${colorLeft.value}, ${colorRight.value})`;
  current.style.display = 'block';
  output.textContent = `${body.style.background};`;
}

colorLeft.addEventListener('input', setGradient);

colorRight.addEventListener('input', setGradient);

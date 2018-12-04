const cats = [...document.getElementsByClassName('cat-pic')];

const counters = [...document.getElementsByClassName('counter')];

const meow = new Audio('meow.ogg');

const clicks = {};
function catClicked(i) {
  clicks[i] = clicks[i] ? clicks[i] + 1 : 1;
  if (clicks[i] % 10 === 0) {
    meow.play();
  }
  counters[i].textContent = `Clicks: ${clicks[i]}`;
}

cats.forEach((cat, index) => cat.addEventListener('click', () => catClicked(index)));

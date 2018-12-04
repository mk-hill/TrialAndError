const catHeader = document.getElementById('cat-name');
const catPic = document.getElementById('cat-pic');
const counter = document.getElementById('counter');
const catLinks = [...document.getElementsByClassName('nav-link')];
const meow = new Audio('./assets/meow.ogg');

const cats = {
  space: {
    index: 0,
    clicks: 0,
  },
  moon: {
    index: 1,
    clicks: 0,
  },
  blanket: {
    index: 2,
    clicks: 0,
  },
  forest: {
    index: 3,
    clicks: 0,
  },
  watcher: {
    index: 4,
    clicks: 0,
  },
};

let activeCat = '';

function updateCounter() {
  counter.textContent = cats[activeCat].clicks
    ? `Clicks: ${cats[activeCat].clicks}`
    : 'No clicks yet :(';
}

function setActiveCat(name = 'space') {
  if (activeCat) {
    document.body.classList.remove(activeCat);
    catLinks[cats[activeCat].index].classList.remove('active');
  }
  document.body.classList.add(name);
  activeCat = name;
  catLinks[cats[name].index].classList.add('active');
  catHeader.textContent = `Click the ${name.charAt(0).toUpperCase() + name.substring(1)} Cat`;
  catPic.src = `./assets/${name}cat.jpg`;
  updateCounter();
}

function catClicked() {
  cats[activeCat].clicks += 1;
  if (cats[activeCat].clicks % 10 === 0) {
    meow.play();
  }
  updateCounter();
}

function navHandler(e) {
  const catName = e.target.textContent
    .replace('Cat', '')
    .trim()
    .toLowerCase();
  setActiveCat(catName);
}

catLinks.forEach(link => link.addEventListener('click', navHandler));
catPic.addEventListener('click', catClicked);
document.addEventListener('DOMContentLoaded', () => setActiveCat());

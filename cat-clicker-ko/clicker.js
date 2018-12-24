const defaultCats = [
  {
    name: 'Space Cat',
    clicks: 0,
    imgSrc: './assets/spacecat.jpg',
    nicknames: ['Astro', 'Spacey', 'PodCat'],
  },
  {
    name: 'Moon Cat',
    clicks: 0,
    imgSrc: './assets/mooncat.jpg',
    nicknames: ['Nickname 1', 'Nickname 2', 'Nickname 3'],
  },
  {
    name: 'Blanket Cat',
    clicks: 0,
    imgSrc: './assets/blanketcat.jpg',
    nicknames: ['Nickname 1', 'Nickname 2', 'Nickname 3'],
  },
  {
    name: 'Forest Cat',
    clicks: 0,
    imgSrc: './assets/forestcat.jpg',
    nicknames: ['Nickname 1', 'Nickname 2', 'Nickname 3'],
  },
  {
    name: 'Watcher Cat',
    clicks: 0,
    imgSrc: './assets/watchercat.jpg',
    nicknames: ['Nickname 1', 'Nickname 2', 'Nickname 3'],
  },
];

class Cat {
  constructor({
    name = 'Space Cat',
    imgSrc = './assets/spacecat.jpg',
    nicknames = ['Astro', 'Spacey', 'PodCat'],
    clickCount = 0,
  } = {}) {
    this.clickCount = ko.observable(clickCount);
    this.name = ko.observable(name);
    this.imgSrc = ko.observable(imgSrc);
    this.nicknames = ko.observableArray(nicknames);
    this.level = ko.computed(() => {
      const clicks = this.clickCount();
      if (clicks < 10) return 'Newborn';
      if (clicks < 25) return 'Infant';
      if (clicks < 50) return 'Kitten';
      if (clicks < 100) return 'Teen';
      if (clicks < 250) return 'Adult';
      if (clicks < 500) return 'Ninja';
      if (clicks < 1000) return 'Elder';
      return 'Ascended';
    }, this);
  }
}

const ViewModel = function () {
  this.catList = ko.observable(defaultCats.map(catSettings => new Cat(catSettings)));
  this.currentCat = ko.observable(this.catList()[0]);
  // click handler receives the model rather than regular event
  this.setCurrentCat = (clickedCat) => {
    this.currentCat(clickedCat);
    // console.log('a');
  };

  this.incrementCounter = () => {
    // if regular func is used:
    // inside this function this represents binding context of currentCat
    // (due to data-bind="with currentCat" on parent dom element)
    // or could do self = this
    this.currentCat().clickCount(this.currentCat().clickCount() + 1);
  };
};

ko.applyBindings(new ViewModel());

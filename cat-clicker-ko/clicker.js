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
  this.currentCat = ko.observable(new Cat());
  this.incrementCounter = () => {
    // if regular func is used:
    // inside this function this represents binding context of currentCat
    // (due to data-bind="with currentCat" on parent dom element)
    // or could do self = this
    this.currentCat().clickCount(this.currentCat().clickCount() + 1);
  };
};

ko.applyBindings(new ViewModel());

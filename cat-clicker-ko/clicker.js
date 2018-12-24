const ViewModel = function () {
  this.clickCount = ko.observable(0);
  this.name = ko.observable('Space Cat');
  this.imgSrc = ko.observable('./assets/spacecat.jpg');
  this.level = ko.computed(() => {
    if (this.clickCount() < 10) return 'Newborn';
    if (this.clickCount() < 25) return 'Infant';
    if (this.clickCount() < 50) return 'Kitten';
    if (this.clickCount() < 100) return 'Teen';
    if (this.clickCount() < 250) return 'Adult';
    if (this.clickCount() < 500) return 'Wisened';
    if (this.clickCount() < 1000) return 'Elder';
    return 'Ascended';
  }, this);

  this.incrementCounter = function () {
    this.clickCount(this.clickCount() + 1);
  };
};

ko.applyBindings(new ViewModel());

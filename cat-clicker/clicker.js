const model = {
  activeCatIndex: 0,
  cats: [
    { name: 'space', clicks: 0 },
    { name: 'moon', clicks: 0 },
    { name: 'blanket', clicks: 0 },
    { name: 'forest', clicks: 0 },
    { name: 'watcher', clicks: 0 },
  ],
};

const octopus = {
  meowFreq: 10,

  getActiveCat() {
    return model.cats[model.activeCatIndex];
  },

  getActiveCatIndex() {
    return model.activeCatIndex;
  },

  setActiveCat(index = 0) {
    const previousCat = { index: model.activeCatIndex, name: this.getActiveCat().name };
    model.activeCatIndex = index;
    // if (model.cats[index].imgSrc) this.activeCat.imgSrc = model.cats[index].imgSrc;
    view.displayActiveCat({ index, ...this.getActiveCat() }, previousCat);
  },

  incrementClicks() {
    model.cats[model.activeCatIndex].clicks += 1;
    if (model.cats[model.activeCatIndex].clicks % this.meowFreq === 0) {
      view.meow();
    }
  },

  init() {
    view.init(model.cats.map(cat => cat.name));
    this.defaults = [...model.cats];
    this.setActiveCat();
  },

  updateCat({
    name, clicks, imgSrc, index,
  }) {
    model.cats[index] = { name, clicks: Number(clicks), imgSrc };
    view.displayActiveCat({ index, ...this.getActiveCat() });
  },

  restoreCat(index) {
    this.updateCat({
      index,
      ...this.defaults[index],
    });
  },
};

const view = {
  catHeader: document.getElementById('cat-name'),
  catPic: document.getElementById('cat-pic'),
  counter: document.getElementById('counter'),
  catList: document.getElementById('cat-list'),
  meowSound: new Audio('./assets/meow.ogg'),
  adminToggle: document.getElementById('admin-toggle'),
  adminPanel: document.querySelector('.admin'),
  adminNameInput: document.getElementById('admin-input-name'),
  adminClicksInput: document.getElementById('admin-input-clicks'),
  adminSrcInput: document.getElementById('admin-input-imgSrc'),
  inputs: [this.adminNameInput, this.adminClicksInput, this.adminSrcInput],
  adminSubmit: document.getElementById('admin-submit'),
  adminReset: document.getElementById('admin-reset'),

  updateCounter() {
    const { clicks } = octopus.getActiveCat();
    this.counter.textContent = clicks ? `Clicks: ${clicks}` : 'No clicks yet :(';
    this.adminClicksInput.value = clicks;
  },

  populateAdminPanel() {
    let { name, clicks, imgSrc } = octopus.getActiveCat();
    if (!imgSrc) imgSrc = `./assets/${name}cat.jpg`;
    this.adminNameInput.value = name;
    this.adminClicksInput.value = clicks;
    this.adminSrcInput.value = imgSrc;
  },

  displayActiveCat(currentCat, previousCat) {
    if (previousCat) {
      document.body.classList.remove(previousCat.name);
      this.catLinks[previousCat.index].classList.remove('active');
    }
    const { index, name, imgSrc } = currentCat;
    document.body.classList.add(name);
    this.catLinks[index].classList.add('active');
    this.catHeader.textContent = `Click the ${name.charAt(0).toUpperCase()
      + name.substring(1)} Cat`;
    this.catPic.src = imgSrc || `./assets/${name}cat.jpg`;
    this.populateAdminPanel();
    this.updateCounter();
  },

  createCatLink(name, index) {
    const catLink = document.createElement('li');
    catLink.classList.add('nav-link');
    catLink.dataset.index = index;
    catLink.textContent = `${name[0].toUpperCase()}${name.slice(1)} Cat`;
    return catLink;
  },

  initCatLinks(catNames) {
    this.catLinks = catNames.map((name, index) => this.createCatLink(name, index));
    this.catLinks.forEach(link => this.catList.appendChild(link));
  },

  init(catNames) {
    [this.catHeader, this.counter, this.catPic].forEach((elem) => {
      elem.style.display = 'block';
    });
    this.initCatLinks(catNames);
    this.catLinks.forEach(link => link.addEventListener('click', this.navHandler));
    this.catPic.addEventListener('click', this.catClicked.bind(this));
    this.adminToggle.addEventListener('click', () => this.adminPanel.classList.toggle('no-display'));
    this.adminSubmit.addEventListener('click', this.updateHandler.bind(this));
    this.adminReset.addEventListener('click', this.resetHandler.bind(this));
  },

  updateHandler(e) {
    e.preventDefault(); // needed?
    document.body.classList.remove(octopus.getActiveCat().name); // remove predefined styles for cat type when user sets custom cat
    const [name, clicks, imgSrc] = [
      this.adminNameInput,
      this.adminClicksInput,
      this.adminSrcInput,
    ].map(input => input.value);
    const index = octopus.getActiveCatIndex();
    this.catLinks[index].textContent = `${name[0].toUpperCase()}${name.slice(1)} Cat`;
    octopus.updateCat({
      name,
      clicks,
      imgSrc,
      index,
    });
    this.adminPanel.classList.add('no-display');
  },

  resetHandler() {
    octopus.restoreCat(octopus.getActiveCatIndex());
    this.adminPanel.classList.add('no-display');
  },

  navHandler(e) {
    return octopus.setActiveCat(e.target.dataset.index);
  },

  meow() {
    return this.meowSound.play();
  },

  catClicked() {
    octopus.incrementClicks();
    this.updateCounter();
  },
};

octopus.init();

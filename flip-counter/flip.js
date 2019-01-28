class FlipCounter {
  // ! For quick testing, validate properly if using elsewhere
  constructor(selectors) {
    Object.keys(selectors).forEach((element) => {
      this[element] = document.querySelector(selectors[element]);
    });

    this.currentSecond = 0;

    [this.secondsInput, this.submitButton] = this.form.children;
    [this.leftCardFront, this.leftCardBack] = this.leftCard.children;
    [this.rightCardFront, this.rightCardBack] = this.rightCard.children;
  }

  boop() {
    console.dir(this.interval);
  }

  submitForm(e) {
    e.preventDefault();

    if (this.interval) {
      clearInterval(this.interval);
    }
    this.startCounting(Number(this.secondsInput.value));
    this.secondsInput.value = '';
  }

  startCounting(secondsToCount = 60, auto = false) {
    this.currentSecond = secondsToCount;

    this.updateCards(auto);

    this.interval = setInterval(() => {
      if (this.currentSecond > 0) {
        this.currentSecond--;
      }
      this.updateCards(auto);
    }, 1000);
  }

  updateCards(auto = false) {
    // leftDigit = 0 if currentSecond is < 10
    const stringToDisplay = `${this.currentSecond > 9 ? this.currentSecond : `0${this.currentSecond}`}`;
    const [leftDigit, rightDigit] = [...stringToDisplay];
    this.leftCard.textContent = leftDigit;
    // this.leftCardFront.textContent = leftDigit;
    // this.leftCardBack.textContent = leftDigit;
    this.rightCard.textContent = rightDigit;
    // this.rightCardFront.textContent = rightDigit;
    // this.rightCardBack.textContent = rightDigit;

    if (this.currentSecond === 0) {
      if (auto) {
        this.currentSecond = 60;
      } else {
        clearInterval(this.interval);
      }
    }
  }

  init() {
    this.form.addEventListener('submit', this.submitForm.bind(this));

    this.startCounting(60, true);
  }
}

const config = {
  counter: '.counter',
  leftCard: '.counter__card--left',
  rightCard: '.counter__card--right',
  form: '.seconds-form',
};

const flipCounter = new FlipCounter(config);
flipCounter.boop();
flipCounter.init();

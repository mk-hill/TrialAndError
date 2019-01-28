/* eslint-disable func-names */

(function () {
  class Carousel {
    constructor(selectors) {
      const validKeys = ['track', 'nextButton', 'prevButton', 'indicator', 'currentIndicator'];

      Object.keys(selectors)
        .filter(key => validKeys.includes(key))
        .forEach((element) => {
          this[element] = document.querySelector(selectors[element]);
        });

      this.selectors = selectors;

      // Convert HTML collections to array
      this.slides = [...this.track.children];
      this.indicatorButtons = [...this.indicator.children];

      this.currentSlideIndex = 0;

      // Width of slides in px
      this.slideWidth = this.slides[0].getBoundingClientRect().width;

      this.setSlidePosition = this.setSlidePosition.bind(this);
      this.moveSlide = this.moveSlide.bind(this);
    }

    // Max last slide index
    get nextSlideIndex() {
      return this.currentSlideIndex + 1 >= this.slides.length ? this.slides.length - 1 : this.currentSlideIndex + 1;
    }

    // Minimum 0
    get prevSlideIndex() {
      return this.currentSlideIndex - 1 < 0 ? 0 : this.currentSlideIndex - 1;
    }

    // Move slide to the right by slide width * its order
    setSlidePosition(slide, index) {
      slide.style.left = `${index * this.slideWidth}px`;
    }

    // Moves to next slide by default
    moveSlide(nextSlideIndex = this.currentSlideIndex) {
      if (nextSlideIndex === this.currentSlideIndex) return; // do nothing if getters returned current or no arg given

      // Move entire track to bring target into view
      this.track.style.transform = `translateX(-${this.slideWidth * nextSlideIndex}px)`;

      // Update indicator button classes
      this.indicatorButtons[this.currentSlideIndex].classList.remove(this.selectors.currentIndicator);
      this.indicatorButtons[nextSlideIndex].classList.add(this.selectors.currentIndicator);

      // Set state
      this.currentSlideIndex = nextSlideIndex;
    }

    init() {
      this.slides.forEach(this.setSlidePosition);

      this.nextButton.addEventListener('click', () => this.moveSlide(this.nextSlideIndex));
      this.prevButton.addEventListener('click', () => this.moveSlide(this.prevSlideIndex));
      this.indicator.addEventListener('click', (e) => {
        // Closest button null if user clicked elsewhere
        const targetIndex = this.indicatorButtons.indexOf(e.target.closest('button'));

        // Only proceed if user clicked on a valid button
        if (targetIndex !== null && targetIndex !== -1) {
          this.moveSlide(targetIndex);
        }
      });
    }
  }

  const config = {
    track: '.carousel__track',
    nextButton: '.carousel__button--right',
    prevButton: '.carousel__button--left',
    indicator: '.carousel__indicator',
    currentIndicator: 'carousel__indicator__button--current',
  };

  const carousel = new Carousel(config);
  carousel.init();
}());

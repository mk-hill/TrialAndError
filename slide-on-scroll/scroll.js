function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function () {
    const context = this;

    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide(e) {
  sliderImages.forEach((image) => {
    // scrollY returns top position, we're going for when it first becomes
    // halfway visible at the bottom of the viewport
    const slideInAt = window.scrollY + window.innerHeight - image.height / 2;
    // offsetTop returns pixel value of how far down the top is, adding height
    const imageBottom = image.offsetTop + image.height;
    const isHalfShown = slideInAt > image.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;
    if (isHalfShown && isNotScrolledPast) {
      image.classList.add('active');
    } else {
      image.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', debounce(checkSlide));

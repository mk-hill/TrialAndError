const triggers = document.querySelectorAll('.cool > li');
const background = document.querySelector('.dropdownBackground');
const nav = document.querySelector('.top');

function handleEnter() {
  // Display: block added with one class, cannot be animated
  // Also need display prop to not be none first to grab dropdown dimensions below
  this.classList.add('trigger-enter');
  // Opacity added with another
  setTimeout(() => {
    // If user moves out too fast, handleLeave ends up unable to remove
    // .trigger-enter-active because it has not been added yet
    // Conditional ensures -active is not added if -enter has already been removed
    // Leaving this way instead of using () => condition && add statement for future readability
    if (this.classList.contains('trigger-enter')) {
      this.classList.add('trigger-enter-active');
    }
  }, 150);
  // Show background div
  background.classList.add('open');
  // Dynamically select current dropdown
  const dropdown = this.querySelector('.dropdown');
  // Get dimensions of current dropdown
  const dropdownCoords = dropdown.getBoundingClientRect();
  // Dynamically grabbing nav coords as well in case dom is changed
  const navCoords = nav.getBoundingClientRect();
  // Set final coords for background and assign below
  const coords = {
    height: dropdownCoords.height,
    width: dropdownCoords.width,
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left,
  };
  background.style.setProperty('width', `${coords.width}px`);
  background.style.setProperty('height', `${coords.height}px`);
  background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
}

function handleLeave() {
  this.classList.remove('trigger-enter-active');
  setTimeout(() => this.classList.remove('trigger-enter'), 0);
  background.classList.remove('open');
}

triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));

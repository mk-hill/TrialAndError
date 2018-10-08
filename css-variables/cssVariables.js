const inputs = document.querySelectorAll('.controls input');

function updateValue() {
  // Accessing custom data-sizing attirbute
  const suffix = this.dataset.sizing || '';
  // Variables set on root document element in css
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener('change', updateValue));
// Change event only triggers when mb is released and new value is set
// mousemove triggers any mouse movement on the input even if not clicked
// Could refine further to eliminate mousemove without clicks
inputs.forEach(input => input.addEventListener('mousemove', updateValue));

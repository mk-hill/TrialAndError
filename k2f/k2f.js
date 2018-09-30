// ! Create separate listeners for each, rather than just calculating k to f !

document.getElementById('calculate').addEventListener('click', (e) => {
  const kelvin = e.target.value;
  const celsius = kelvin - 273;
  const fahrenheit = Math.floor(celsius * (9 / 5) + 32);
  document.getElementById('celsius').value = celsius;
  document.getElementById('fahrenheit').value = fahrenheit;
});

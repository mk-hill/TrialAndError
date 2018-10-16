const keysPressed = [];
const codeKeys = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
  'Enter',
];

window.addEventListener('keyup', (e) => {
  keysPressed.push(e.key);
  // Trim keysPressed to only last few characters needed to detect code
  keysPressed.splice(-codeKeys.length - 1, keysPressed.length - codeKeys.length);
  if (keysPressed.join(' ').includes(codeKeys.join(' '))) {
    const h1 = document.querySelector('h1');
    h1.textContent = '🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈';
    h1.style.textAlign = 'center';
    cornify_add();
  }
});

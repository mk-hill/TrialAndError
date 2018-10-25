const bands = [
  'The Plot in You',
  'The Devil Wears Prada',
  'Pierce the Veil',
  'Norma Jean',
  'The Bled',
  'Say Anything',
  'The Midway State',
  'We Came as Romans',
  'Counterparts',
  'Oh, Sleeper',
  'A Skylit Drive',
  'Anywhere But Here',
  'An Old Dog',
];

const articles = /^(The |A |An )/;

const sortedBands = [...bands].sort(
  (x, y) => (x.replace(articles, '') > y.replace(articles, '') ? 1 : -1),
);

const bandsEl = document.getElementById('bands');

sortedBands.forEach((band) => {
  bandsEl.innerHTML += `<li>${band}</li>`;
});

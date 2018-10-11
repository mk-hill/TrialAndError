const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
  .then(res => res.json())
  .then(data => cities.push(...data));

const findMatches = (wordToMatch, cities) => cities.filter((cityObj) => {
  const regex = new RegExp(wordToMatch, 'gi');
  return cityObj.city.match(regex) || cityObj.state.match(regex);
});

const inputEl = document.querySelector('.search');
const suggestionsEl = document.querySelector('.suggestions');

function displayMatches() {
  const matchArr = findMatches(this.value, cities);
  const elemsString = matchArr
    .map((match) => {
      // Highlight input field value in search results
      const highlightRe = new RegExp(this.value, 'gi');
      const cityName = match.city.replace(highlightRe, `<span class="hl">${this.value}</span>`);
      const stateName = match.state.replace(highlightRe, `<span class="hl">${this.value}</span>`);
      // Using toLocaleString below to format population numbers with commas
      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${Number(match.population).toLocaleString()}</span>
      </li>
      `;
    })
    .join('');
  suggestionsEl.innerHTML = elemsString;
}

inputEl.addEventListener('change', displayMatches);
inputEl.addEventListener('keyup', displayMatches);

console.log(cities);

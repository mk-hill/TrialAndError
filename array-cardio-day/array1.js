// Get your shorts on - this is an array workout!
// ## Array Cardio Day 1

// Some data we can work with

const inventors = [
  {
    first: 'Albert',
    last: 'Einstein',
    year: 1879,
    passed: 1955,
  },
  {
    first: 'Isaac',
    last: 'Newton',
    year: 1643,
    passed: 1727,
  },
  {
    first: 'Galileo',
    last: 'Galilei',
    year: 1564,
    passed: 1642,
  },
  {
    first: 'Marie',
    last: 'Curie',
    year: 1867,
    passed: 1934,
  },
  {
    first: 'Johannes',
    last: 'Kepler',
    year: 1571,
    passed: 1630,
  },
  {
    first: 'Nicolaus',
    last: 'Copernicus',
    year: 1473,
    passed: 1543,
  },
  {
    first: 'Max',
    last: 'Planck',
    year: 1858,
    passed: 1947,
  },
  {
    first: 'Katherine',
    last: 'Blodgett',
    year: 1898,
    passed: 1979,
  },
  {
    first: 'Ada',
    last: 'Lovelace',
    year: 1815,
    passed: 1852,
  },
  {
    first: 'Sarah E.',
    last: 'Goode',
    year: 1855,
    passed: 1905,
  },
  {
    first: 'Lise',
    last: 'Meitner',
    year: 1878,
    passed: 1968,
  },
  {
    first: 'Hanna',
    last: 'Hammarström',
    year: 1829,
    passed: 1909,
  },
];

const people = [
  'Beck, Glenn',
  'Becker, Carl',
  'Beckett, Samuel',
  'Beddoes, Mick',
  'Beecher, Henry',
  'Beethoven, Ludwig',
  'Begin, Menachem',
  'Belloc, Hilaire',
  'Bellow, Saul',
  'Benchley, Robert',
  'Benenson, Peter',
  'Ben-Gurion, David',
  'Benjamin, Walter',
  'Benn, Tony',
  'Bennington, Chester',
  'Benson, Leana',
  'Bent, Silas',
  'Bentsen, Lloyd',
  'Berger, Ric',
  'Bergman, Ingmar',
  'Berio, Luciano',
  'Berle, Milton',
  'Berlin, Irving',
  'Berne, Eric',
  'Bernhard, Sandra',
  'Berra, Yogi',
  'Berry, Halle',
  'Berry, Wendell',
  'Bethea, Erin',
  'Bevan, Aneurin',
  'Bevel, Ken',
  'Biden, Joseph',
  'Bierce, Ambrose',
  'Biko, Steve',
  'Billings, Josh',
  'Biondo, Frank',
  'Birrell, Augustine',
  'Black, Elk',
  'Blair, Robert',
  'Blair, Tony',
  'Blake, William',
];

// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's
// const filteredInventors = inventors.filter(
//   inventor => inventor.year > 1499 && inventor.year < 1600,
// );
// console.table(filteredInventors);

// Array.prototype.map()
// 2. Give us an array of the inventors' first and last names
const inventorFullNames = inventors.map(inventor => `${inventor.first} ${inventor.last}`);
console.log('Inventor full names:', inventorFullNames);

// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest
// const sortedInventors = inventors.sort((x, y) => x.year - y.year);
// console.table(sortedInventors);

//
// ─── 4. HOW MANY YEARS DID ALL THE INVENTORS LIVE? ──────────────────────────────
//

// const lifespans = inventors.map(inventor => inventor.passed - inventor.year);
// const totalLifespan = lifespans.reduce((acc, val) => acc + val);
// Or just chain:
// const totalLifespan = inventors
//   .map(inventor => inventor.passed - inventor.year)
//   .reduce((acc, val) => acc + val);
// .reduce() initialValue param allows direct usage by preventing acc from being first obj in arr
const totalLifespan = inventors.reduce(
  (acc, inventor) => acc + (inventor.passed - inventor.year),
  0,
);
console.log(totalLifespan);

//
// ─── 5. SORT THE INVENTORS BY YEARS LIVED ───────────────────────────────────────
//

const inventorsByLifespan = inventors.sort((x, y) => y.passed - y.year - (x.passed - x.year));
console.table(inventorsByLifespan);

//
// ─── 6. CREATE A LIST OF BOULEVARDS IN PARIS THAT CONTAIN 'DE' ANYWHERE IN THE NAME
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris

// Array not provided - grabbing data from wikipedia first
// const wikipediaLinks = Array.from(document.querySelectorAll('.mw-category a'));
// Could also spread: const wikipediaLinks = [...document.querySelectorAll('.mw-category a')];
// const linkTitles = wikipediaLinks.map(link => link.childNodes[0].data);
// Could have just used textContent instead:  wikipediaLinks.map(link => link.textContent);
const grabbedTitles = [
  'Boulevards of Paris',
  'City walls of Paris',
  'Thiers wall',
  'Wall of Charles V',
  'Wall of Philip II Augustus',
  'City gates of Paris',
  "Haussmann's renovation of Paris",
  'Boulevards of the Marshals',
  'Boulevard Auguste-Blanqui',
  'Boulevard Barbès',
  'Boulevard Beaumarchais',
  "Boulevard de l'Amiral-Bruix",
  'Boulevard des Capucines',
  'Boulevard de la Chapelle',
  'Boulevard de Clichy',
  'Boulevard du Crime',
  'Boulevard Haussmann',
  "Boulevard de l'Hôpital",
  'Boulevard des Italiens',
  'Boulevard de la Madeleine',
  'Boulevard de Magenta',
  'Boulevard Montmartre',
  'Boulevard du Montparnasse',
  'Boulevard Raspail',
  'Boulevard Richard-Lenoir',
  'Boulevard de Rochechouart',
  'Boulevard Saint-Germain',
  'Boulevard Saint-Michel',
  'Boulevard de Sébastopol',
  'Boulevard de Strasbourg',
  'Boulevard du Temple',
  'Boulevard Voltaire',
  'Boulevard de la Zone',
];

// Adding spaces to omit other words including 'de'
const boulevardsWithDe = grabbedTitles.filter(boulevard => boulevard.includes(' de '));
console.log(boulevardsWithDe);

//
// ─── 7. SORT EXERCISE ───────────────────────────────────────────────────────────
// Sort the people alphabetically by last name

// people array already sorted by last name - assuming intent was first name
// const splitNames = people.map(person => person.split(' '));
// //const sortedSplitNames = splitNames.sort(
// //   (nameArr1, nameArr2) => nameArr1[1].toLowerCase() - nameArr2[1].toLowerCase(),
// //);
// It appears we can compare unicode values but cannot directly subtract as it returns NaN
// const sortedSplitNames = splitNames.sort((nameArr1, nameArr2) => {
//   if (nameArr1[1].toLowerCase() > nameArr2[1].toLowerCase()) {
//     return 1;
//   }
//   return -1;
// });
// const rejoinedSortedNames = sortedSplitNames.map(namesArr => namesArr.join(' '));
// console.log('People array sorted by first name:', rejoinedSortedNames);

// *** Redoing with single function using destructuring ***
const peopleByFirstName = people.sort((x, y) => {
  const [xLast, xFirst] = x.split(', ');
  const [yLast, yFirst] = y.split(', ');
  return xFirst.toLowerCase() > yFirst.toLowerCase() ? 1 : -1;
});
console.log('People array sorted by first name:', peopleByFirstName);

//
// ─── 8. REDUCE EXERCISE ─────────────────────────────────────────────────────────
// Sum up the instances of each of these
const data = [
  'car',
  'car',
  'truck',
  'truck',
  'bike',
  'walk',
  'car',
  'van',
  'bike',
  'walk',
  'car',
  'van',
  'car',
  'truck',
];

// ? Reduce into an object ?
const dataCounts = data.reduce((count, item) => {
  count[item] = (count[item] || 0) + 1;
  return count;
}, {});
console.log(dataCounts);

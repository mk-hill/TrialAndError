// express exports createApplication()
const express = require('express');
const bodyParser = require('body-parser');

// createApplication returns function with request, response properties,
// listen method etc added onto it
const app = express();

const port = process.env.PORT || 59768;

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

// Serving static assets from /public when request to /assets is made
app.use('/assets', express.static(`${__dirname}/public`));

// Custom middleware like redux - app.use takes in path and func
app.use('/', (req, res, next) => {
  console.log(req.url);
  next();
});

app.set('view engine', 'ejs'); // Will use /views by default

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/json', (req, res) => {
  res.json({ first: 'john', last: 'doe' });
});

// Pulling out of querystring
app.get('/item/:collection/:id', (req, res) => {
  const {
    params: { collection, id },
    query: { qstr, aliens },
  } = req; // Pulling out of request
  res.render('item', {
    collection,
    id,
    qstr,
    aliens,
  });
});

// parse body instead of querystring for POST
app.post('/item', urlencodedParser, (req, res) => {
  res.send(req.body);
  console.log(req.body);
});

app.post('/itemjson', jsonParser, (req, res) => {
  res.send(req.body);
  console.log(req.body);
});

app.listen(port);

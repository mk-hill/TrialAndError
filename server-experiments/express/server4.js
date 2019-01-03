// express exports createApplication()
const express = require('express');

// createApplication returns function with request, response properties,
// listen method etc added onto it
const app = express();

const port = process.env.PORT || 59768;

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

app.get('/item/:collection/:id', (req, res) => {
  const {
    params: { collection, id },
  } = req; // Pulling out of request.params
  res.render('item', { collection, id });
});

app.listen(port);

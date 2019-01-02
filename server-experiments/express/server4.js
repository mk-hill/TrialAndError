// express exports createApplication()
const express = require('express');

// createApplication returns function with request, response properties,
// listen method etc added onto it
const app = express();

const port = process.env.PORT || 59768;

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Title</title>
</head>
<body>
  <h1>hello</h1>
</body>
</html>`);
});

app.get('/json', (req, res) => {
  res.json({ first: 'john', last: 'doe' });
});

app.get('/item/:collection/:id', (req, res) => {
  const {
    params: { collection, id },
  } = req; // Pulling out of request.params
  res.json({ collection, id });
});

app.listen(port);

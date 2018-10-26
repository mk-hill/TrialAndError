const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const users = [{ name: 'John2', occupation: 'not alien' }];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/profile/:id', (req, res) => {
  console.log(req.params);
  res.status(404).send('not found');
});

app.get('/profile', (req, res) => {
  console.log(req.query);
  console.log(req.body);
  console.log(req.header);
  console.log(req.params);
  const testObj = {
    name: 'John',
    occupation: 'alien',
  };
  res.send(testObj);
});

app.post('/profile', (req, res) => {
  users.push(req.body);
  console.log(users);
  res.send('Success');
});

app.get('/', (req, res) => {
  res.send('<h1>root</h1>');
});
app.listen(3000);

module.exports = users;

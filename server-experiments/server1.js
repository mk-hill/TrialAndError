const http = require('http');

const server = http.createServer((req, res) => {
  console.log('headers', req.headers);
  console.log('method', req.method);
  console.log('url', req.url);
  const testObj = {
    name: 'alien',
    goop: 'glob',
  };
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(testObj));
});

server.listen(3000);

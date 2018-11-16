/**
 * Example http2 client
 */

const http2 = require('http2');

const client = http2.connect('http://localhost/6000');

// Create request
const req = client.request({
  ':path': '/',
});

// When a amessage is received, add the pieces together until end is reached
let str = '';
req.on('data', (chunk, e) => {
  str += chunk;
  console.log(e);
});

req.on('end', () => {
  console.log(str);
});

req.end();

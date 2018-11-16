/**
 * Example http2 server
 */

const http2 = require('http2');

const server = http2.createServer();

// On a stream (websocket?) send back hello world html
server.on('stream', (stream, headers) => {
  stream.respond({
    status: 200,
    'content-type': 'text/html',
  });
  stream.end('<html><body><h1>Hello World</h1></body></html>');
});

server.listen(6000);

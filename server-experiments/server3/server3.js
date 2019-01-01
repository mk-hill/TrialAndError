const http = require('http');
const fs = require('fs');

/**
// Takes event listener callback, passes in request and response stream
// Req, res use node's event emitter
// Returns object which has listen method
 http
   .createServer((req, res) => {
     res.writeHead(200, { 'Content-Type': 'text/html' }); // Write response header incl content mime type
     let html = fs.readFileSync(`${__dirname}/index.html`, 'utf8'); // getting string to alter by specifying encoding
     const message = 'Replaced template text';
     html = html.replace('{message}', message);
     res.end(html); // Sending body with end rather than send, since it's a single chunk
   })
   .listen(59768, '127.0.0.1'); // Passing in port and IP
*/

/**
// Pipe file as its read into response stream
http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' }); // Write response header incl content mime type
    fs.createReadStream(`${__dirname}/index.html`).pipe(res); // Piping in read stream directly into res write stream
  })
  .listen(59768, '127.0.0.1'); // Passing in port and IP
 */

/**
 * Example TLS Server
 * Listens to port 6000 and sends the word 'pong' to clients
 */

const tls = require('tls');
const fs = require('fs');
const path = require('path');

// Server options
const options = {
  key: fs.readFileSync(path.join(__dirname, '/../https/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '/../https/cert.pem')),
};

const server = tls.createServer(options, connection => {
  const outboundMessage = 'pong';
  connection.write(outboundMessage);

  // When the client writes something, log that out
  connection.on('data', inboundMessage => {
    const messageString = inboundMessage.toString();
    console.log(`I wrote ${outboundMessage}, they said ${messageString}`);
  });
});

server.listen(6000);

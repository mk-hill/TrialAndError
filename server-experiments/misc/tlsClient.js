/**
 * Example TLS Client
 * Connects to port 6000 and sends the word 'ping' to server
 */

const tls = require('tls');
const fs = require('fs');
const path = require('path');

// Need to have cert on client too because it is self-signed
// Not necessary with real cert
const options = {
  ca: fs.readFileSync(path.join(__dirname, '/../https/cert.pem')),
};

const outboundMessage = 'ping';

const client = tls.connect(
  6000,
  options,
  () => {
    client.write(outboundMessage);
  }
);

// When the server writes back, log what it said and kill client
client.on('data', inboundMessage => {
  const messageString = inboundMessage.toString();
  console.log(`I wrote ${outboundMessage}, they said ${messageString}`);
  client.end();
});

/**
 * Example TCP (Net) Client
 * Connects to port 6000 and sends the word 'ping' to server
 */

const net = require('net');

const outboundMessage = 'ping';

const client = net.createConnection({ port: 6000 }, () => {
  client.write(outboundMessage);
});

// When the server writes back, log what it said and kill client
client.on('data', inboundMessage => {
  const messageString = inboundMessage.toString();
  console.log(`I wrote ${outboundMessage}, they said ${messageString}`);
  client.end();
});

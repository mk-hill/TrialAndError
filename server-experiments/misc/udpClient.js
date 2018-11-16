/**
 * Example UDP client
 * Sending a message to usp server on port 6000
 */

const dgram = require('dgram');
const client = dgram.createSocket('udp4');

// Define message and pull into buffer
const messageString = 'this is a message';
const messageBuffer = Buffer.from(messageString);

client.send(messageBuffer, 6000, 'localhost', err => {
  client.close();
});

/**
 * Example TCP (Net) Server
 * Listens to port 6000 and sends the word 'pong'
 */

const net = require('net');

const server = net.createServer(connection => {
  const outboundMessage = 'pong';
  connection.write(outboundMessage);

  // When the client writes something, log that out
  connection.on('data', inboundMessage => {
    const messageString = inboundMessage.toString();
    console.log(`I wrote ${outboundMessage}, they said ${messageString}`);
  });
});

server.listen(6000);

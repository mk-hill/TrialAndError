const express = require('express');

const app = express();
const SocketIoServer = require('socket.io'); // Exposes Server constructor func

app.use(express.static(`${__dirname}/public`));

// Storing return value to use with socket.io
const expressServer = app.listen(59768);

/**
 * Socket.io server constructor takes in http server to bind to and optional options obj
 * Serves client by default from /socket.io with following options
{
  path: '/socket.io',
  serveClient: true,
}
 * CORS rules go in "origins" property on options obj
 * Tons of other options <3 https://socket.io/docs/server-api/
 * They've covered not using "new" in the constructor as well
 * Can pass in port instead of HTTP server as well if HTTP server isn't needed
 */

const server = new SocketIoServer(expressServer, {
  path: '/socket.io',
  serveClient: true,
}); // Options obj can be removed, kept defaults

/**
 * const server = SocketIoServer(expressServer);
 * ^ equivalent to:
 * const server = SocketIoServer();
 * server.attach(expressServer)
 */

/**
 * Client always initially connects to main namespace ("/"), can connect to others after
 * connect fires on connection to a namespace defaults to main when namespace not specified
 * socket that was connected on comes in as param to callback
 * adding listeners inside cb to that socket
 * (not actual tcp/ip socket, instance of Socket class provided defined in socket.io)
 * Inherits from EventEmitter, overrides emit method only
 */

server.on('connect', (socket) => {
  // Custom events
  // Emit to socket that was created on connection, event identified by string as expected
  socket.emit('msgFromServer', { msg: 'Connected to socket.io server' });
  // Register new handler for given event, inherited directly from EventEmitter
  socket.on('msgToServer', (objectFromClient) => {
    console.log(objectFromClient);
  });

  // On event from any given socket
  socket.on('userMsg', ({ userMsg }) => {
    // Emit event to all open sockets
    // console.log(userMsg);
    server.emit('msgToClients', { newMsg: userMsg });
    // ^ equivalent to: server.of('/').emit('msgToClients', { newMsg: userMsg });
  });
});

server.of('/test').on('connect', (socket) => {
  socket.emit('msgFromServer', { msg: 'Connected to socket.io server' });
  socket.on('msgToServer', (objectFromClient) => {
    console.log(objectFromClient);
  });

  socket.on('userMsg', ({ userMsg }) => {
    server.of('/test').emit('msgToClients', { newMsg: userMsg });
  });
});

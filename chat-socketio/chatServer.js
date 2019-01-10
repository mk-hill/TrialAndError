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

server.on('connection', (socket) => {
  // Custom events
  // Emit to socket that was created on connection
  socket.emit('msgFromServer', { data: 'Connected to socket.io server' });
  // Listen to socket, execute callback on msgToServer event
  socket.on('msgToServer', (objectFromClient) => {
    console.log(objectFromClient);
  });
});

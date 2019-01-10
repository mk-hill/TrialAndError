const http = require('http');
const socketio = require('socket.io');

const server = http.createServer((req, res) => {
  res.end('Connected to socket.io test.');
});

const io = socketio(server);

io.on('connection', (socket, req) => {
  // ws.send -> socket.emit - can have custom events
  socket.emit('alien', 'Connected to socket.io server.');
  socket.on('message', msg => console.log(msg.data));
});

server.listen(59768);

// const ws = new WebSocket('ws://localhost:59768');
const socket = io('http://localhost:59768');
const p = document.querySelector('p');

console.dir(socket);

socket.on('connect', (data) => {
  // custom events doable
  socket.on('alien', (msg) => {
    console.log(msg);
    p.textContent = msg;
  });

  socket.emit('message', { data: 'Message from client to server' });
});

/**
console.log(ws);

ws.onopen = (event) => {
  console.log(event);
  ws.send('Message from client to server');
};

ws.onmessage = (event) => {
  console.log(event);
  p.textContent = event.data;
};
 */

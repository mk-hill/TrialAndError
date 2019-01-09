const ws = new WebSocket('ws://localhost:59768');
const p = document.querySelector('p');

console.log(ws);

ws.onopen = (event) => {
  console.log(event);
  ws.send('Message from client to server');
};

ws.onmessage = (event) => {
  console.log(event);
  p.textContent = event.data;
};

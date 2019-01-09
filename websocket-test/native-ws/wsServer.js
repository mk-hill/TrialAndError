const http = require('http');
const websocket = require('ws');

const server = http.createServer((req, res) => {
  res.end('Connected.');
});

const wsServer = new websocket.Server({ server });

wsServer.on('headers', (headers, req) => {
  console.log(headers); // Connects on http initially, uses status code 101 "Switching protocols" to switch to ws
});

wsServer.on('connection', (ws, req) => {
  ws.send('Connected to websocket server.');
  ws.on('message', msg => console.log(msg));
  // console.log(ws);
  // console.log(req);
});

server.listen(59768);

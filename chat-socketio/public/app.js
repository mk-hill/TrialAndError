const p = document.querySelector('p');

const socket = io('http://localhost:59768');

socket.on('msgFromServer', (objectFromServer) => {
  console.log(objectFromServer);
  p.textContent = JSON.stringify(objectFromServer);
  socket.emit('msgToServer', { data: 'Sent from client' });
});

//
// ─── DOM STUFF ──────────────────────────────────────────────────────────────────
//
const p = document.querySelector('p');
const msgInput = document.getElementById('user-input');
const msgList = document.getElementById('msg-list');

document.getElementById('msg-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const userMsg = msgInput.value;
  if (!userMsg) return; // ignore empty submit
  msgInput.value = '';
  socket.emit('userMsg', { userMsg });
});

function addMessage(msg) {
  const newListItem = document.createElement('li');
  newListItem.className = 'text-secondary';
  newListItem.textContent = `${Date.now()}: ${msg}`;
  msgList.appendChild(newListItem);
}

//
// ─── SOCKET.IO STUFF ────────────────────────────────────────────────────────────
//

/**
 * Client importable:
* import io from 'socket.io-client';

* Client also deliverable by server, loaded in separate script tag
* Invocation returns "Socket" (not the same class as the one used on the server),
* and creates new Manager
 */
const socket = io('http://localhost:59768'); // "/" namespace/endpoint
const socket2 = io('http://localhost:59768/test'); // "/test" namespace

socket2.on('welcome', messageFromServer => console.log(messageFromServer));

socket.on('joinedRoom', msg => console.log(msg));

// Custom events work the same way here in the client (any string except reserved ones)
socket.on('msgFromServer', (objectFromServer) => {
  const displayString = `Data Received: ${JSON.stringify(objectFromServer)}`;
  console.log(displayString); // Doesn't need to be an object, just happen to be sending one
  p.textContent = displayString;
  socket.emit('msgToServer', { msg: 'Sent from client' });
});

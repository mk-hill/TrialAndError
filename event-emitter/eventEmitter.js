/**
 * Implement an EventEmitter that supports standard operations, such as adding and removing listeners
 * and emitting events by topic.
 *
 * - Using event names as keys for listener arrays
 */

class EventEmitter {
  // Add callback to array, create array if there is none
  on(event, callback) {
    if (!this[event]) {
      this[event] = [];
    }
    this[event].push(callback);
    return this;
  }

  // Alias for on
  addListener(event, callback) {
    return this.on(event, callback);
  }

  // Adding second off() listener, to be invoked after the one passed in
  once(event, callback) {
    this.on(event, callback);
    this.on(event, () => this.off(event, callback));
    return this;
  }

  // Invoke all listeners, pass along arguments
  emit(event, ...args) {
    this[event].forEach(listener => listener(...args));
    return this;
  }

  // Remove listener from event array
  off(event, listener) {
    this[event].splice(this[event].indexOf(listener), 1);
    return this;
  }

  // Alias for off
  removeListener(event, listener) {
    return this.off(event, listener);
  }
}

const eventEmitter = new EventEmitter();

function responseToEvent(msg) {
  console.log(msg);
}

eventEmitter
  .on('test', responseToEvent)
  .once('test', (msg) => {
    console.log(`${msg} just once!`);
  })
  .emit('test', '1st')
  .emit('test', '2nd')
  .off('test', responseToEvent)
  .emit('test', '3rd')
  .emit('test', '1st');

//
// ─── DOM STUFF ──────────────────────────────────────────────────────────────────
//

function addTextAndLogEvent(e) {
  const p = document.createElement('p');
  p.textContent = `${e.target.tagName} clicked.`;
  console.log(e);
  document.body.appendChild(p);
}

eventEmitter.on('buttonClick', addTextAndLogEvent);

document.querySelector('button').addEventListener('click', e => eventEmitter.emit('buttonClick', e));

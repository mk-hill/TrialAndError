/**
 * Implement an EventEmitter that supports standard operations, such as adding and removing listeners
 * and emitting events by topic.
 *
 * - Using event names as keys for listener arrays
 */

class EventEmitter {
  constructor() {
    // Creating separate events obj to protect against events with the same name as a method
    // Prevent eventEmitter.events from being reassigned
    Object.defineProperty(this, 'events', { value: {}, writable: false });
  }

  // Add callback to array, create array if there is none
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    // ? Create emit alias for easier access as well?
    if (!this[event]) {
      this[event] = this.emit.bind(this, event);
    }

    this.events[event].push(callback);
    return this;
  }

  // Alias for on
  addListener(event, callback) {
    return this.on(event, callback);
  }

  // Adding listener which invokes original cb and then removes itself
  once(event, callback) {
    const newCb = (...args) => {
      callback(...args);
      this.off(event, newCb);
    };

    this.on(event, newCb);
    return this;
  }

  // Invoke all listeners, pass along arguments
  emit(event, ...args) {
    this.events[event].forEach(listener => listener(...args));
    return this;
  }

  // Remove listener from event array
  off(event, listener) {
    this.events[event].splice(this.events[event].indexOf(listener), 1);
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
  p.textContent = e.target ? `${e.target.tagName} clicked.` : e;
  console.log(e);
  document.body.appendChild(p);
}

eventEmitter.on('buttonClick', addTextAndLogEvent);

document.querySelector('button').addEventListener('click', e => eventEmitter.emit('buttonClick', e));

eventEmitter.events = '';
eventEmitter.once('test', addTextAndLogEvent);
console.log(eventEmitter.events.test[0]);
eventEmitter.emit('test', 'eventEmitter.events reassignment prevented.');
eventEmitter.emit('test', 'There should be no listeners left for test.');
console.log(eventEmitter.events.test[0]);

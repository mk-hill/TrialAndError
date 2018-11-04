//
// ─── QUEUE ATTEMPT ──────────────────────────────────────────────────────────────
//

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  peek() {
    return this.first;
  }

  enqueue(value) {
    const entry = new Node(value);
    if (this.isEmpty()) {
      this.first = entry;
      this.last = entry;
    } else {
      this.last.next = entry;
      this.last = entry;
    }
    this.length++;
    return this;
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    if (this.first === this.last) {
      this.last = null;
    }
    const oldFirst = this.first;
    this.first = this.first.next;
    this.length--;
    return oldFirst;
  }

  isEmpty() {
    return !this.length;
  }
}

const myQueue = new Queue();

myQueue.enqueue('First');
myQueue.enqueue('Second');
myQueue.enqueue('Third');
myQueue.dequeue();

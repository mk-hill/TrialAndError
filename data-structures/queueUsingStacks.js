//
// ─── QUEUE ATTEMPT USING STACKS ──────────────────────────────────────────────────────────────
//

class Stack {
  constructor() {
    this.data = [];
  }

  peek() {
    return this.data[this.data.length - 1];
  }

  push(value) {
    return this.data.push(value);
  }

  pop() {
    return this.data.pop();
  }

  isEmpty() {
    return !this.data.length;
  }
}

class CrappyQueue {
  constructor() {
    this.stack = new Stack();
  }

  peek() {
    return this.stack[0];
  }

  enqueue(value) {
    return this.stack.push(value);
  }

  /*
  dequeue() {
    return this.stack.data.shift();
  }
  */

  dequeue() {
    const tempStack = new Stack();
    while (!this.stack.isEmpty()) {
      tempStack.push(this.stack.pop());
    }
    const firstInLine = tempStack.pop();
    while (!tempStack.isEmpty()) {
      this.stack.push(tempStack.pop());
    }
    return firstInLine;
  }

  isEmpty() {
    return this.stack.isEmpty();
  }
}

const myCrappyQueue = new CrappyQueue();
myCrappyQueue.enqueue('one');
myCrappyQueue.enqueue('two');
myCrappyQueue.enqueue('three');
console.log(myCrappyQueue);
myCrappyQueue.dequeue();
myCrappyQueue.isEmpty();

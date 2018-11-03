//
// ─── STACK ATTEMPT WITH LINKED LIST ──────────────────────────────────────────────────────────────
// ? Why not just use arrays ?

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.bottom = null;
    this.length = 0;
  }

  peek() {
    return this.top;
  }

  push(value) {
    const entry = new Node(value);
    if (this.isEmpty()) {
      this.top = entry;
      this.bottom = entry;
    } else {
      entry.next = this.top;
      this.top = entry;
    }
    this.length++;
    return this;
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }
    if (this.top === this.bottom) {
      this.bottom = null;
    }
    const oldTop = this.top;
    this.top = this.top.next;
    this.length--;
    return oldTop;
  }

  isEmpty() {
    return !this.length;
  }
}

const myStack = new Stack();
myStack.push('First');
myStack.push('Second');
myStack.push('Third');
myStack.push('Fourth');
console.log(myStack);
myStack.pop();
myStack.pop();
console.log(myStack.peek());
myStack.pop();
myStack.pop();
console.log(myStack.isEmpty());
console.log(myStack);

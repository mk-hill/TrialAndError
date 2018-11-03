//
// ─── STACK ATTEMPT WITH ARRAY ──────────────────────────────────────────────────────────────
// ? Why not just use arrays ?
// ? Could add peek and isEmpty to array.prototype ?
// ? Or extend Array ?
// ? Or just don't store top and bottom ?

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

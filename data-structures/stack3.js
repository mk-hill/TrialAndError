//
// ─── STACK ATTEMPT WITH ARRAY ──────────────────────────────────────────────────────────────
// ? Why not just use arrays ?
// ? Could add peek and isEmpty to array.prototype ?
// ? Or extend Array ?

class Stack extends Array {
  constructor() {
    super();
  }

  peek() {
    return this[this.length - 1];
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

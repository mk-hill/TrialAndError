//
// ─── STACK ATTEMPT WITH ARRAY ──────────────────────────────────────────────────────────────
// ? Why not just use arrays ?
// ? Could add peek and isEmpty to array.prototype ?

class Stack {
  constructor() {
    this.data = [];
    this.top = null;
    this.bottom = null;
    this.length = 0;
  }

  peek() {
    return this.top;
  }

  push(value) {
    if (this.isEmpty()) {
      this.top = value;
      this.bottom = value;
    } else {
      this.top = value;
    }
    this.length++;
    return this.data.push(value);
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }
    if (this.top === this.bottom) {
      this.bottom = null;
      this.top = null;
    }
    this.top = this.data[this.length - 2];
    this.length--;
    return this.data.pop();
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

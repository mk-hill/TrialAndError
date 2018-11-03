//
// ─── DOUBLY LINKED LIST ATTEMPT ─────────────────────────────────────────────────
//

class Node {
  constructor(value) {
    this.value = value;
    this.previous = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor(value) {
    this.head = {
      value,
      previous: null,
      next: null,
    };
    this.tail = this.head;
    this.length = 1;
  }

  append(value) {
    const entry = new Node(value);
    entry.previous = this.tail;
    this.tail.next = entry;
    this.tail = entry;
    this.length++;
    return entry;
  }

  prepend(value) {
    const entry = new Node(value);
    entry.next = this.head;
    this.head.previous = entry;
    this.head = entry;
    this.length++;
    return entry;
  }

  printList() {
    const arr = [];
    let currentNode = this.head;
    while (currentNode !== null) {
      arr.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return arr;
  }

  _traverseToIndexFromStart(index) {
    let currentNode = this.head;
    let i = 0;
    while (i < index) {
      currentNode = currentNode.next;
      i++;
    }
    return currentNode;
  }

  _traverseToIndexFromEnd(index) {
    let currentNode = this.tail;
    let i = this.length - 1;
    while (i > index) {
      currentNode = currentNode.previous;
      i--;
    }
    return currentNode;
  }

  traverseToIndex(index) {
    if (index >= 0 && index < this.length / 2) {
      return this._traverseToIndexFromStart(index);
    }
    if (index < this.length - 1) {
      return this._traverseToIndexFromEnd(index);
    }
    return undefined;
  }

  insert(index, value) {
    if (index >= this.length) {
      return this.append(value);
    }
    const entry = new Node(value);
    const priorNode = this.traverseToIndex(index - 1);
    const nextNode = priorNode.next;
    nextNode.previous = entry;
    priorNode.next = entry;
    entry.next = nextNode;
    entry.previous = priorNode;
    this.length++;
    return entry;
  }

  remove(indexIn) {
    const index = indexIn > this.length - 1 ? this.length - 1 : indexIn;
    const priorNode = this.traverseToIndex(index - 1);
    const nextNode = priorNode.next.next;
    priorNode.next = nextNode;
    nextNode.previous = priorNode;
    this.length--;
    // Yay for garbage collection?
    return this.printList();
  }
}

const myLinkedList = new DoublyLinkedList(10);
myLinkedList.append(7);
myLinkedList.append(16);
myLinkedList.append(23);
myLinkedList.append(47);
myLinkedList.prepend(4);
myLinkedList.prepend(2);

myLinkedList.insert(6, 1248);
myLinkedList.remove(3);
myLinkedList.printList();

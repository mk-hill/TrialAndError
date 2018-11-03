//
// ─── LINKED LIST ATTEMPT ────────────────────────────────────────────────────────
//

// myLinkedList = {
//   head: {
//     value: 10
//     next: {
//       value: 5
//       next: {
//         value: 16
//         next: null
//       }
//     }
//   }
// };

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(value) {
    this.head = {
      value,
      next: null,
    };
    this.tail = this.head;
    this.length = 1;
  }

  append(value) {
    const entry = new Node(value);
    this.tail.next = entry;
    this.tail = entry;
    this.length++;
    return entry;
  }

  prepend(value) {
    const entry = new Node(value);
    entry.next = this.head;
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

  /* eslint-disable */
  awfulInsert(index, value) {
    const entry = new Node(value);
    let theresGottaBeABetterWay = 'this.head';
    for (let i = 0; i < index - 1; i++) {
      theresGottaBeABetterWay += '.next';
    }
    const priorNode = eval(theresGottaBeABetterWay);
    const destination = priorNode.next;
    priorNode.next = entry;
    entry.next = destination;
    this.length++;
  }
  /* eslint-enable */

  okInsert(index, value) {
    const entry = new Node(value);
    let currentNode = this.head;
    let i = 0;
    try {
      while (i < index - 1) {
        currentNode = currentNode.next;
        i++;
      }
    } catch (err) {
      return `Index ${index} does not exist. Maximum index: ${this.length}`;
    }
    const nextNode = currentNode.next;
    currentNode.next = entry;
    entry.next = nextNode;
    this.length++;
    return entry;
  }

  betterInsert(index, value) {
    if (index >= this.length) {
      return this.append(value);
    }
    const entry = new Node(value);
    let currentNode = this.head;
    let i = 0;
    while (i < index - 1) {
      currentNode = currentNode.next;
      i++;
    }
    const nextNode = currentNode.next;
    currentNode.next = entry;
    entry.next = nextNode;
    this.length++;
    return entry;
  }

  traverseToIndex(index) {
    let currentNode = this.head;
    let i = 0;
    while (i < index) {
      currentNode = currentNode.next;
      i++;
    }
    return currentNode;
  }

  insert(index, value) {
    if (index >= this.length) {
      return this.append(value);
    }
    const entry = new Node(value);
    const priorNode = this.traverseToIndex(index - 1);
    const nextNode = priorNode.next;
    priorNode.next = entry;
    entry.next = nextNode;
    this.length++;
    return entry;
  }

  remove(indexIn) {
    const index = indexIn > this.length - 1 ? this.length - 1 : indexIn;
    const priorNode = this.traverseToIndex(index - 1);
    const nextNode = priorNode.next.next;
    priorNode.next = nextNode;
    this.length--;
    // Yay for garbage collection?
    return this.printList();
  }
}

const myLinkedList = new LinkedList(10);
myLinkedList.append(7);
myLinkedList.append(16);
myLinkedList.append(23);
myLinkedList.append(47);
myLinkedList.prepend(4);
myLinkedList.prepend(2);

myLinkedList.insert(6, 1248);
myLinkedList.remove(3);
myLinkedList.printList();

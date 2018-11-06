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

class TreeNode {
  constructor(value) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const entry = new TreeNode(value);
    if (this.isEmpty()) {
      this.root = entry;
      return this;
    }
    let currentNode = this.root;
    while (true) {
      if (value < currentNode.value) {
        if (!currentNode.left) {
          currentNode.left = entry;
          return this;
        }
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        if (!currentNode.right) {
          currentNode.right = entry;
          return this;
        }
        currentNode = currentNode.right;
      }
    }
  }

  // *
  // *── BREADTH FIRST SEARCH/TRAVERSAL ─────────────────────────────────────────────
  // *

  breadthFirstSearch() {
    const result = [];
    const queue = new Queue();
    queue.enqueue(this.root);
    let currentNode = queue.peek();

    while (queue.length > 0) {
      currentNode = queue.dequeue();
      result.push(currentNode.value.value);
      if (currentNode.value.left) {
        queue.enqueue(currentNode.value.left);
      }
      if (currentNode.value.right) {
        queue.enqueue(currentNode.value.right);
      }
    }
    // console.log(result);
    return result;
  }

  bfsRecursive() {
    const queue = new Queue();
    queue.enqueue(this.root);
    return this._breadthFirstSearchRecursive(queue, []);
  }

  // * Must pass in queue and array so that new ones are not created
  // * with each recursive call
  _breadthFirstSearchRecursive(queue, arr) {
    if (!queue.length) {
      return arr;
    }
    const currentNode = queue.dequeue();
    arr.push(currentNode.value.value);
    if (currentNode.value.left) {
      queue.enqueue(currentNode.value.left);
    }
    if (currentNode.value.right) {
      queue.enqueue(currentNode.value.right);
    }
    return this._breadthFirstSearchRecursive(queue, arr);
  }

  // *
  // *── DEPTH FIRST SEARCH/TRAVERSAL ───────────────────────────────────────────────
  // *

  _traverse(node, list, order) {
    if (order === 'preOrder') list.push(node.value);
    if (node.left) {
      this._traverse(node.left, list, order);
    }
    if (order === 'inOrder') list.push(node.value);
    if (node.right) {
      this._traverse(node.right, list, order);
    }
    if (order === 'postOrder') list.push(node.value);
    return list;
  }
  // ? How much do the unnecessary order checks slow it down ?
  // todo test with separate functions below

  dfsInOrder() {
    return this._traverse(this.root, [], 'inOrder');
  }

  // _traverseInOrder(node, list) {
  //   if (node.left) {
  //     this._traverseInOrder(node.left, list);
  //   }
  //   list.push(node.value);
  //   if (node.right) {
  //     this._traverseInOrder(node.right, list);
  //   }
  //   return list;
  // }

  dfsPostOrder() {
    return this._traverse(this.root, [], 'postOrder');
  }

  // _traversePostOrder(node, list) {
  //   if (node.left) {
  //     this._traverseInOrder(node.left, list);
  //   }
  //   if (node.right) {
  //     this._traverseInOrder(node.right, list);
  //   }
  //   list.push(node.value);
  //   return list;
  // }

  dfsPreOrder() {
    return this._traverse(this.root, [], 'preOrder');
  }

  // _traversePreOrder(node, list) {
  //   list.push(node.value);
  //   if (node.left) {
  //     this._traverseInOrder(node.left, list);
  //   }
  //   if (node.right) {
  //     this._traverseInOrder(node.right, list);
  //   }
  //   return list;
  // }

  isEmpty() {
    return this.root === null;
  }
}

const tree = new BinarySearchTree();
tree.insert(9);
tree.insert(4);
tree.insert(6);
tree.insert(20);
tree.insert(170);
tree.insert(15);
tree.insert(1);

//     9
//  4     20
// 1  6  15  170

// console.dir(tree);

// console.log(tree.breadthFirstSearch());

// console.log(tree.bfsRecursive());

// tree.dfsInOrder();

// tree.dfsPreOrder();

tree.dfsPostOrder();

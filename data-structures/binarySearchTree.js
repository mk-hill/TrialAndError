//
// ─── BINARY SEARCH TREE ATTEMPT ─────────────────────────────────────────────────
//
class Node {
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
    const entry = new Node(value);
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

  lookup2(value) {
    if (this.isEmpty()) {
      return false;
    }
    let currentNode = this.root;
    while (currentNode.value !== value) {
      if (value < currentNode.value) {
        if (!currentNode.left) {
          return false;
        }
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        if (!currentNode.right) {
          return false;
        }
        currentNode = currentNode.right;
      }
    }
    return currentNode;
  }

  lookup(value) {
    if (this.isEmpty()) {
      return false;
    }
    let currentNode = this.root;
    while (currentNode) {
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        currentNode = currentNode.right;
      } else if (value === currentNode.value) {
        return currentNode;
      }
    }
    return false;
  }

  messyRemove(value) {
    if (this.isEmpty()) {
      return false;
    }
    let previousNode = this.root;
    let currentNode;
    let direction;
    if (value < previousNode.value) {
      currentNode = previousNode.left;
      direction = 'left';
    } else if (value > previousNode.value) {
      currentNode = previousNode.right;
      direction = 'right';
    }
    while (currentNode) {
      if (value === currentNode.value) {
        if (currentNode.left === null && currentNode.right === null) {
          previousNode[direction] = null;
        } else if (currentNode.left === null && currentNode.right) {
          previousNode[direction] = currentNode.right;
        } else if (currentNode.right === null && currentNode.left) {
          previousNode[direction] = currentNode.left;
        } else {
          let replacementNode = currentNode.right;
          while (replacementNode.left) {
            replacementNode = replacementNode.left;
          }
          previousNode[direction] = replacementNode;
          replacementNode.left = currentNode.left;
          replacementNode.right = currentNode.right;
        }
        return currentNode;
      }
      previousNode = currentNode;
      if (value < previousNode.value) {
        currentNode = previousNode.left;
        direction = 'left';
      } else if (value > previousNode.value) {
        currentNode = previousNode.right;
        direction = 'right';
      }
    }
    return null;
  }

  remove(value) {
    if (this.isEmpty()) {
      return false;
    }
    let currentNode = this.root;
    let parentNode = null;
    while (currentNode) {
      if (value < currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else if (value === currentNode.value) {
        if (currentNode.right === null) {
          // * Option 1: no right child *
          if (parentNode === null) {
            this.root = currentNode.left;
          } else if (currentNode.value < parentNode.value) {
            parentNode.left = currentNode.left;
          } else if (currentNode.value > parentNode.value) {
            parentNode.right = currentNode.left;
          }
          // * Option 2: right child which doesnt have a left child *
        } else if (currentNode.right.left === null) {
          if (parentNode === null) {
            this.root = currentNode.left;
          } else {
            currentNode.right.left = currentNode.left;
            if (currentNode.value < parentNode.value) {
              parentNode.left = currentNode.right;
            } else if (currentNode.value > parentNode.value) {
              parentNode.right = currentNode.right;
            }
          }
          // * Option 3: right child which has a left child *
        } else {
          // * Find the right child's leftmost child *
          let leftmostParent = currentNode.right;
          let leftmost = currentNode.right.left;
          while (leftmost.left !== null) {
            leftmostParent = leftmost;
            leftmost = leftmost.left;
          }
          // * Parent's left subtree is now leftmost's right subtree *
          leftmostParent.left = leftmost.right;
          leftmost.left = currentNode.left;
          leftmost.right = currentNode.right;
          if (currentNode.value < parentNode.value) {
            parentNode.left = leftmost;
          } else if (currentNode.value > parentNode.value) {
            parentNode.right = leftmost;
          }
        }
      }
      return true;
    }
  }

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
console.log(JSON.stringify(traverse(tree.root)));

//     9
//  4     20
// 1  6  15  170

function traverse(node) {
  const tree = { value: node.value };
  tree.left = node.left === null ? null : traverse(node.left);
  tree.right = node.right === null ? null : traverse(node.right);
  return tree;
}

tree.remove(170);
JSON.stringify(traverse(tree.root));

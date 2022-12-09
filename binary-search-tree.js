class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

   
  let currentNode = this.root;
    while (currentNode) {
      if (val < currentNode.val) {
        if (currentNode.left === null) {
          currentNode.left = new Node(val);
          return this;
        } else {
          currentNode = currentNode.left;
        }
      } else if (val > currentNode.val) {
        if (currentNode.right === null) {
          currentNode.right = new Node(val);
          return this;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, currentNode = this.root) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    if (val < currentNode.val) {
      if (currentNode.left === null) {
        currentNode.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, currentNode.left);
    } else {
      if (currentNode.right === null) {
        currentNode.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, currentNode.right);
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
        let currentNode = this.root;
    let found = false;

    if (val === currentNode.val) return currentNode;

    while (currentNode && !found) {
      if (val < currentNode.val) {
        currentNode = currentNode.left;
      } else if (val > currentNode.val) {
        currentNode = currentNode.right;
      } else {
        found = true;
      }
    }

    if (!found) return undefined;
    return currentNode;
      
    }
    
  


  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, currentNode = this.root) {
  if (this.root === null) return undefined;

    if (val < currentNode.val) {
      if (currentNode.left === null) return undefined;
      return this.findRecursively(val, currentNode.left);
    } else if (val > currentNode.val) {
      if (currentNode.right === null) return undefined;
      return this.findRecursively(val, currentNode.right);
    }
    return currentNode;
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
      let arr = [];
    let currentNode = this.root;

    function traverse(node) {
      arr.push(node.val);      node.left && traverse(node.left);
      node.right && traverse(node.right); 
    }

    traverse(currentNode);
    return arr;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let arr = [];
    let currentNode = this.root;

    function traverse(node) {
      node.left && traverse(node.left); 
      arr.push(node.val); 
      node.right && traverse(node.right); 
    }

    traverse(currentNode);
    return arr;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let arr = [];
    let currentNode = this.root;

    function traverse(node) {
      node.left && traverse(node.left);
      node.right && traverse(node.right);
      arr.push(node.val);
    }

    traverse(currentNode);
    return arr;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
let node = this.root;
    let queue = [];
    let arr = [];

    queue.push(node);

    while (queue.length) {
      node = queue.shift();
      arr.push(node.val);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }

    return arr;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
let nodeToRemove = this.root;
    let parent;

    while (nodeToRemove.val !== val) {
      parent = nodeToRemove;
      if (val < nodeToRemove.val) {
        nodeToRemove = nodeToRemove.left;
      } else {
        nodeToRemove = nodeToRemove.right;
      }
    }

    if (nodeToRemove !== this.root) {
      if (nodeToRemove.left === null && nodeToRemove.right === null) {
        if (parent.left === nodeToRemove) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      } else if (nodeToRemove.left !== null && nodeToRemove.right !== null) {
        let rightParent = nodeToRemove;
        let right = nodeToRemove.right;
        if (right.left === null) {
          right.left = nodeToRemove.left;
          if (parent.left === nodeToRemove) {
            parent.left = right;
          } else {
            parent.right = right;
          }
        } else {
          while (right.left !== null) {
            rightParent = right;
            right = right.left;
          }
          if (parent.left === nodeToRemove) {
            parent.left.val = right.val;
          } else {
            parent.right.val = right.val;
          }
          if (right.right !== null) {
            rightParent.left = right.right;
          } else {
            rightParent.left = null;
          }
        }
      } else {
        if (parent.left === nodeToRemove) {
          if (nodeToRemove.right === null) {
            parent.left = nodeToRemove.left;
          } else {
            parent.left = nodeToRemove.right;
          }
        } else {
          if (nodeToRemove.right === null) {
            parent.right = nodeToRemove.left;
          } else {
            parent.right = nodeToRemove.right;
          }
        }
      }
    }
    return nodeToRemove;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced(currentNode = this.root) {
  if (currentNode === null) return;
    return maxDepth(currentNode) - minDepth(currentNode) <= 1;

    function minDepth(currentNode) {
      if (currentNode === null) return 0;
      return 1 + Math.min(minDepth(currentNode.left), minDepth(currentNode.right));
    }

    function maxDepth(currentNode) {
      if (currentNode === null) return 0;
      return 1 + Math.max(maxDepth(currentNode.left), maxDepth(currentNode.right));
    }
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest(currentNode = this.root) {
    if (!this.root || (!this.root.left && !this.root.right)) return;

    while (currentNode) {
      if (currentNode.left && !currentNode.right) {
        return this.findSecondHighest(currentNode.left);
      }
      if (currentNode.right && (!currentNode.right.left && !currentNode.right.right)) {
        return currentNode.val;
      }
      current = currentNode.right;
    }
  }
}

module.exports = BinarySearchTree;

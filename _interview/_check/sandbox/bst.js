class Node {
  // In the begining
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  isEmpty() {
    return this.root === null;
  }

  /**
   *
   * check if nodes exist?
   */
  insert(value) {
    const newNode = new Node(value);
    if (this.isEmpty) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(root, newNode) {}

  search() {}

  preOrder(root) {
    if (root) {
      console.log(root.value);
      this.preOrder(root.left);
      this.preOrder(root.right);
    }
  }

  inOrder() {
    if (root) {
      this.inOrder(root.left);
      console.log(root.value);
      this.inOrder(root.right);
    }
  }

  postOrder() {
    if (root) {
      this.postOrder(root.left);
      this.postOrder(root.right);
      console.log(root.value);
    }
  }
}

/**
 * Tree
 * Root   => 10
 *          /   \
 *         5    15
 *        / \
 *       3   7
 *
 * DFS Traversal
 * - InOrder   => 3,5,7,10,15
 * - PreOrder   => 10,5,3,7,15
 * - PostOrder => 3,7,5,15,10
 *
 * DFS Traversal => 10,5,15,3,7
 */

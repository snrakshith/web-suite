class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }

  print() {
    console.log(this.items.toString());
  }

  //  TODO
  search(item) {
    // this.items.some(item => )
  }

  size() {
    return this.items.length;
  }
}

const stack = new Stack();
stack.isEmpty();

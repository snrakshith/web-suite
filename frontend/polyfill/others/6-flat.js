Array.prototype.myFlatIterative = function () {
  // this is arr
  const stack = [...this];
  const result = [];

  //   Run the loop until there are elements in stack
  while (stack.length) {
    const poppedElement = stack.pop();
    // if the element popped is [4, 5, [6, 7]]
    // then it goes back to array
    if (Array.isArray(poppedElement)) {
      stack.push(...poppedElement);
    } else {
      // if the element popped is 8, then it goes to results arr
      result.push(poppedElement);
    }
  }
  return result.reverse();
};

const arr = [1, 2, 3, [4, 5, [6, 7], 8]];
console.log(arr.myFlatIterative());

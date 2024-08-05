/**
 * Array.every()
 * always returns a boolean, every element in the array,
 * matches the criteria
 */

// Syntax

const arr = [1, 2, 3, 4, 5];

Array.prototype.customEvery = function (cb) {
  if (typeof cb !== "function") {
    throw Error("customEvery Error: undefined is not a function");
  }

  const arr = this;
  for (let i = 0; i < arr.length; i++) {
    // item, index, self
    const result = cb(arr[i], i, arr);
    //  if result is false,
    // !false becomes true then the if block executes to return false
    if (!result) {
      return false;
    }
  }
  return true;
};

// Output
const transform = arr.every((element, index, self) => {
  return element < 0;
});
const res = arr.customEvery((element) => {
  return element > 0;
});

console.log("arr", arr);
console.log("original", transform);
console.log("custom", res);

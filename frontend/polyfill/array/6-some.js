/**
 * Array.some()
 * always returns a boolean, if atleast any 1 element in the array,
 * matches the criteria
 */

// Syntax

const arr = [1, 2, 3, 4, 5];

Array.prototype.customSome = function (cb) {
  if (typeof cb !== "function") {
    throw Error("customSome Error: undefined is not a function");
  }

  const arr = this;
  for (let i = 0; i < arr.length; i++) {
    // item, index, self
    const result = cb(arr[i], i, arr);
    if (result) {
      return true;
    }
  }
  return false;
};

// Output
const transform = arr.some((element, index, self) => {
  return element < 0;
});
const res = arr.customSome((element) => {
  return element > 0;
});

console.log("arr", arr);
console.log("original", transform);
console.log("custom", res);

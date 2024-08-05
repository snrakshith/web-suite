/**
 * Array.find()
 * always returns a first element which matches the criteria
 */

// Syntax

const arr = [1, 2, 3, 4, 5];

Array.prototype.customFind = function (cb) {
  if (typeof cb !== "function") {
    throw Error("customFind Error: undefined is not a function");
  }

  const arr = this;
  for (let i = 0; i < arr.length; i++) {
    // item, index, self
    const result = cb(arr[i], i, arr);
    if (result) {
      return arr[i];
    }
  }
  return undefined;
};

// Output
const transform = arr.find((item, index, self) => {
  return item < 0;
});

const res = arr.customFind((item) => {
  return item !== 2;
});

console.log("arr", arr);
console.log("original", transform);
console.log("custom", res);

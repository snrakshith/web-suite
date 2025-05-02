/**
 * Array.reduce()
 *
 * Syntax
 * Array.reduce(accumulator,currentValue,index,array/self)
 * the computed results are stored back to accumulator after every iteration
 *
 * always returns a single value, initial value is passed into accumulator,
 * in 1st iteration and the result of the 1st iteration is stored back in
 * accumulator,
 *
 * initialValue should be,
 *  1, if you want perform multiply
 *  0, if you want perform addition
 */

// Syntax

const arr = [1, 2, 3, 4, 5];

Array.prototype.customReduce = function (cb, initialValue) {
  if (typeof cb !== "function") {
    throw Error("customReduce Error: undefined is not a function");
  }

  const arr = this;
  for (let i = 0; i < arr.length; i++) {
    // initialValue, item, index, self
    const result = cb(initialValue, arr[i], i, arr);
    initialValue = result;
  }
  return initialValue;
};

// Output
const transform = arr.reduce((acc, element, index, self) => {
  return acc * element;
}, 1);
const res = arr.customReduce((acc, element) => {
  return acc * element;
}, 1);

console.log("arr", arr);
console.log("original", transform);
console.log("custom", res);

/**
 * Array.filter()
 * always returns a new array
 */

// Syntax

const arr = [1, 2, 3, 4, 5];
// const transform = arr.filter((item, index, self) => {
//   return item > 2;
// });
// console.log(arr, transform);

Array.prototype.customFilter = function (cb) {
  if (!cb) {
    throw Error("customFilter Error: undefined is not a function");
  }

  const newArr = [];
  const arr = this;
  for (let i = 0; i < arr.length; i++) {
    // item, index, self
    const result = cb(arr[i], i, arr);
    if (result) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
};

// Output
const transform = arr.customFilter((item) => {
  return item > 2;
});

console.log(arr, transform);

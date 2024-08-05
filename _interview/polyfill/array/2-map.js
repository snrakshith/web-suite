/**
 * Array.map()
 * always returns a new array
 */

// Syntax

const arr = [1, 2, 3, 4, 5];
// const transform = arr.map((item, index, self) => {
//   return item * 2;
// });
// console.log(arr, transform);

Array.prototype.customMap = function (cb) {
  if (!cb) {
    throw Error("customForMap Error: undefined is not a function");
  }

  const newArr = [];
  const arr = this;
  for (let i = 0; i < arr.length; i++) {
    // item, index, self
    const result = cb(arr[i], i, arr);
    newArr.push(result);
  }
  return newArr;
};

// Output
const transform = arr.customMap((item) => {
  return item * 6;
});

console.log(arr, transform);

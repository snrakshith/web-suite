/**
 * Array.forEach()
 */

// Syntax

const arr = [1, 2, 3, 4, 5];
// arr.forEach((item, index, self) => {
//   console.log(item, index, self);
// });

Array.prototype.customForEach = function (cb) {
  if (!cb) {
    throw Error("customForEach Error: undefined is not a function");
  }

  // Remembar which ever object calls .customForEach function that value will be store in this
  /**
   * const arr = [1, 2, 3, 4, 5];
   * arr.customForEach((item, index, self) => {
   * console.log(item, index, self);
   * });
   *
   * So, arr.customForEach is called by "arr",
   * for that reason arr value is stored in "this"
   */
  const arr = this;
  for (let i = 0; i < arr.length; i++) {
    // item, index, self
    cb(arr[i], i, arr);
  }
};

// Output
// arr.customForEach((item) => {
//   console.log(item * 2);
// });

var x = 100;
t();
function t() {
  if (false) {
    x += 200;
    console.log(x);
  }
}
const evenArr = [2, 4, 6, 8, 10];
const oddArr = [1, 3, 5, 7, 9];

const mergeArr = [...evenArr, ...oddArr];

// const res = mergeArr?.map((item) => (item % 2 === 0 ? item - 1 : item + 1));
// console.log("res", res);

const obj = {
  //   1: "E",
  //   4: "C",
  //   2: "B",
  //   5: "A",
  //   3: "D",
  E: 1,
  C: 4,
  B: 2,
  A: 5,
  D: 3,
};

const iterate = Object.entries(obj);
const fObj = iterate.flat();
const temp = fObj.map((item, idx) => idx % 2 === 0 && item);
const res = temp?.filter((val) => val !== false);
// console.log("res", iterate);

// Given arrays
let ar1 = [1, 3, 2, 5, 4];
let ar2 = ["B", "D", "A", "C", "E"];

// Create an array of indices and sort it based on the values in ar1
let indices = ar1.map((_, index) => index);
indices.sort((a, b) => ar1[a] - ar1[b]);

// Sort ar1 and reorder ar2 based on the sorted indices
ar1 = indices.map((index) => ar1[index]);
ar2 = indices.map((index) => ar2[index]);

// Display the sorted arrays
// console.log(ar1); // Output: [1, 2, 3, 4, 5]
// console.log(ar2); // Output: ["B", "A", "D", "E", "C"]

// Create an array of objects with elements from both arrays
let combined = ar1.map((value, index) => ({ value, label: ar2[index] }));

// Sort the array of objects based on the values from ar1
combined.sort((a, b) => a.value - b.value);
console.log("combined", combined);

// Extract the sorted arrays from the sorted objects
ar1 = combined.map((item) => item.value);
ar2 = combined.map((item) => item.label);

// Display the sorted arrays
console.log(ar1); // Output: [1, 2, 3, 4, 5]
console.log(ar2); // Output: ["B", "A", "D", "E", "C"]

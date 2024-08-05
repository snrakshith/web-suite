const k = [1, [2, [3]], 4, "h"];
const a = [
  {
    name: "raju",
    age: 5,
    hobbies: ["singing", "play"],
  },
  {
    name: "raj",
    age: 15,
    hobbies: ["dancing", "play"],
  },
  {
    name: "sn",
    age: 27,
    hobbies: ["sleeping"],
  },
];

// console.log(a.flatMap((item) => item.hobbies));
// console.log(k.flat(2));

// Remove duplicate values in array
const arr = [1, 3, 7, 9, 7, 8, 1, 19];
// console.log([...new Set(arr)]);

// Sort values in array
const unordedArr = [1, 3, 7, 9, 7, 8, 1, 19];
// console.log(unordedArr?.sort((a, b) => a - b));

// Slice & splice values in array
const transformArr = [1, 3, 7, 9, 7, 8, 5, 19];
// console.log(transformArr?.shift());
console.log(transformArr.unshift(11));
console.log(transformArr);
// console.log(transformArr.slice(0, 5));
// console.log(transformArr.splice(0, 5));

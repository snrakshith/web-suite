let array = [1, 2, 3, 4, 5];
console.log(array.length); // 5

array.length = 3; // [1, 2, 3]

console.log(array.length); // 3
console.log(array); // [1, 2, 3]

delete array[0];

console.log(array); // [empty, 2, 3]
console.log(array[0]); // undefined
console.log(array.length); // 3

/**
 * For looping through Objects it becomes bit tricky as JS doesn't support
 * looping out of the box so,
 * - first we have to convert it to an array using any of the methods,
 *   based on choice
 *      - .keys()
 *      - .values()
 *      - .entires()
 * - Then we can use for...of loop
 */

const population = {
  male: 4,
  female: 93,
  others: 10,
};

let genderKeys = Object.keys(population);
let genderValues = Object.values(population);
let genderEntries = Object.entries(population);

// console.log(genderKeys); // ["male","female","others"]
// console.log(genderValues); // [4, 93, 10];
// console.log(genderEntries); // [ [ 'male', 4 ], [ 'female', 93 ], [ 'others', 10 ] ]

// for (const key in population) {
//   console.log(`${key}: ${population[key]}`); // [4, 93, 10];
// }

// After converting we can use Array's for...of loop

// for (const key of genderKeys) {
//   console.log("key", key); 
// }

// output:
// key male
// key female
// key others

// ------

// for (const value of genderValues) {
//   console.log("value", value); 
// }
// output:
// value 4
// value 93
// value 10

for ([key, value] of genderEntries) {
  console.log(key, value);
}

// let totalpopulation = 0;
// genderKeys.forEach((element) => {
//   //   console.log(element);
//   totalpopulation += population[element];
// });

// console.log("total-population", totalpopulation);

// ------
// Example 2
const human = {
  name: "Raj",
  age: 25,
};

// for (const key in human) {
//   console.log(human[key]);
// }


// Example 3
const obj = {
  name: "Raju",
  age: 15,
};

// keys
// console.log("keys", Object.keys(obj));

// values
// console.log("values", Object.values(obj));

for (const keys in obj) {
  console.log(keys, obj[keys]);
}

for (const [keys, values] of Object.entries(obj)) {
  console.log(keys, values);
}

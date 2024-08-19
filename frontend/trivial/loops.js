const human = {
  name: "Raj",
  age: 25,
};

// for (const key in human) {
//   console.log(human[key]);
// }

const heros = ["Superman", "Batman"];

// for (const key in heros) {
//     console.log(key);
//     console.log(heros[key]);
// }

// for (const key of heros) {
//   console.log(key);
// }

/***
 * objects
 */

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

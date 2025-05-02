/**
 * For looping through Arrays
 *  - .map()
 *  - .forEach()
 *  -  for..of loop
 */

const scores = [
  {
    id: 1,
    name: "raks",
  },
  {
    id: 2,
    name: "raju",
  },
  {
    id: 3,
    name: "mohan",
  },
  {
    id: 4,
    name: "sn",
  },
  {
    id: 5,
    name: "ks",
  },
];

for (const index in scores) {
  console.log(scores[index]);
}
for (const item of scores) {
  console.log(item);
}

// Example 2

const heros = ["Superman", "Batman"];

// for (const key in heros) {
//     console.log(key);
//     console.log(heros[key]);
// }

// for (const key of heros) {
//   console.log(key);
// }

heros.forEach((hero) => {
  console.log(hero);
});
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

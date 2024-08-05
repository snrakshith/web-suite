// Question 1
/**
 * Hint
 * Type cohersion takes place and string is converted to number
 */

console.log(5 > "15" < 5); // (5 > 15) => (false < 5) => 0 < 5 = true
console.log(7 < "15" < 5); // 7<15=> true<5=> 1<5 => true
console.log(7 < "85" > 5); //  7<85=> true>5=> 1>5 => false
// op: true,true,false

// Question 2

console.log(1);

setTimeout(() => {
  console.log(2);
}, 1000);

setTimeout(() => {
  console.log(3);
}, 0);

console.log(4);
// output sequence: 1 4 3 2

// Question 3

/**
 * Hint
 * Promises will have higher priorty than setTimeouts
 */
// console.log(1);

// setTimeout(() => {
//   console.log(2);
// }, 1000);

// setTimeout(() => {
//   console.log(3);
// }, 0);

// Promise.resolve(1).then(function resolve() {
//   setTimeout(() => {
//     console.log(4);
//   }, 0);
// });

// console.log(5);
// output sequence: 1 5 3 4 2

// Question 4
/**
 * Hint
 * Simple and logs the o/p
 */

// for (var i = 0; i < 5; i++) {
//   console.log(i);
// }
// for (let i = 0; i < 5; i++) {
//   console.log(i);
// }

// Question 5
/**
 * Hint
 * var is function scoped & let is block scoped
 */

// As i is function scoped the value of i would be 4 at the end of the iteration
for (var i = 0; i < 4; i++) {
  setTimeout(() => {
    console.log(i);
  }, 500);
}
// op 4 4 4 4

// As i is block scoped so for every iteration, there would be always a new value at setTimeout as its recreated
for (let i = 0; i < 4; i++) {
  setTimeout(() => {
    console.log(i);
  }, 7000);
}
// op 0 1 2 3

// In case of IIFE this also works like a block scoped funtion, so for every iteration, there would be always a new value at setTimeout as its recreated
for (var i = 0; i < 4; i++) {
  (function (i) {
    setTimeout(() => {
      console.log(i);
    }, 14000);
  })(i);
}
// op 0 1 2 3

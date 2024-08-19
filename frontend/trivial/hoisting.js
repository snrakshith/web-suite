// https://medium.com/@javvadirupasri8/decoding-javascript-hoisting-a-must-know-concept-for-interviews-c4e23438e93e

// Question 1

say();

// var say = function () {
//   console.log("hi");      // Output: say is not a function
// };

function say() {
  console.log("hi"); // Output: hi
}

// --------------------------

// Question 2

console.log(x); // Output: undefined
var x = 5;

// --------------------------

// Question 3
function greet() {
  console.log("Hello!");

  function sayName() {
    // Nested function declaration (hoisted)
    console.log("My name is John.");
  }

  sayName();
}

greet();

// https://medium.com/@javvadirupasri8/decoding-javascript-hoisting-a-must-know-concept-for-interviews-c4e23438e93e

// say();
var say = function () {
  console.log("hi");
};

// console.log(x); // Output: undefined
var x = 5;

function greet() {
  console.log("Hello!");

  function sayName() {
    // Nested function declaration (hoisted)
    console.log("My name is John.");
  }

  sayName();
}

greet();

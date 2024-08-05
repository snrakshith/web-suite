// Question 6
/**
 * Hint
 * When 2 arrays are conctenated then the arr content,
 * would be converted into string
 */

console.log(["a"] + ["b"]);
// a + b
// op: ab

console.log([] + []);
// "" + ""
// op: ""

/*
 * Hint:
 * Understand arrays are always stored by references, so it is True
 */
console.log(![]);
// true is negated, !true
// op: false

console.log(![] + []);
// ![] => false
// false + ""
// op: "false"

// Question 7
/**
 * Hint
 * Type cohersion take place btw
 * the 1st & 2nd element => result is compared with 3rd element
 */

console.log(3 < 4 < 5);
// (3 < 4) => (true < 5) => 1 < 5 = true

console.log(3 > 4 > 5);
// (3 > 4) => (false > 5) => 0 > 5 = false

console.log(3 > 4 > -1);
// (3 > 4) => (false > -1) => 0 > -1 = true

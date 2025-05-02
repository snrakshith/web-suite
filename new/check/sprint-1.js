// q1

const checkEvenOrOdd = (num) => (num % 2 === 0 ? "even" : "odd");
// console.log(checkEvenOrOdd(2));
// console.log(checkEvenOrOdd(3));

// q2
const isPrimeNumber = (num) => {
  if (num === 1) return false;
  if (num === 2) return true;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
};

// q3

const isLeapYear = (year) => {
  if (year % 4 === 0) {
    if (year % 100 === 0) {
      if (year % 400 === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } else {
    return false;
  }
};

// const isLeapYear = (year) => ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? "Leap Year" : "Not a Leap Year");
// console.log(isLeapYear(2020)); // Output: Leap Year




// q12


"aeiou".includes("a");
["a","e","k"].includes("a");



for (let i = 0; i < "aeiou".length; i++) {
  console.log("aeiou"[i]);
}





// q13

const reverseString = (str) => str.split("").reverse().join("");

// console.log("reverseString", reverseString("Javascript"));


// q14

const findLargestSmallest = (arr) => {
  let largest = Math.max(...arr);
  let smallest = Math.min(...arr);
  return {
    largest,
    smallest,
  };
};

// console.log("findLargestSmallest", findLargestSmallest([1, 2, 3, 4, 5]));

// q15

const sortOfArrayByAsc = (arr) => arr.sort((a, b) => a - b); // ascending
const sortOfArrayByDesc = (arr) => arr.sort((a, b) => b - a); // descending

// q16

const sumOfArray = (arr) => arr.reduce((acc, num) => acc + num, 0);

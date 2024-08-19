// fibonacii
// anagram
// flat array
const numArr = [1, 2, 3, 3];
// console.log([...new Set(nums)]);

function hasDuplicate(nums) {
  const numsSet = new Set();
  for (const num of nums) {
    if (numsSet.has(num)) return true;
    numsSet.add(num);
  }

  return false;
}
// console.log(hasDuplicate(numArr));

function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  let sval = s.split("").sort().join("");
  let tval = t.split("").sort().join("");
  return sval === tval ? true : false;
}
// console.log("isAnagarm", isAnagram("car", "rca"));

function twoSum(nums, target) {
  for (i = 1; i < nums.length; i++) {
    return nums[i] + nums[i + 1] === target;
  }
}
// console.log("twoSum", twoSum([1, 2, 4, 7], 9));

/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
  return s === +s.toString().split("").reverse().join("") ? true : false;
}
// console.log("isPalindrome", isPalindrome(121));

function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2; // 3 * 4 /2
  const actualSum = nums.reduce((sum, num) => sum + num, 0);
  return expectedSum - actualSum;
}
// console.log("missingNumber", missingNumber([0, 2, 3])); //6-6

// [1,2,3,4,5]
function plusOne(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2; // 3 * 4 /2
  const actualSum = nums.reduce((sum, num) => sum + num, 0);
  return expectedSum - actualSum;
}

function isNonCyclicalNumber(n) {
  const seen = new Set();

  for (; n !== 1 && !seen.has(n); ) {
    seen.add(n);
    n = sumOfSquares(n);
  }

  return n === 1;
}

function sumOfSquares(num) {
  let sum = 0;
  for (; num > 0; num = Math.floor(num / 10)) {
    let digit = num % 10;
    sum += digit * digit;
  }
  return sum;
}

// Test cases
let n = 9;
console.log(sumOfSquares(n)); // Output: true

n = 190;
console.log(isNonCyclicalNumber(n)); // Output: true

n = 20;
console.log(isNonCyclicalNumber(n)); // Output: false

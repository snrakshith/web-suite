https://www.greatfrontend.com/interviews/study/blind75/questions/algo/pair-sum

Here’s a solution for the **Pair Sum** problem in **JavaScript**, following the structured approach.

---

## Problem Explanation

### What is Pair Sum?

We are given an array `numbers` and a target sum `target`. We need to determine if there exists a pair of numbers in the array that adds up to `target`. If such a pair exists, return `true`, otherwise return `false`.

---

### Constraints

1. The array contains integers (positive, negative, or zero).
2. The length of the array can range from 2 to \(10^5\).
3. The solution must be efficient, ideally \(O(n)\).

---

## Plan

The best way to solve this problem efficiently is by using a **Hash Map**. Here's the step-by-step plan:

### Key Idea: Hash Map

1. Use a hash map (or object in JavaScript) to store numbers we've seen so far and their required complements to reach the target.
2. For each number in the array:
   - Check if its complement (i.e., `target - number`) is already in the hash map.
   - If found, return `true` (pair exists).
   - Otherwise, store the current number in the hash map.
3. If the loop completes and no pair is found, return `false`.

---

## Solution in JavaScript

```javascript
function hasPairWithSum(numbers, target) {
  const seen = new Set();

  for (const num of numbers) {
    const complement = target - num;

    // Check if complement exists in the set
    if (seen.has(complement)) {
      return true;
    }

    // Add the current number to the set
    seen.add(num);
  }

  // No pair found
  return false;
}

// Examples
console.log(hasPairWithSum([1, 2, 3, 4], 5)); // Output: true (1 + 4 or 2 + 3)
console.log(hasPairWithSum([1, 2, 3, 4], 8)); // Output: false (no pair sums to 8)
console.log(hasPairWithSum([-1, -2, -3, -4, 5], 1)); // Output: true (-1 + 2)
```

---

## Explanation of the Code

### Step-by-Step Process:

1. **Initialize a Set**:

   - The `seen` set will store all numbers we’ve processed so far.

2. **Iterate Through the Array**:

   - For each number, calculate its complement using `target - num`.
   - Check if the complement already exists in the `seen` set.
     - If yes, return `true`.
     - Otherwise, add the current number to the `seen` set.

3. **Return `false` if No Pair Found**:
   - If the loop completes without finding a pair, return `false`.

---

### Example Walkthrough

#### Input: `numbers = [1, 2, 3, 4]`, `target = 5`

1. **Initialize**: `seen = {}`.
2. Process `1`:
   - Complement: `5 - 1 = 4`.
   - `4` not in `seen`.
   - Add `1` to `seen`: `seen = {1}`.
3. Process `2`:
   - Complement: `5 - 2 = 3`.
   - `3` not in `seen`.
   - Add `2` to `seen`: `seen = {1, 2}`.
4. Process `3`:
   - Complement: `5 - 3 = 2`.
   - `2` is in `seen`.
   - **Output**: `true`.

#### Input: `numbers = [1, 2, 3, 4]`, `target = 8`

1. **Initialize**: `seen = {}`.
2. Process `1`: Add `1` to `seen`.
3. Process `2`: Add `2` to `seen`.
4. Process `3`: Add `3` to `seen`.
5. Process `4`: Add `4` to `seen`.
6. No complement found for any number. **Output**: `false`.

---

### Complexity Analysis

1. **Time Complexity**:

   - Each number is processed once, and set operations (add and lookup) are \(O(1)\).  
     Total time complexity: **\(O(n)\)**, where \(n\) is the length of the array.

2. **Space Complexity**:
   - In the worst case, we store all numbers in the `seen` set.  
     Total space complexity: **\(O(n)\)**.

---

### Additional Notes

This approach is optimal and handles both small and large inputs efficiently. If you need to return the actual pair instead of a boolean, you can modify the solution as follows:

```javascript
function findPairWithSum(numbers, target) {
  const seen = new Set();

  for (const num of numbers) {
    const complement = target - num;

    if (seen.has(complement)) {
      return [complement, num];
    }

    seen.add(num);
  }

  return null; // No pair found
}
```

This variant returns the actual pair `[complement, num]` or `null` if no pair exists.

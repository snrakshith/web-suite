## Problem Explanation

We are given an array `numbers` containing \( n \) distinct integers. The array is missing one number from the sequence \( 0 \) to \( n \). Our task is to find the missing number.

---

### Constraints and Assumptions

1. The integers in the array range from \( 0 \) to \( n \), where \( n \) is the length of the array plus one.
2. The array contains \( n \) integers, with one number missing.
3. The array does not have duplicates.

---

### Examples

#### Example 1:

- Input: `numbers = [3, 0, 1]`
- Output: `2`
- Explanation: The numbers should be `[0, 1, 2, 3]`. The missing number is `2`.

#### Example 2:

- Input: `numbers = [0, 1]`
- Output: `2`
- Explanation: The numbers should be `[0, 1, 2]`. The missing number is `2`.

#### Example 3:

- Input: `numbers = [9, 6, 4, 2, 3, 5, 7, 0, 1]`
- Output: `8`
- Explanation: The numbers should be `[0, 1, 2, ..., 9]`. The missing number is `8`.

---

## Solution in TypeScript

Here is the TypeScript implementation to solve the problem:

```typescript
function findMissingNumber(numbers: number[]): number {
  const n = numbers.length;

  // Calculate the expected sum of numbers from 0 to n
  const expectedSum = (n * (n + 1)) / 2;

  // Calculate the actual sum of the given array
  const actualSum = numbers.reduce((sum, num) => sum + num, 0);

  // The missing number is the difference between the expected and actual sums
  return expectedSum - actualSum;
}

// Examples
console.log(findMissingNumber([3, 0, 1])); // Output: 2
console.log(findMissingNumber([0, 1])); // Output: 2
console.log(findMissingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])); // Output: 8
```

---

### Step-by-Step Explanation

#### Key Idea: **Sum Formula**

The sequence \( 0 \) to \( n \) has a known sum formula:
\[
\text{Sum} = \frac{n \times (n + 1)}{2}
\]
Where \( n \) is the length of the array (not the largest number in it). By calculating this sum and subtracting the sum of the array, the difference will be the missing number.

---

#### Steps:

1. **Calculate the Expected Sum**:  
   Use the formula \( \text{Sum} = \frac{n \times (n + 1)}{2} \), where \( n \) is the length of the input array. This gives the sum of integers from \( 0 \) to \( n \).

2. **Calculate the Actual Sum**:  
   Use the `reduce` function to sum up all the numbers in the array.

3. **Find the Missing Number**:  
   Subtract the `actualSum` from the `expectedSum` to find the missing number.

---

### Example Walkthrough

#### Input: `numbers = [3, 0, 1]`

1. \( n = 3 \) (length of the array).
2. **Expected Sum**:  
   \[
   \text{Sum} = \frac{n \times (n + 1)}{2} = \frac{3 \times 4}{2} = 6
   \]

3. **Actual Sum**:  
   Sum of elements in `[3, 0, 1]` is:
   \[
   3 + 0 + 1 = 4
   \]

4. **Missing Number**:  
   \[
   \text{Missing Number} = \text{Expected Sum} - \text{Actual Sum} = 6 - 4 = 2
   \]

#### Output: `2`

---

### Complexity Analysis

1. **Time Complexity**:

   - Calculating the sum using `reduce` is \( O(n) \).
   - Calculating the expected sum is \( O(1) \).  
     Therefore, the total time complexity is **\( O(n) \)**.

2. **Space Complexity**:
   - We only use a few variables for calculations (`expectedSum`, `actualSum`).  
     Therefore, the space complexity is **\( O(1) \)**.

---

This approach is efficient and works well within the given constraints.

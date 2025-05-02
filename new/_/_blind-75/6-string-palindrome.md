https://www.greatfrontend.com/interviews/study/blind75/questions/algo/string-palindrome

Here’s a solution for the **String Palindrome** problem in **JavaScript**, following the structured approach.

---

## Problem Explanation

### What is a Palindrome?

A **palindrome** is a string that reads the same forward and backward. For example:

- `"racecar"` is a palindrome because reversing it results in the same string.
- `"hello"` is not a palindrome because reversing it gives `"olleh"`, which is different.

---

### Constraints

1. The input string may contain letters, numbers, and other characters.
2. We only consider **alphanumeric** characters and ignore cases (e.g., `"A man, a plan, a canal: Panama"` is a palindrome).
3. The string length can range from 1 to \(10^5\).

---

## Plan

We’ll use the **two-pointer technique** for efficient palindrome checking.

### Key Idea: Two Pointers

1. Use two pointers: one starting at the beginning of the string and the other at the end.
2. Move the pointers toward each other while:
   - Ignoring non-alphanumeric characters.
   - Comparing lowercase versions of characters.
3. If all characters match, the string is a palindrome.

---

## Solution in JavaScript

```javascript
function isPalindrome(s) {
  // Helper function to check if a character is alphanumeric
  const isAlphanumeric = (char) => /^[a-zA-Z0-9]$/.test(char);

  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Move left pointer to the next alphanumeric character
    while (left < right && !isAlphanumeric(s[left])) {
      left++;
    }
    // Move right pointer to the previous alphanumeric character
    while (left < right && !isAlphanumeric(s[right])) {
      right--;
    }

    // Compare the characters (case insensitive)
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    // Move both pointers inward
    left++;
    right--;
  }

  return true;
}

// Examples
console.log(isPalindrome("A man, a plan, a canal: Panama")); // Output: true
console.log(isPalindrome("race a car")); // Output: false
console.log(isPalindrome(" ")); // Output: true (empty or space-only string is a palindrome)
```

---

## Explanation of the Code

### Step-by-Step Process:

1. **Ignore Non-Alphanumeric Characters**:

   - Use a helper function `isAlphanumeric` to check if a character is a letter or a digit.
   - Skip non-alphanumeric characters using the `while` loops.

2. **Compare Characters**:

   - Use `toLowerCase()` to perform case-insensitive comparisons.
   - If characters don’t match, return `false`.

3. **Move Pointers**:

   - Increment `left` and decrement `right` to process the next characters.

4. **Return `true`**:
   - If all characters match and the pointers cross each other, the string is a palindrome.

---

### Example Walkthrough

#### Input: `"A man, a plan, a canal: Panama"`

1. **Remove Non-Alphanumeric Characters**: `"AmanaplanacanalPanama"`.
2. **Ignore Case**: `"amanaplanacanalpanama"`.
3. Two pointers start at the first and last characters:
   - Compare `'a'` and `'a'`: Match.
   - Compare `'m'` and `'m'`: Match.
   - Continue until the pointers cross.
4. **Output**: `true`.

#### Input: `"race a car"`

1. **Remove Non-Alphanumeric Characters**: `"raceacar"`.
2. Two pointers start at the first and last characters:
   - Compare `'r'` and `'r'`: Match.
   - Compare `'a'` and `'a'`: Match.
   - Compare `'c'` and `'e'`: Mismatch.
3. **Output**: `false`.

#### Input: `" "`

1. **Remove Non-Alphanumeric Characters**: Empty string.
2. **Output**: `true` (Empty or space-only strings are palindromes).

---

### Complexity Analysis

1. **Time Complexity**:

   - Each character is processed at most twice (once by each pointer).  
     Total time complexity: **\(O(n)\)**, where \(n\) is the length of the string.

2. **Space Complexity**:
   - Only a few variables are used; no extra space is needed.  
     Total space complexity: **\(O(1)\)**.

---

### Additional Notes

This approach is optimal and works well for strings with mixed characters and large inputs.

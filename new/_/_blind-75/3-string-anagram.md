To solve the **String Anagram** problem in TypeScript, we need to determine if two given strings are anagrams. Let’s go step-by-step.

---

## Problem Explanation

### What is an Anagram?

An anagram is a word formed by rearranging the letters of another word:

- **All characters** from the original word must appear in the anagram.
- **Character frequencies** in both words must be identical.

For example:

- "listen" and "silent" are anagrams (same characters with same frequencies).
- "hello" and "bello" are not anagrams (different characters).

---

### Constraints

1. Both strings only contain lowercase English letters.
2. Lengths of the strings can range from 1 to 1000.

---

## Plan

We need to check if two strings are anagrams. Two approaches can be used:

1. **Sort and Compare** (Straightforward but slightly slower due to sorting).
2. **Frequency Count** (More efficient for larger strings).

We'll implement the **Frequency Count** approach for better performance.

---

## Solution in TypeScript

```typescript
function areAnagrams(str1: string, str2: string): boolean {
  // If the lengths are different, they cannot be anagrams
  if (str1.length !== str2.length) {
    return false;
  }

  // Create frequency maps for both strings
  const charCount: Record<string, number> = {};

  // Count characters in the first string
  for (const char of str1) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Decrease counts based on the second string
  for (const char of str2) {
    if (!charCount[char]) {
      return false; // Character not found or mismatched count
    }
    charCount[char]--;
  }

  // Check if all counts are zero
  for (const count of Object.values(charCount)) {
    if (count !== 0) {
      return false;
    }
  }

  return true;
}

// Examples
console.log(areAnagrams("abcd", "dcba")); // Output: true
console.log(areAnagrams("hello", "bello")); // Output: false
console.log(areAnagrams("listen", "silent")); // Output: true
```

---

## Explanation of the Code

1. **Length Check**:

   - If the lengths of `str1` and `str2` are not equal, they cannot be anagrams.

2. **Character Frequency Count**:

   - Use a frequency map (`charCount`) to count the occurrences of each character in `str1`.
   - For each character in `str2`, decrement its count in `charCount`. If any character is missing or its count goes below 0, the strings are not anagrams.

3. **Final Check**:
   - After processing both strings, ensure all counts in `charCount` are zero. If any count is non-zero, the strings are not anagrams.

---

### Example Walkthrough

#### Input: `str1 = "abcd"`, `str2 = "dcba"`

1. **Length Check**: Both strings are of length 4.
2. **Frequency Count for `str1`**:
   - `charCount = { a: 1, b: 1, c: 1, d: 1 }`
3. **Processing `str2`**:
   - Decrement `d`: `charCount = { a: 1, b: 1, c: 1, d: 0 }`
   - Decrement `c`: `charCount = { a: 1, b: 1, c: 0, d: 0 }`
   - Decrement `b`: `charCount = { a: 1, b: 0, c: 0, d: 0 }`
   - Decrement `a`: `charCount = { a: 0, b: 0, c: 0, d: 0 }`
4. **Final Check**: All counts are zero. Strings are anagrams.
5. **Output**: `true`.

#### Input: `str1 = "hello"`, `str2 = "bello"`

1. **Length Check**: Both strings are of length 5.
2. **Frequency Count for `str1`**:
   - `charCount = { h: 1, e: 1, l: 2, o: 1 }`
3. **Processing `str2`**:
   - Decrement `b`: `charCount = { h: 1, e: 1, l: 2, o: 1, b: -1 }` (character mismatch).
4. **Output**: `false`.

---

### Complexity Analysis

1. **Time Complexity**:

   - Counting characters for `str1` and processing `str2` both take \( O(n) \), where \( n \) is the length of the strings.  
     Total: \( O(n) \).

2. **Space Complexity**:
   - The frequency map uses at most \( O(26) = O(1) \) space for lowercase English letters.

Thus, the solution is efficient and optimal.

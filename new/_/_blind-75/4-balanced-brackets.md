Here’s a solution for the **Balanced Brackets** problem in **JavaScript**, following the same structured approach as before.

---

## Problem Explanation

### What are Balanced Brackets?

A string is considered "balanced" if:

1. Each opening bracket `(`, `{`, `[` has a corresponding closing bracket `)`, `}`, `]`.
2. Brackets close in the correct order (e.g., `([])` is valid, but `([)]` is not).

---

### Constraints

1. The string contains only these characters: `(`, `)`, `{`, `}`, `[`, `]`.
2. The length of the string is between 1 and 1000.

---

## Plan

To check if a string is balanced, we can use a **stack-based approach**.

### Key Idea: Stack

1. Use a **stack** to keep track of opening brackets.
2. For every closing bracket, check if it matches the last opening bracket (top of the stack).
3. If it matches, pop the stack. Otherwise, the string is unbalanced.

---

## Solution in JavaScript

```javascript
function isBalancedBrackets(str) {
  const stack = [];
  const bracketPairs = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  for (const char of str) {
    // If it's an opening bracket, push it onto the stack
    if (char === "(" || char === "{" || char === "[") {
      stack.push(char);
    }
    // If it's a closing bracket
    else if (char === ")" || char === "}" || char === "]") {
      // Check if the stack is empty or the top doesn't match
      if (stack.length === 0 || stack.pop() !== bracketPairs[char]) {
        return false;
      }
    }
  }

  // If the stack is empty, all brackets were matched
  return stack.length === 0;
}

// Examples
console.log(isBalancedBrackets("[]")); // Output: true
console.log(isBalancedBrackets("([)]")); // Output: false
console.log(isBalancedBrackets("([]){}")); // Output: true
```

---

## Explanation of the Code

### Step-by-Step Process:

1. **Stack Initialization**:

   - Use a `stack` (array) to keep track of opening brackets.

2. **Bracket Pairs**:

   - Use an object `bracketPairs` to map closing brackets to their corresponding opening brackets.

3. **Iterate Over Characters**:

   - If the character is an **opening bracket**, push it onto the `stack`.
   - If the character is a **closing bracket**:
     - Check if the stack is empty (unmatched closing bracket).
     - Check if the top of the stack matches the current closing bracket. If not, return `false`.

4. **Final Check**:
   - After processing all characters, if the `stack` is not empty, there are unmatched opening brackets.

---

### Example Walkthrough

#### Input: `"([]){}"`

1. **Stack**: Initialize as `[]`.
2. Process `(`: Push onto the stack → `stack = ['(']`.
3. Process `[`: Push onto the stack → `stack = ['(', '[']`.
4. Process `]`: Matches top of stack → Pop `[` → `stack = ['(']`.
5. Process `)`: Matches top of stack → Pop `(` → `stack = []`.
6. Process `{`: Push onto the stack → `stack = ['{']`.
7. Process `}`: Matches top of stack → Pop `{` → `stack = []`.
8. Final check: `stack` is empty. **Output**: `true`.

#### Input: `"([)]"`

1. **Stack**: Initialize as `[]`.
2. Process `(`: Push onto the stack → `stack = ['(']`.
3. Process `[`: Push onto the stack → `stack = ['(', '[']`.
4. Process `)`: Does not match top of stack (`[` ≠ `)`) → **Output**: `false`.

---

### Complexity Analysis

1. **Time Complexity**:

   - Each character is processed once, with each stack operation taking \( O(1) \).  
     Total time complexity: \( O(n) \), where \( n \) is the length of the string.

2. **Space Complexity**:
   - The stack can grow to hold all opening brackets in the worst case.  
     Total space complexity: \( O(n) \).

---

This approach efficiently determines whether a string of brackets is balanced!

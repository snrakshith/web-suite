Here’s a solution to the problem in TypeScript:

```typescript
function containsDuplicates(numbers: number[]): boolean {
  const seen = new Set<number>();

  for (const num of numbers) {
    if (seen.has(num)) {
      return true; // Duplicate found
    }
    seen.add(num);
  }

  return false; // No duplicates
}

// Examples
console.log(containsDuplicates([5, 7, 1, 3])); // Output: false
console.log(containsDuplicates([10, 7, 0, 0, 9])); // Output: true
console.log(containsDuplicates([3, 2, 6, 5, 0, 3, 10, 3, 10, 5])); // Output: true
```

### Explanation:

1. **`Set` for Uniqueness**:  
   A `Set` is used to track elements seen so far because it ensures unique entries.

2. **Iterate Through the Array**:  
   For each number in the array:

   - If it's already in the `Set`, return `true` because a duplicate is found.
   - Otherwise, add the number to the `Set`.

3. **Return Result**:  
   If no duplicates are found by the end of the loop, return `false`.

### Complexity:

- **Time Complexity**:  
  O(n), where `n` is the length of the array. Each insertion or lookup in a `Set` is O(1) on average.
- **Space Complexity**:  
  O(n) for storing the elements in the `Set`.

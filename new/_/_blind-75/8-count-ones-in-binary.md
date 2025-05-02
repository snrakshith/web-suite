https://www.greatfrontend.com/interviews/study/blind75/questions/algo/count-ones-in-binary

Sure! Here's the solution to the "Count Set Bits in a Binary Number" problem implemented in JavaScript.

### Solution in JavaScript:

We can use **Brian Kernighan's Algorithm** (same as in the Python solution) to efficiently count the number of set bits (1's) in the binary representation of a number.

### JavaScript Code:

```javascript
function hammingWeight(num) {
  let count = 0; // Variable to store the count of set bits (1s)

  // Loop until num becomes 0
  while (num !== 0) {
    // Perform bitwise AND with (num - 1) to turn off the rightmost set bit
    num &= num - 1;
    count++; // Increment the set bit counter
  }

  return count; // Return the total count of set bits
}
```

### Explanation of the Code:

1. **`let count = 0;`**: We initialize a variable `count` to keep track of the number of set bits (1's) in the binary representation of `num`.
2. **`while (num !== 0)`**: We keep looping until `num` becomes 0. In each iteration, we remove the rightmost set bit from `num`.
3. **`num &= (num - 1);`**: This operation removes the rightmost set bit from `num`. This works because `num - 1` flips all the bits to the right of the rightmost set bit, and the bitwise AND with `num` leaves us with a number that has one fewer set bit.
4. **`count++;`**: Every time we remove a set bit, we increment the `count`.
5. **`return count;`**: Once all bits are processed, the function returns the final count of set bits.

### Example Usage:

#### Example 1:

```javascript
let num = 8;
console.log(hammingWeight(num)); // Output: 1
```

- Binary of 8: `1000` (1 set bit)
- Output: `1`

#### Example 2:

```javascript
let num = 9;
console.log(hammingWeight(num)); // Output: 2
```

- Binary of 9: `1001` (2 set bits)
- Output: `2`

#### Example 3:

```javascript
let num = 123;
console.log(hammingWeight(num)); // Output: 6
```

- Binary of 123: `1111011` (6 set bits)
- Output: `6`

#### Edge Case:

```javascript
let num = 1;
console.log(hammingWeight(num)); // Output: 1
```

- Binary of 1: `1` (1 set bit)
- Output: `1`

### Time Complexity:

- The algorithm runs in **O(k)** time, where `k` is the number of set bits in the binary representation of `num`. This is because in each iteration of the loop, we remove one set bit from `num`.

### Conclusion:

This JavaScript solution efficiently counts the number of set bits in the binary representation of a number using bitwise operations, specifically leveraging Brian Kernighan's algorithm. It avoids unnecessary iteration through every bit and works in linear time with respect to the number of set bits.

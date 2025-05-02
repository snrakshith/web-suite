# Patterns

# Two pointers

- Maintain 2 pointers
- sorted array
- find pair of elements that match a criteria

# Prefix sum

- Its a pre-processing step
- creates a new array where each element at index `i` represents the sum of the array from the start up to `i`.
- used to perform multiple sum queries on a subarray
- when we, need to calculate cumulative sums

# Sliding Window

- It is used to find subarrays or substrings that satisifies a specific condition.
- It optimises the time complexity by maintaining a window of elements.
- Used when dealing with problems involving contiguous subarrays or substrings.

# Monotonic Stack

- It uses stack.
- Elements are stored in a sequence `ie., a specific order (increasing/decreasing)`

# Fast & Slow Pointers

- Used to detect cycles in a linked list or similar structures.
- Initialise 2 pointers
  - 1 moves 1 step at a time (slow)
  - 1 moves 2 step at a time (fast)
- If there is a cycle faster pointer will meet the slow pointer
- If the fast pointer reaches the end of the list, then there is no cycle.

# Overlapping Intervals

# Linkedlist In place

# Top K elements

# Modified Binary Search

# Binary Tree Traversal

# DFS

# BFS

# Matrix Traversal

# Backtracking

# Dynamic Programming

- Fibonacci Sequence `imp`
- Kadane's Algorithm
- 0/1 Knapsack `imp`
- Unbounded Knapsack
- LCS `imp`
- LIS `imp`
- Palindrome Subsequence
- Edit distance
- Subset sum `imp`
- String pattern
- Catalan Numbers
- Count distict ways
- DP

  - on Grid
  - on Tree
  - on Graphs

- Digit DP
- Bitmasking DP
- Probablity DP
- State Machine

---

### Repos to refer:

- FrontendFreaks/DSA-in-Javascript
- thepranaygupta/Data-Structure-and-Algorithms
- AkashSingh3031/The-Complete-FAANG-Preperation

---

- Maximum Subarray (adding )

  - Now, let's find the biggest number you can get by adding up a group of numbers
    that are next to each other.

- Maximum Product Subarray (multiplication)
  - Imagine you have a bunch of numbers lined up in a row. You want to find the biggest number
    you can get by multiplying a group of these numbers that are next to each other.

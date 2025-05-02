https://www.greatfrontend.com/interviews/study/blind75/questions/algo/intervals-meeting-calendar

Here’s a solution for the **Meeting Calendar** problem in **JavaScript**, following the structured approach.

---

## Problem Explanation

### Problem Statement:

You are given an array of meeting time intervals `intervals`, where each interval is represented as `[start, end]` (both inclusive). Determine the **minimum number of meeting rooms** required to accommodate all the meetings.

### Examples:

1. **Input**: `[[0, 30], [5, 10], [15, 20]]`  
   **Output**: `2`  
   Explanation: At least two meetings overlap between times `[5, 10]` and `[15, 20]`.

2. **Input**: `[[7, 10], [2, 4]]`  
   **Output**: `1`  
   Explanation: No meetings overlap.

---

### Constraints:

1. \(1 \leq \text{intervals.length} \leq 10^4\)
2. \(0 \leq \text{interval[i][0]} < \text{interval[i][1]} \leq 10^6\)

---

## Plan

To solve the problem efficiently:

1. Sort the intervals based on start times.
2. Use a **min-heap** (priority queue) to track the end times of ongoing meetings.
3. For each interval:
   - If the meeting can start after the earliest meeting ends (heap top), remove the top.
   - Add the current meeting's end time to the heap.
4. The size of the heap at the end will represent the **minimum number of rooms required**.

---

## Solution in JavaScript

```javascript
function minMeetingRooms(intervals) {
  if (intervals.length === 0) return 0;

  // Step 1: Sort intervals by start time
  intervals.sort((a, b) => a[0] - b[0]);

  // Min-heap to track end times of meetings
  const heap = [];

  for (const [start, end] of intervals) {
    // If the meeting can reuse a room, remove the earliest meeting from the heap
    if (heap.length > 0 && heap[0] <= start) {
      heap.shift();
    }

    // Add the current meeting's end time to the heap
    heap.push(end);

    // Maintain heap property by sorting
    heap.sort((a, b) => a - b);
  }

  // The size of the heap is the number of meeting rooms required
  return heap.length;
}

// Examples
console.log(
  minMeetingRooms([
    [0, 30],
    [5, 10],
    [15, 20],
  ])
); // Output: 2
console.log(
  minMeetingRooms([
    [7, 10],
    [2, 4],
  ])
); // Output: 1
console.log(
  minMeetingRooms([
    [1, 5],
    [2, 6],
    [3, 7],
  ])
); // Output: 3
```

---

## Explanation of the Code

### Step-by-Step Process:

1. **Sort by Start Time**:

   - Sort all intervals based on their start times, ensuring we process meetings in chronological order.

2. **Min-Heap for End Times**:

   - Use a heap to store the end times of ongoing meetings.
   - The smallest end time in the heap allows us to check which room becomes available first.

3. **Iterate Through Meetings**:

   - For each meeting:
     - If its start time is greater than or equal to the smallest end time in the heap, remove the smallest end time (room becomes free).
     - Add the current meeting's end time to the heap.

4. **Heap Size**:
   - The size of the heap represents the number of rooms needed at any point.

---

### Example Walkthrough

#### Input: `[[0, 30], [5, 10], [15, 20]]`

1. **Sort**: `[[0, 30], [5, 10], [15, 20]]`.
2. Process `0 -> 30`:
   - Add `30` to the heap → `heap = [30]`.
3. Process `5 -> 10`:
   - `5 < 30` → Add `10` to the heap → `heap = [10, 30]`.
4. Process `15 -> 20`:
   - `15 >= 10` → Remove `10` from heap → Add `20` → `heap = [20, 30]`.
5. Final Heap Size: `2`.

#### Output: `2`

---

### Complexity Analysis

1. **Time Complexity**:

   - Sorting intervals: \(O(n \log n)\).
   - Heap operations for \(n\) intervals:
     - Insertions: \(O(n \log n)\).
     - Removals: \(O(n \log n)\).  
       Total time complexity: \(O(n \log n)\).

2. **Space Complexity**:
   - Heap storage: \(O(n)\).
     Total space complexity: \(O(n)\).

---

### Optimized Variant

To make the heap operations faster, use a proper **priority queue** implementation (e.g., `MinHeap`). Here's how you can simplify it using two separate arrays for start and end times:

---

## Optimized Code Variant

```javascript
function minMeetingRooms(intervals) {
  if (intervals.length === 0) return 0;

  const starts = intervals.map(([start]) => start).sort((a, b) => a - b);
  const ends = intervals.map(([, end]) => end).sort((a, b) => a - b);

  let rooms = 0;
  let endIndex = 0;

  for (const start of starts) {
    // If the meeting can reuse a room
    if (start >= ends[endIndex]) {
      endIndex++;
    } else {
      rooms++;
    }
  }

  return rooms;
}

// Examples
console.log(
  minMeetingRooms([
    [0, 30],
    [5, 10],
    [15, 20],
  ])
); // Output: 2
console.log(
  minMeetingRooms([
    [7, 10],
    [2, 4],
  ])
); // Output: 1
console.log(
  minMeetingRooms([
    [1, 5],
    [2, 6],
    [3, 7],
  ])
); // Output: 3
```

---

### Optimized Walkthrough

#### Input: `[[0, 30], [5, 10], [15, 20]]`

1. **Sort Start and End Times**:
   - Starts: `[0, 5, 15]`.
   - Ends: `[10, 20, 30]`.
2. Compare `start` vs. `end`:
   - `0 < 10`: Add a room → `rooms = 1`.
   - `5 < 10`: Add a room → `rooms = 2`.
   - `15 >= 10`: Free a room → Move `endIndex` → `endIndex = 1`.
   - `15 < 20`: Add a room → `rooms = 2`.
3. Final Rooms: `2`.

---

### Complexity of Optimized Variant

1. **Time Complexity**:

   - Sorting start and end arrays: \(O(n \log n)\).
   - Comparing arrays: \(O(n)\).  
     Total time complexity: \(O(n \log n)\).

2. **Space Complexity**:
   - Two arrays for start and end times: \(O(n)\).
     Total space complexity: \(O(n)\).

---

This approach is efficient, simple, and suitable for large inputs.

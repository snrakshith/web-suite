const ar = [1, 2, 3, 4, 5];

// Focus on the last element
ar.push(8); // adds
ar.pop(8); // removes

// Focus on the 1st element
ar.unshift(8); // adds
ar.shift(8); // removes
// ar.peek(8); // removes

// Returns a new array of the specified portion
// Doesn't mutates the original array
// ar.slice(startIndex,endIndex); => endIndex is excluded
ar.slice();

// Does add or remove an element
// Mutates the original array
// ar.splice(startIndex,deleteCount,args); => endIndex is excluded
// Ex: ar.splice(0, 2, "a");
// Inside array it starts at 0 index then deletes 2 items returns the new array
// then adds "a" to the original array
ar.splice(0, 2, "a");

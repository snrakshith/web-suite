function bubbleSort(items) {
  const length = items.length;
  //   console.log("length", length);
  for (let i = length - 1; i > 0; i--) {
    console.log("length", i);
    // Number of passes
    for (let j = length - i; j > 0; j--) {
      console.log("length-j", j);
      // Compare the adjacent positions
      if (items[j] < items[j - 1]) {
        // Swap the numbers
        const tmp = items[j];
        items[j] = items[j - 1];
        items[j - 1] = tmp;
      }
    }
  }
}

var ar = [5, 6, 7, 8, 1, 2, 12, 14];
// Array before Sort
// console.log("-----before sorting-----");
// console.log(ar);
bubbleSort(ar);
// Array after sort
// console.log("-----after sorting-----");
// console.log(ar);

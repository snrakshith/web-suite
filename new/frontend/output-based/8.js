// Question 8
/**
 * Hint
 *
 */

const x1 = new Promise((res, req) => {
  setTimeout(res, 500, "one");
});

const x2 = new Promise((res, req) => {
  setTimeout(res, 500, "two");
});

Promise.all([x1, x2]).then((res) => {
  console.log(res);
});

Promise.race([x1, x2]).then((res) => {
  console.log(res);
});

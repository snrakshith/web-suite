function t1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("t1 sucessfull");
    }, 1500);
  });
}

function t2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("t2 is failed");
    }, 500);
  });
}

function t3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("t3 sucessfull");
    }, 300);
  });
}

/**
 * Any promise which exectued 1st, irrespective weather it gets resolved or rejected.
 * that result is returned first
 * Ex: Promise.any([t1(), t2(), t3()]) // op: "t3 success" as it gets 1st exectuted
 * as t3 is exectued in 300ms
 */

Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    // We will do 2 validations

    // 1 check if promises is an Array are not
    if (!Array.isArray(promises)) {
      reject(new Error("undefined is not iterable"));
      return;
    }

    // 2nd check if promises array is empty, we need to resolve
    const length = promises.length;
    if (length === 0) {
      resolve();
      return;
    }

    promises.forEach((promise) => {
      return Promise.resolve(promise).then(resolve).catch(reject);
    });
  });
};

Promise.any([t1(), t2(), t3()])
  .then((res) => console.log("promise", res)) // ["res1","res2"]
  .catch((err) => console.log("Error", err));

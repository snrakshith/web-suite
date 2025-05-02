function t1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("t1 sucessfull");
    }, 500);
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
    }, 500);
  });
}

/**
 * It any promise gets resolved it returns it immedatly.
 * Ex: Promise.any([t1(), t2(), t3()]) // op: "t1 success" other promises are skipped
 * Ex: Promise.any([t3(), t1(), t2()]) // op: "t3 success" other promises are skipped
 * Ex: Promise.any([t1(), t3(), t2()]) // op: "t1 success" other promises are skipped
 * Ex: Promise.any([t2(), t3(), t1()]) // op: "t3 success" other promises are skipped
 * Ex: Promise.any([t2(), t2(), t2()]) // op: "All promises failed"
 */

Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    // We will do 2 validations

    // 1 check if promises is an Array are not
    if (!Array.isArray(promises)) {
      reject(new Error("undefined is not iterable"));
      return;
    }

    // As we need to return the output in array format
    const errors = [];

    // 2nd check if promises array is empty, we need to resolve
    const length = promises.length;
    if (length === 0) {
      reject({
        message: "empty promises passed",
        errors,
      });
      return;
    }

    promises.forEach(async (promise, index) => {
      try {
        const resp = await promise;
        resolve(resp);
        return;
      } catch (err) {
        errors[index] = err;
        if (index === length - 1) {
          reject({
            message: "All promises failed",
            errors,
          });
        }
      }
    });
  });
};

Promise.any([t1(), t2(), t3()])
  .then((res) => console.log("promise", res)) // op: "t1 sucessfull"
  .catch((err) => console.log("Error", err));

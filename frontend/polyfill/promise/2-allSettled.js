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
Promise.myAllSettled = function (promises) {
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
      resolve({
        status: "fulfilled",
        value: "",
      });
      return;
    }

    // As we need to return the output in array format
    const results = [];
    promises.forEach(async (promise, index) => {
      try {
        const resp = await promise;
        const obj = { status: "fulfiled", value: resp };
        results[index] = obj;
        // 2===2
        if (index === length - 1) {
          resolve(results);
          return;
        }
      } catch (err) {
        const obj = { status: "rejected", reason: err }; // "t2 failed"
        results[index] = obj;
        if (index === length - 1) {
          resolve(results);
          return;
        }
      }
    });
  });
};

Promise.allSettled([t1(), t2(), t3()])
  .then((res) => console.log("promise", res)) // ["res1","res2"]
  .catch((err) => console.log("Error", err));

/**
 * It allways gets resolved into an arrary of objects
 * with status & value fields
 * Ex: [
 * {status: "fulfiled",value:"t1 sucessfull"},
 * {status: "rejected",reason:"t2 failed"},
 * {status: "fulfiled",value:"t3 sucessfull"},
 * ]
 */

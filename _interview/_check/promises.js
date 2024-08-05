const promises = [
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.reject(new Error("Error occurred")),
  Promise.resolve(3),
];

Promise.allSettled(promises)
  .then((results) => {
    results.forEach((result) => {
      if (result.status === "fulfilled") {
        console.log(`Promise fulfilled with value: ${result.value}`);
      } else {
        console.log(`Promise rejected with error: ${result.value.message}`);
      }
    });
  })
  .catch((error) => console.error(error));

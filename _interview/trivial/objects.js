const obj = {
  name: "Raju",
  age: 15,
};

// keys
// console.log("keys", Object.keys(obj));

// values
// console.log("values", Object.values(obj));

for (const keys in obj) {
  console.log(keys, obj[keys]);
}

for (const [keys, values] of Object.entries(obj)) {
  console.log(keys, values);
}

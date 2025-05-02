### Arrays

```js
const k = [1, [2, [3]], 4, "h"];
const a = [
  {
    name: "raju",
    age: 5,
    hobbies: ["singing", "play"],
  },
  {
    name: "raj",
    age: 15,
    hobbies: ["dancing", "play"],
  },
  {
    name: "sn",
    age: 27,
    hobbies: ["sleeping"],
  },
];

// console.log(a.flatMap((item) => item.hobbies));
// console.log(k.flat(2));

// Remove duplicate values in array
const arr = [1, 3, 7, 9, 7, 8, 1, 19];
// console.log([...new Set(arr)]);

// Sort values in array
const unordedArr = [1, 3, 7, 9, 7, 8, 1, 19];
// console.log(unordedArr?.sort((a, b) => a - b));

// Slice & splice values in array
const transformArr = [1, 3, 7, 9, 7, 8, 5, 19];
// console.log(transformArr?.shift());
console.log(transformArr.unshift(11));
console.log(transformArr);
// console.log(transformArr.slice(0, 5));
// console.log(transformArr.splice(0, 5));
```

### Everything takes in a function

- filter()
- map()
- find()
- forEach() `doesn't return anything`
- some() `returns boolean`
- every() `checks for every items in a list`
- reduce() `takes 2 arguments`

### Other array methods

- flat()
- flatMap()

### pop vs push vs shift vs unshift

```js
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
ar.slice(0, 1); // op [1]
ar.slice(0, 4); // op [ 1, 2, 3, 4 ]

// Does add or remove an element
// Mutates the original array
// ar.splice(startIndex,deleteCount,args); => endIndex is excluded
// Ex: ar.splice(0, 2, "a");
// Inside array it starts at 0 index then deletes 2 items returns the new array
// then adds "a" to the original array
ar.splice(0, 2, "a");
// op : [ 1, 2 ]
```

### Different date formats

```js
const date = new Date();
// console.log(date.toISOString());

const dateOfJoining = new Date(doctorDetails?.createdAt);
dateOfJoining?.toDateString();

{
  item?.expiry ? dayjs(new Date(item?.expiry)).format("DD MMM,YYYY") : "--";
}

{
  dayjs(ele?.payments?.receivedDate).format("DD MMM, YYYY");
}

{
  dayjs(new Date(apiData?.data?.data?.grn?.createdAt)).format("DD MMM,YYYY");
} // op: 23 Jul,2025

grn?.expiryDate?.toLocaleDateString();
```

### setTimeout & setInterval functions

```js
// setTimeout example / executes only once
setTimeout(function () {
  console.log("This code will be executed once after a 2 second delay.");
}, 2000);

// setInterval example / keeps repeating
setInterval(function () {
  console.log("This code will be executed every 1 second.");
}, 1000);
```

### OOPS

```js
class User {
  constructor(name) {
    this.name = name;
  }

  logMe() {
    console.log(`Username${this.name}`);
  }
}

// const us = new User("raju");
// us.logMe();
class Admin extends User {
  constructor(name, email) {
    super(name);
    this.email = email;
  }

  static generateId() {
    console.log(`Emial id${this.email}`);
  }
}

const us = new Admin("raju", "sn.86@gmial.com");
us.logMe();
// us.generateId();
```

### Promises

```js
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
```

### this

```js
const person = {
  firstName: "John",
  lastName: "Doe",
  id: 5566,
  getThis: function () {
    return this;
  },
};

console.log("this in object method", person.getThis());
```

### hoisting

```js
// https://medium.com/@javvadirupasri8/decoding-javascript-hoisting-a-must-know-concept-for-interviews-c4e23438e93e

// Question 1

say();

// var say = function () {
//   console.log("hi");      // Output: say is not a function
// };

function say() {
  console.log("hi"); // Output: hi
}

// --------------------------

// Question 2

console.log(x); // Output: undefined
var x = 5;

// --------------------------

// Question 3
function greet() {
  console.log("Hello!");

  function sayName() {
    // Nested function declaration (hoisted)
    console.log("My name is John.");
  }

  sayName();
}

greet();
```

---

## find & filter methods

In JavaScript, both `find` and `filter` are array methods used to search for elements. However, they differ in functionality, return values, and use cases. Let's break it down:

### **1. `find`**

- **Purpose**: Used to find the **first** element in an array that satisfies a given condition.
- **Return Value**: Returns a **single element** (the first matching element) or `undefined` if no match is found.
- **Stops Iteration**: Stops searching once it finds the first match.
- **Use Case**: When you need just one matching element.

**Example:**

```javascript
const numbers = [1, 2, 3, 4, 5];

// Find the first number greater than 3
const result = numbers.find((num) => num > 3);
console.log(result); // Output: 4
```

---

### **2. `filter`**

- **Purpose**: Used to find **all** elements in an array that satisfy a given condition.
- **Return Value**: Returns a **new array** containing all matching elements. If no matches are found, it returns an empty array.
- **Iterates Fully**: Goes through the entire array to find all matches.
- **Use Case**: When you need multiple matching elements.

**Example:**

```javascript
const numbers = [1, 2, 3, 4, 5];

// Find all numbers greater than 3
const result = numbers.filter((num) => num > 3);
console.log(result); // Output: [4, 5]
```

---

### **Key Differences**

| Feature             | `find`                              | `filter`                   |
| ------------------- | ----------------------------------- | -------------------------- |
| **Output**          | Single element or `undefined`       | Array of matching elements |
| **Stops Iteration** | Yes (after finding the first match) | No (checks all elements)   |
| **Use Case**        | When you need the first match only  | When you need all matches  |

---

### **Similarities**

1. Both are **higher-order functions** that take a callback function as an argument.
2. Both return based on the condition specified in the callback function.
3. They **do not mutate** the original array.

---

### **Example Comparing Both**

```javascript
const numbers = [1, 2, 3, 4, 5];

// Using find
const firstGreaterThan3 = numbers.find((num) => num > 3);
console.log(firstGreaterThan3); // Output: 4

// Using filter
const allGreaterThan3 = numbers.filter((num) => num > 3);
console.log(allGreaterThan3); // Output: [4, 5]
```

In summary:

- Use `find` for **finding one** specific element.
- Use `filter` for **finding many** matching elements.

---

- var => function scoped
- let, const => block scoped
- fetch().then().catch()

### DOM

- Selecting the element
  - getElementById() vs getElementByTagName()
  - querySelector() vs querySelectorAll()
- Styling the DOM element
- Creating a new DOM element using createElement()
- Set DATA attributes in HTML

### Difference b/w bind, call and apply

- bind returns a function
- call returns a value
- apply is same as call but arguments are array
- Note: context is a runtime object

### Network optimisation

- Debounce
  - Debounced function means we are delaying a function by particular time, and if something happens in between the delay is reset again.
- Throttle
  - throttle function means ...

### Web apis

- drag & drop
- audio & video
- geolocation
- websocket
- webrtc
- webspeech
- canva

### OOPS

### PWA with Service Workers

### Web workers

# MISC

- For a scalable architecture for a react web app via monorepo with turbo we can structure our app in this manner

```bash
csh-toolkit
    - csh-utils
    - csh-hooks
    - csh-uikit # Component library
    - csh-config
        - csh-babel-config
        - csh-browserlist-config
        - csh-eslint-config
        - csh-tsconfig-config
        - csh-prettier-config
```

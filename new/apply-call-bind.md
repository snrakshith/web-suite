## explain .apply , .bind and .call in js in simple way with examples

Absolutely! Let’s break down `.apply()`, `.bind()`, and `.call()` in JavaScript in a super simple way. All three are used to **call a function with a specific `this` value**, but they differ in **how you pass arguments** and **when the function is actually executed**.

---

### 🔧 `.call()`

**Calls a function immediately**, setting `this` and passing arguments **one by one**.

#### Example:

```js
function greet(greeting, name) {
  console.log(`${greeting}, ${name}!`);
}

greet.call(null, "Hello", "Alice"); // Hello, Alice!
```

- `this` is set to `null` here (you can set it to an object if needed).
- Arguments are passed **individually**.

---

### 🔧 `.apply()`

**Calls a function immediately**, setting `this` and passing arguments as an **array**.

#### Example:

```js
function greet(greeting, name) {
  console.log(`${greeting}, ${name}!`);
}

greet.apply(null, ["Hi", "Bob"]); // Hi, Bob!
```

- Same as `.call()`, but arguments are in an array.

---

### 🔧 `.bind()`

**Does not call the function right away.** It **returns a new function** with `this` set, and optionally some arguments pre-filled.

#### Example:

```js
function greet(greeting, name) {
  console.log(`${greeting}, ${name}!`);
}

const greetHello = greet.bind(null, "Hello");
greetHello("Charlie"); // Hello, Charlie!
```

- `greetHello` is a new function where `"Hello"` is already set as the first argument.
- You can call it later.

---

### 🔁 Quick Recap

| Method   | Called Immediately? | Arguments Passed          | Use Case                         |
| -------- | ------------------- | ------------------------- | -------------------------------- |
| `.call`  | ✅ Yes              | One by one                | Call function with custom `this` |
| `.apply` | ✅ Yes              | As an array               | Same as `.call`, good for arrays |
| `.bind`  | ❌ No               | One by one (can pre-fill) | Create function to use later     |

---

Want a real-life metaphor or a more visual breakdown?

---

### give me some more, many examples were we are not setting this to null

Absolutely! Let’s go deeper with **plenty of real-world examples** where we set `this` to actual objects instead of `null`. This helps you truly get how `.call()`, `.apply()`, and `.bind()` work in **context**.

---

## 🔍 Let's set the stage

```js
const person1 = {
  name: "Alice",
  sayHello: function (city) {
    console.log(`Hi, I'm ${this.name} from ${city}`);
  },
};

const person2 = {
  name: "Bob",
};
```

---

## 💡 Using `.call()`

```js
// Use person1's sayHello method for person2
person1.sayHello.call(person2, "New York");
// Hi, I'm Bob from New York
```

> ✅ `this` becomes `person2`, and we pass "New York" as an argument.

---

## 💡 Using `.apply()`

```js
person1.sayHello.apply(person2, ["London"]);
// Hi, I'm Bob from London
```

> ✅ Same result as `.call()`, just passing arguments in an array.

---

## 💡 Using `.bind()`

```js
const sayHelloBob = person1.sayHello.bind(person2, "Tokyo");

sayHelloBob();
// Hi, I'm Bob from Tokyo
```

> ✅ `bind` creates a new function where `this` is `person2` and "Tokyo" is pre-filled.

---

### 🧠 Use `.call()` to Borrow Methods

```js
const car = {
  brand: "Tesla",
  showBrand: function () {
    console.log(`Brand is ${this.brand}`);
  },
};

const bike = {
  brand: "Yamaha",
};

car.showBrand.call(bike);
// Brand is Yamaha
```

---

### 🧠 Use `.apply()` with Math Functions

```js
const numbers = [5, 10, 15, 20];

const max = Math.max.apply(null, numbers);
console.log(max); // 20
```

> 💡 `Math.max()` doesn’t accept arrays, so we "spread" the array using `.apply()`.

---

### 🧠 Use `.bind()` for Callbacks

```js
const counter = {
  count: 0,
  increment: function () {
    this.count++;
    console.log(this.count);
  },
};

const btn = document.querySelector("button");

// If you pass increment directly, `this` might be wrong:
btn.addEventListener("click", counter.increment.bind(counter));
```

> ✅ Ensures that `this` is always `counter` when the button is clicked.

---

### 🧠 Chaining with `.bind()`

```js
function multiply(x, y) {
  return x * y;
}

const double = multiply.bind(null, 2); // always multiplies by 2
console.log(double(4)); // 8
```

---

## 🔁 Summary

- Use `.call(obj, arg1, arg2, ...)` when you want to **run the function now**, with `this = obj`
- Use `.apply(obj, [args])` when you have args as an **array**
- Use `.bind(obj, args...)` when you want a **copy of the function with `this` bound**, and maybe partially applied arguments

---

Want even more use cases? Like using them inside classes, functional programming, or React components?

---

## in simple they are called on functions mainly to pass arguments ?

Yes! That’s **exactly right**, and here’s a super simple way to remember it:

---

## ✅ `.call()`, `.apply()`, and `.bind()` are all used on **functions**

…to control two main things:

### 1. **What `this` refers to**

→ You decide what object the function should treat as `this`.

### 2. **How to pass arguments**

→ Either directly, in an array, or to pre-fill them.

---

## 🔁 Super Simple Breakdown

| Method     | Used on  | Changes `this`? | Pass Arguments              | Calls Function Immediately?  |
| ---------- | -------- | --------------- | --------------------------- | ---------------------------- |
| `.call()`  | Function | ✅ Yes          | Individually                | ✅ Yes                       |
| `.apply()` | Function | ✅ Yes          | As an array                 | ✅ Yes                       |
| `.bind()`  | Function | ✅ Yes          | Individually (can pre-fill) | ❌ No (returns new function) |

---

## 💬 Think of it like:

- `.call()` → "Call this function **now** with **this object**, and give the arguments **one by one**."
- `.apply()` → "Call this function **now** with **this object**, and give the arguments as an **array**."
- `.bind()` → "Give me a **new version** of this function where `this` is **fixed**, and maybe some arguments too. I’ll call it **later**."

---

Want a visual or real-life analogy (like actors or tools)?

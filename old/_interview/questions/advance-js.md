# Nested scope

```js
function outer(a) {
  let b = 2;
  function inner(b) {
    let c = 3;
    console.log(a, b, c);
  }
  inner();
}

outer(1);
```

- the variables does get resolved by moving up the order if its not found in the in its own scope upward till the global scope in case of nested functions

- nested functions haave access to variables in there own scope as well as outer scope

# closure

```js

```

- In js, when we return a function from another function, we are effectively returning a combination of the function defination along with it s function scope.

- This would let the function defination have an persistant memory which could hold on to live data btw exectutions.

- That combination of the function & its scope chain is what called a closure

# function currying

- Currying is a process in functional programming in which we transform a function with multiple arguments into a sequence of nesting functions that take 1 argument at a time

> function f(a,b,c) is transformed to f(a)(b)(c)

- Remember Currying doest not call a function, its simply transforms it.

- Usefull for composing resuable functions

> Example

```js
function sum(a, b, c) {
  return a + b + c;
}
console.log(sum(2, 3, 5));
// sum(2,3,5) => sum(2)(3)(5)

// --------
function curry(fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return fn(a, b, c);
      };
    };
  };
}
const curriedSum = curry(sum);
console.log(curriedSum(2)(3)(5));

const add2 = curriedSum(2);
const add3 = add2(3);
const add5 = add3(5);
console.log(add5);
```

# this

- In js `this` keyword which is used in a function, refers to the object it belongs
- It makes the function reusable by letting you decide the object value
  and this value is determined entirely by how a function is called

```js
fuyction sayMyName(name){
    console.log(`My name is ${name}`)
}

When we just look at the function we cannot simple understand what will be its output right.
We can only determine the output of what is logged to the console with that value its passed, when the function is executed

sayMyName("Rakshith") // My name is Rakshith
sayMyName("Raju") // My name is Raju

```

- the same way this keyword works, its only determine on how the function is called

- Then how to determine the value of `this` ?

  - well there are 4 ways to call/invoke a function in javascript & that determine the value of `this keyword`

    - Implicit binding
    - Explicit binding
    - New binding
    - Default binding

- Implicit binding

  ```js

  const person = {
    name :"raju";
    sayMyName:function(){
    console.log(`My name is ${this.name}`)
  }
  }
  ```

- the way we invoke `sayMyName fucntion` in this case is using dot notation

```js
person.sayMyName();
```

- now the `Implicit binding` states that when a function is invoked
  with a dot notation.

- The object to the left of the . ie., `person` in ourcase `this` represnts
- now js will treat `this.name` as `person.name`

# explict binding

- now imagine we separated the `sayMyName function`, Now we need to know the context that with which it gets called so we use `.call() method`

```js
  const person = {
    name :"raju";
  }

  function sayMyName(){
    console.log(`My name is ${this.name}`)
  }

```

- as every function in js has a built in method `.call()` we can use it set the context

```js
sayMyName.call(person); // the 1st args of person
// now this represents person
```

# new binding

- in js we can invoke a function using `new` key words also

```js

functon Person(name){
    // this = {}
    this.name = name
}

const p1 = new Person("Raju")
const p2 = new Person("Venu")

console.log(p1.name , p2.name)

```

- `Person("Venu")` is a constructor function
- when we invoke a function with new keyword it creates a empty object {} that `this` keyword references.
- later we can add new properties to the object with `this.age = age` like this

# default binding

- a fallback binding if other bindings are not found

```js
function sayMyName() {
  console.log(`My name is ${this.name}`);
}
sayMyName();

// op: My name is undefined
```

- here `this` is set to the global object & it trys to find `name` property in the global object as it doesnt find `name` there it returns `undefined`

```js
// const name = "raju"; // in browser
globalThis.name = "raju"; // in node
function sayMyName() {
  console.log(`My name is ${this.name}`);
}
sayMyName();

// op: My name is raju
```

- in default case it always relies on the global scope

## Order of precendence

- new
- explicit
- implicit
- default

---

# prototype

// 35:35

- in js every function as a property name `prototype` that points to the object
- usecases:
  - used for shareing properties & methods across instances
  - is inheritances

> in javascript inheritances is supported via a concept called `prototypes`, called as prototypical inheritance

```js
function Person(fName, lName) {
  this.fName = fName;
  this.lName = lName;
}

Person.prototype.getFullName = function () {
  return this.fName + " " + this.lName;
};

const p1 = new Person("rakshith", "sn");
p1.getFullName(); // op: rakshith sn

// Superhero, is also a person at the end of the day
function Superhero(fName, lName) {
  // this = {}
  // To inherite properties
  Person.call(this, fName, lName);
  this.isSuperHero = true;
}

Superhero.prototype.fightCrime = function () {
  console.log("Fight crime");
};

const batman = new Superhero("raks");
Superhero.prototype.constructor = Superhero;
console.log(batman.fName); // op raks
```

- but if you call `batman.getfullName();` method it fails bcz we did not inherite methods from `Person function`

- we can resolve that using `Object.create`

```js
// To inherite methods
Superhero.prototype = Object.create(Person.prototype);

const batman = new Superhero();
Superhero.prototype.constructor = Superhero;
batman.getfullName();
```

- as Person has `.getfullName` method now Superhero can inherite.
- this is how a method is inherted from a prototype chain hence the name `Prototypcal inheritance`
  > at last we do
- `Superhero.prototype.constructor = Superhero` to let js know Superhero is not created from Person

# class keyword

- Introduced in es6 / 2015
- js doesn't introduce a new object oriented inherictence modal

- in js class is just a syntatical sugar over existing prototypical inheritence

```js
class Person {
  constructor(fName, lName) {
    this.fName = fName;
    this.lName = lName;
  }

  getFullName() {
    return this.fName + " " + this.lName;
  }
}

const classp1 = new Person("raks", "sn");
p.getFullName();
```

#### Other concepts

- Iterators
- Iterable
- Generators

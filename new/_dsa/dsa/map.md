- Map are similar to Objects
- Maps just store key-value pairs, where as Objects can have functions as keys which is not possible in Maps

- ex:

```js
const obj = {
  name: "Raju",
  greet: () => {
    console.log("Hi" + " " + this.name);
  },
};
```

- maps are much faster/better performant, than objects bcz they are lightweight

  - objects have many keys & methods in there `prototypical chain`
  - maps dont have anything.

- You can always directly loop on `Maps` with `.forEach method` unlike objects which needs to be converted use Object `.keys or .values`

- Map syntax:

```tsx
const map = new Map([
  [username, "Rakshith"],
  [age, 26],
]);
```

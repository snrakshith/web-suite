Alright! Imagine you are doing a group project, and your teacher asks who will present.

If the first person is **absent** (null or undefined), you check the next person. If no one is there, you do it yourself.

In JavaScript, the **Nullish Coalescing Operator (`??`)** works the same way.

### Example:

```javascript
let presenter = null ?? "Backup Presenter";
console.log(presenter); // Output: "Backup Presenter"
```

Since `null` is absent, it picks **"Backup Presenter"** instead.

But what if the first person is there?

```javascript
let presenter = "John" ?? "Backup Presenter";
console.log(presenter); // Output: "John"
```

Since `"John"` exists, we don’t need a backup.

### Key Rule:

✅ **Only picks the second value if the first is `null` or `undefined`.**  
❌ **Does NOT trigger on `0`, `false`, or `""` (empty string).**

### Example with Numbers:

```javascript
let score = 0 ?? 100;
console.log(score); // Output: 0 (because 0 is a valid number)
```

If we used `||`, it would have picked `100`, but `??` keeps `0` since it's **not null or undefined**.

**In short:** `??` is like a smart backup plan—it only steps in when there's truly **nothing** (`null` or `undefined`). 🚀

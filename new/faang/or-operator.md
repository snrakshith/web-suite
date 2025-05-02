### 🔥 **Understanding `||` (Logical OR) with 5 Examples**

The **`||` (Logical OR)** operator returns the first **truthy** value it finds. If all values are falsey, it returns the last one.

---

### **1️⃣ Default Username (Fallback for Empty or Null Values)**

```javascript
let username = "" || "Guest";
console.log(username); // Output: "Guest"
```

- Since `""` (empty string) is falsey, `"Guest"` is used as a fallback.

---

### **2️⃣ Default Age (Handles Undefined Values)**

```javascript
let age = undefined || 18;
console.log(age); // Output: 18
```

- If `age` is `undefined`, it falls back to `18`.

---

### **3️⃣ Default Price (Handles 0 as a Falsey Value)**

```javascript
let price = 0 || 100;
console.log(price); // Output: 100
```

- `0` is falsey, so `100` is used as a fallback.
- **⚠️ Be careful!** If `0` is a valid value, use `??` instead.

---

### **4️⃣ Using Environment Variables (Handles Missing Configurations)**

```javascript
let apiUrl = process.env.API_URL || "https://default-api.com";
console.log(apiUrl);
```

- If `process.env.API_URL` is `undefined`, it falls back to `"https://default-api.com"`.

---

### **5️⃣ Selecting a Mode (Handles Boolean Falsey Values)**

```javascript
let isDarkMode = false || "light mode";
console.log(isDarkMode); // Output: "light mode"
```

- `false` is falsey, so `"light mode"` is used as the fallback.

---

### 🚀 **Key Takeaways:**

- **`||` checks from left to right and returns the first truthy value.**
- **It treats `false, 0, "", null, undefined, and NaN` as falsey values.**
- **Use it for general fallbacks, but avoid it when `0` or `false` are valid values (use `??` instead).**

Hope that makes it super clear! 😃🔥

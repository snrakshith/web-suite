[Link](https://www.linkedin.com/pulse/understanding-cookies-local-storage-session-javascript-shubham-khan-6ysuc)

# Understanding Cookies, Local Storage, and Session Storage in JavaScript

When working with web applications, you often need to store data on the client side, whether it's user preferences, session information, or temporary data. JavaScript provides three main ways to store data in the browser: Cookies, Local Storage, and Session Storage. Understanding these storage mechanisms is essential for building interactive and efficient web applications.

In this article, we’ll explore each method, highlight their differences, and provide simple examples to help you grasp these concepts easily.

1. Cookies
   Cookies are small pieces of data stored in the browser. They are sent back and forth between the client and server with each HTTP request, making them ideal for managing user sessions, authentication, and other server-based activities.

Key Characteristics of Cookies:
Size limit: Typically around 4 KB per cookie.
Can be set to expire after a certain time (or on browser close).
Sent automatically with every HTTP request.
Can be accessed both on the client and server.

Example: Setting and Getting a Cookie

```js
// Setting a cookie with an expiration time of 7 days
function setCookie(name, value, days) {
  let date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  let expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Getting a cookie by name
function getCookie(name) {
  let cookieArr = document.cookie.split(";");
  for (let cookie of cookieArr) {
    let [cookieName, cookieValue] = cookie.trim().split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
}

// Example Usage
setCookie("user", "JohnDoe", 7);
console.log(getCookie("user")); // Output: JohnDoe
```

---

2. Local Storage
   Local Storage allows you to store data in the browser with no expiration time, meaning the data remains in the browser even after the user closes the tab or browser. This makes it perfect for storing persistent data like user preferences or application settings.

Key Characteristics of Local Storage:
Size limit: Around 5 MB.
Persistent until manually deleted by the user or through code.
Data is not sent to the server with every request (unlike cookies).
Only accessible on the client side.

Example: Storing and Retrieving Data in Local Storage

```js
// Setting an item in local storage
localStorage.setItem("username", "JohnDoe");

// Getting an item from local storage
let username = localStorage.getItem("username");
console.log(username); // Output: JohnDoe

// Removing an item from local storage
localStorage.removeItem("username");

// Clearing all items from local storage
localStorage.clear();
```

---

3. Session Storage
   Session Storage is similar to Local Storage, but the key difference is that the data stored here is only available for the duration of the page session. Once the browser or tab is closed, the data is deleted. This is useful for storing temporary data that doesn't need to persist after the user leaves the page.

Key Characteristics of Session Storage:
Size limit: Around 5 MB (similar to Local Storage).
Data is cleared when the tab or window is closed.
Not sent with HTTP requests, like Local Storage.
Only accessible on the client side.

Example: Using Session Storage

```js
// Storing data in session storage
sessionStorage.setItem("sessionID", "abc123");

// Retrieving data from session storage
let sessionID = sessionStorage.getItem("sessionID");
console.log(sessionID); // Output: abc123

// Removing data from session storage
sessionStorage.removeItem("sessionID");

// Clearing all session storage data
sessionStorage.clear();
```

## Comparison of Cookies, Local Storage, and Session Storage

<!-- image -->

## When to Use Each Storage Type

Cookies are ideal for storing small amounts of data that need to be shared between the client and server, such as authentication tokens.
Local Storage is useful for persisting data that doesn’t need to be sent to the server, such as theme settings, user preferences, or offline data.
Session Storage is great for temporary data that only needs to exist while the page is open, such as form input during a multi-step process.

## Conclusion

Cookies, Local Storage, and Session Storage each serve distinct purposes in client-side data storage. Knowing when and how to use each can help you optimize your web applications, keeping them secure and efficient. Whether you’re storing user preferences, managing sessions, or handling authentication, you now have the tools to choose the right storage method for your needs.

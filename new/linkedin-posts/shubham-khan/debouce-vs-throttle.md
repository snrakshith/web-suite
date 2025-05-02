<!-- https://www.linkedin.com/pulse/optimize-your-react-app-debouncing-throttling-techniques-shubham-khan-g3rxc/ -->

In modern web development, especially for interactive applications, optimizing performance is crucial.

- Actions like typing in a search bar, resizing a window, or scrolling can trigger rapid-fire function calls, potentially overloading the system and hampering the user experience.
- Two highly effective strategies to mitigate this are debouncing and throttling. By regulating how frequently functions are called during such rapid events, we can significantly enhance performance.

In this post, we’ll explore what debouncing and throttling are, when to use them, and how to implement them in React as reusable custom hooks.

# Debouncing: Responding After the User is Done

Debouncing ensures a function is executed only after a user has stopped triggering an event for a specified time. This is invaluable in scenarios like search inputs, where you want to delay API requests until the user has finished typing.

For example, in a search bar, instead of sending an API request with each key press, debouncing allows you to wait for the user to stop typing for a given duration (e.g. 300ms). This way, you avoid unnecessary API calls with every keystroke.

Example:

```js
function debounce(func, timeout = 500) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}
```

# Throttling: Limiting the Frequency of Function Calls

While debouncing waits for the event activity to stop, throttling ensures a function is executed at most once within a set timeframe, regardless of how frequently an event occurs. This is particularly useful for events like scrolling or window resizing, which can fire many times per second.

For instance, you might want to update a layout during a window resize, but not on every single resize event. Throttling allows you to handle the event in controlled intervals.

```js
function throttle(func, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall >= limit) {
      lastCall = now;
      func(...args);
    }
  };
}
```

## Bringing it to React: Custom Hooks

In React, we can encapsulate both debouncing and throttling into custom hooks to make these techniques reusable across different components. Here’s how to implement them:

## Custom Hook for Debouncing

```js
import { useRef, useCallback } from "react";

const useDebounce = (func, delay) => {
  const timer = useRef(null);

  return useCallback(
    (...args) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => func(...args), delay);
    },
    [func, delay]
  );
};
```

Usage:

```js
const debouncedFetch = useDebounce(fetchData, 300);
```

## Custom Hook for Throttling

```js
import { useRef, useCallback } from "react";

const useThrottle = (func, limit) => {
  const lastCall = useRef(0);

  return useCallback(
    (...args) => {
      const now = new Date().getTime();
      if (now - lastCall.current >= limit) {
        lastCall.current = now;
        func(...args);
      }
    },
    [func, limit]
  );
};
```

```js
const throttledScroll = useThrottle(handleScroll, 500);
```

## Conclusion

Debouncing and throttling are essential techniques for fine-tuning performance in web applications.

- Debouncing shines when controlling user input, while throttling is the go-to for frequent events like scrolling or resizing.
- Implementing these strategies as custom React hooks ensures cleaner, reusable, and more efficient code.
- Try incorporating these into your next project to deliver a smoother, more responsive experience for your users!

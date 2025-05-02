# Asynchronous Code

- node is a single threaded, it doesn't have multithreads to deal with when running a programs or code

- So, we need to understand asynchronous code, in a way we can present it properly to the backend & also maintain it well.

- When ever we are dealing with `file-system` or `network request`.
  Don't forget we have only 1 thread & we need to write `Non-Blocking`
  or `Asynchronous code` to deal with those System resources

- Well there are 3 patterns to deal with Async code
  - Callbacks
  - Promises
  - Async/await (a syntatical sugar over promises)

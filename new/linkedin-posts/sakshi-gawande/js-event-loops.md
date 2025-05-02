Want to impress in JavaScript interviews? Understand the 𝗘𝘃𝗲𝗻𝘁 𝗟𝗼𝗼𝗽 and its components.

𝟭. 𝗖𝗮𝗹𝗹 𝗦𝘁𝗮𝗰𝗸

- 𝗪𝗵𝗮𝘁 𝗶𝘀 𝗶𝘁?
  The Call Stack is where JavaScript keeps track of function calls. It is a stack structure that handles synchronous code execution.
- 𝗛𝗼𝘄 𝗱𝗼𝗲𝘀 𝗶𝘁 𝘄𝗼𝗿𝗸?
  Whenever a function is called, it gets pushed onto the call stack. When the function finishes execution, it is popped off. If there’s an error in synchronous code, the stack will throw an error.

𝟮. 𝗘𝘃𝗲𝗻𝘁 𝗤𝘂𝗲𝘂𝗲 (𝗖𝗮𝗹𝗹𝗯𝗮𝗰𝗸 𝗤𝘂𝗲𝘂𝗲)

- 𝗪𝗵𝗮𝘁 𝗶𝘀 𝗶𝘁?
  The Event Queue (also known as the callback queue) stores events that are to be processed asynchronously, like events triggered by a setTimeout or DOM events.
- 𝗛𝗼𝘄 𝗱𝗼𝗲𝘀 𝗶𝘁 𝘄𝗼𝗿𝗸?
  Once the call stack is empty, the event loop looks at the event queue and pushes the events to the call stack for execution. This ensures that asynchronous code executes after synchronous code.

𝟯. 𝗠𝗶𝗰𝗿𝗼𝘁𝗮𝘀𝗸 𝗤𝘂𝗲𝘂𝗲

- 𝗪𝗵𝗮𝘁 𝗶𝘀 𝗶𝘁?
  The Microtask Queue holds tasks that need to be executed after the currently executing script, but before any events in the event queue. Microtasks include promise callbacks and other tasks like MutationObserver.
- 𝗛𝗼𝘄 𝗱𝗼𝗲𝘀 𝗶𝘁 𝘄𝗼𝗿𝗸?
  Once the call stack is empty and before the event queue is processed, the event loop picks up and processes tasks in the microtask queue. This ensures that promises are resolved before other events are processed.

𝟰. 𝗘𝘃𝗲𝗻𝘁 𝗟𝗼𝗼𝗽

- 𝗪𝗵𝗮𝘁 𝗶𝘀 𝗶𝘁?
  The Event Loop is the mechanism that allows JavaScript to perform non-blocking operations by managing the order in which tasks are executed from the call stack, event queue, and microtask queue.
- 𝗛𝗼𝘄 𝗱𝗼𝗲𝘀 𝗶𝘁 𝘄𝗼𝗿𝗸?
  The event loop constantly checks the call stack. If the call stack is empty, it checks the microtask queue and processes any pending microtasks. After all microtasks are processed, the event loop picks events from the event queue for execution.

𝗞𝗲𝘆 𝗣𝗼𝗶𝗻𝘁:
Microtasks are always executed before the event queue. This is why Promise.then() is processed before setTimeout().

𝟱. 𝗦𝗲𝘁𝗧𝗶𝗺𝗲𝗼𝘂𝘁 𝗮𝗻𝗱 𝗦𝗲𝘁𝗜𝗻𝘁𝗲𝗿𝘃𝗮𝗹

- 𝗪𝗵𝗮𝘁 𝗶𝘀 𝗶𝘁?
  setTimeout() and setInterval() are used to schedule code execution after a specified time, but they are added to the event queue and are processed after all synchronous code and microtasks.
- 𝗛𝗼𝘄 𝗱𝗼𝗲𝘀 𝗶𝘁 𝘄𝗼𝗿𝗸?
  The setTimeout() and setInterval() tasks are executed after the current script is finished executing, which is why you may see asynchronous code run after synchronous code (even if it's scheduled for immediate execution).

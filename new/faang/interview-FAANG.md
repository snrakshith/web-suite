I’ve given multiple frontend interviews at companies like Atlassian and Rippling, and one pattern stands out—writing polyfills is a must-know skill.

If you're preparing for frontend interviews, here’s a list of essential JavaScript and React polyfills you should practice:

If you're preparing for frontend interviews, here’s a list of essential JavaScript and React polyfills you should practice:

🔹 JavaScript Polyfills
✅ bind() polyfill
✅ call() polyfill
✅ apply() polyfill
✅ Promise polyfill
✅ debounce() polyfill
✅ throttle() polyfill
✅ setTimeout polyfill
✅ setInterval polyfill
✅ map() polyfill
✅ filter() polyfill
✅ reduce() polyfill
✅ forEach() polyfill
✅ find() polyfill
✅ findIndex() polyfill
✅ some() polyfill
✅ every() polyfill
✅ flat() polyfill
✅ Object.create() polyfill
✅ Object.assign() polyfill
✅ JSON.stringify() polyfill
✅ JSON.parse() polyfill

⚛️ React-Specific Polyfills
🚀 useState polyfill
🚀 useEffect polyfill
🚀 useMemo polyfill
🚀 useCallback polyfill
🚀 useContext polyfill
🚀 useReducer polyfill
🚀 useRef polyfill
🚀 useLayoutEffect polyfill
🚀 useImperativeHandle polyfill

Also just don't forget to revise the context API. You can be asked to write it as well. If you've come across other commonly asked polyfills, drop them in the comments! 🔥

---

🚀 JavaScript Interview Questions – From Basics to Expert Level

Whether you're preparing for interviews or just brushing up on JavaScript, here’s a categorized list of important concepts you should master:

🔹 Level 1: Basics
1️⃣ What are the different data types in JavaScript?
2️⃣ Explain the event loop and its role in asynchronous programming.
3️⃣ Various ways to create an object in JavaScript.
4️⃣ What is a callback function? What is callback hell?
5️⃣ Difference between `var`, `let`, and `const`.
6️⃣ How does `async/await` work?
7️⃣ What are Promises and Promise chaining?
8️⃣ Is JavaScript single-threaded?
9️⃣ What are the rest and spread operators?
🔟 What is a higher-order function?
1️⃣1️⃣ Difference between `==` and `===` operators.
1️⃣2️⃣ What are the main components of the JavaScript Engine, and how do they work?

🔹 Level 2: Intermediate
1️⃣3️⃣ What are arrow functions (`=>`)?
1️⃣4️⃣ What is a Closure? What are its use cases?
1️⃣5️⃣ Key features introduced in ES6.
1️⃣6️⃣ Explain the concept of Hoisting in JavaScript.
1️⃣7️⃣ What is function currying?
1️⃣8️⃣ Difference between `call()`, `apply()`, and `bind()` methods.
1️⃣9️⃣ What is the Temporal Dead Zone (TDZ)?
2️⃣0️⃣ What is the Prototype Chain? How does `Object.create()` work?

🔹 Level 3: Expert
2️⃣1️⃣ What is the execution priority of Callbacks, Promises, `setTimeout()`, and `process.nextTick()`?
2️⃣2️⃣ What are Factory functions and Generator functions?
2️⃣3️⃣ How to compare two JSON objects in JavaScript?
2️⃣4️⃣ How to perform Shallow and Deep Copy of an object?
2️⃣5️⃣ What are Web Workers and Service Workers in JavaScript?
2️⃣6️⃣ How to make an object immutable? (`Object.seal()` vs. `Object.freeze()`)
2️⃣7️⃣ What is Event Delegation?
2️⃣8️⃣ What are Server-Sent Events (SSE)?
2️⃣9️⃣ What are Events, Event Flow, Event Bubbling, and Event Capturing?
3️⃣0️⃣ What are Execution Context, Execution Stack, Variable Object, and Scope Chain?
3️⃣1️⃣ What is `this` keyword in JavaScript?

---

While switching from The D. E. Shaw Group to Uber,
— I applied to 100+ openings, received only 10 responses, failed 6 of them including Amazon 💔

The interview process was standard, with two DSA rounds followed by one LLD and one HLD round. I messed up the HLD round and got rejected.

Here are the mistakes I made:

1. Spent too much time on capacity estimation.
2. Overthought the "good to have" features, consuming valuable time.
3. Presented some unconventional approaches, which led to extensive cross-questioning that used up the remaining time. (like using kafka or reddis for whatsapp system design iykyk)

If I had to do it again, I’d focus on core features and practice explaining my solutions clearly to avoid misunderstandings and save time.

So, before your next interview, I highly recommend you connect with senior engineers from your target companies and get your prep evaluated.
You can connect with top tech engineers here for FREE: https://lnkd.in/g-Sf9VQ8

They will share effective strategies for DSA and system design. They will also provide feedback on structuring your solutions and managing time effectively, ensuring you're well-prepared for technical and behavioral interviews. 💫

Give this a try, you’ve got nothing to lose!

**Attaching an irrelevant pic for linkedin Algo**

---

You are a noob if you do this in React

Adding and removing multiple event listeners in useEffect?

We often end up writing repetitive removeEventListener calls.

But what is AbortController?

1. It's a built-in browser API designed to abort tasks (originally used with fetch requests).

2. When you call controller.abort(), all event listeners attached with its signal get cleaned up automatically.

3. This makes your useEffect cleaner, easier to read, and less error-prone.

Small tricks like this add up to cleaner, more maintainable code!

Still in the code we can do some refactoring 😂 let me know in comments...

---

his problem was asked to me in my frontend interview Atlassian.

How to control a child component directly from the parent?
Like calling childRef.current.focus() on a custom input?

You will need to use useImperativeHandle hook for this.
It allows you to define what the parent can access via ref — essentially giving your child component a clean, controlled API.
This makes custom components feel like calling methods on a class instance, but in a React-friendly, functional way!

Let me know if you know any other way to solve this problem.

---

You will fail😞 in frontend rounds if you are not good with HLD

After giving interviews at Atlassian Microsoft LinkedIn

I’ve curated this list of must-solve frontend HLD problems

Facebook news feed (React virtualization)
Pinterest (Infinite scrolling)
Netflix
Chat application (websockets vs kafka)
Typeahead widget
Data table component
Poll widget
Google sheets (operational transformation vs crdt)
Google calendar
Notion
Music streaming like spotify
Live commentry like crickbuzz
Excalidraw like tool
Google docs

Resources

- https://www.youtube.com/watch?v=NEzu4FD25KM
- https://www.youtube.com/playlist?list=PLI9W87-Dqn7j_x6QtR6sUjycJR7nQLBqT

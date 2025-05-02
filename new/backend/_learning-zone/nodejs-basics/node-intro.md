# Node.js Notes

## Topics Covered:

- **Modules (ES Modules)**
- **Module.exports vs exports**
- **Callback patterns**
- **Node.js Internals**
- **NPM**
- **CLI**

### Modules:

- **User-defined** vs **Built-in**
- Built-in Modules:
  - `fs`, `path`, `os`, `cluster`, `http`
  - `streams`, `buffer`
  - `events`, `pipes`

### Module Concepts:

- Each file is called a **module**
  - **Built-in**, **Custom**, **3rd-party**
- **CommonJS vs ESM** module format for export & import
- **Module Scope**
- **Module Wrapper**
- **Path Module**
- Node.js has **14 modules**, but we will focus on **7** of them.

### Callback Patterns:

- **Synchronous**
- **Async**

### Async & Await:

- **Syntactic sugar over Promises**
- If Promise resolves → it calls `.then` block
- If Promise rejects → it calls `.catch` block

### HTTP Streams:

- **HTTP Request** → Readable stream
- **HTTP Response** → Writable stream

### Stream Types:

- **Readable streams** → from where data can be read
- **Writable streams** → where we can write data

## Streams in Node.js

### **Types of Streams:**

1. **Duplex Streams**

   - Can be used for both **Readable** & **Writable** operations.

2. **Transform Streams**
   - Can modify the data as it is **written & read**.

### **Pipes in Node.js**

- Streams are very common in codebases.
- To simplify the usage of streams, **Node.js** provides a feature called **Pipes**.

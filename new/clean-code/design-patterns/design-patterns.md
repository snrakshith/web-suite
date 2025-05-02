# Design patterns

- JavaScript(Vanilla/ES6/TypeScript) and Java (GoF) design patterns

- A design pattern is a general repeatable/reusable solution to a commonly occurring problem with a given context in software design. It can be treated as a description or template for how to solve a problem that can be used in many different situations.

- Design patterns can be categorized based on their purpose and the specific problem they address in software design.
  - The three main categories are
    - **Creational**
    - **Structural**
    - **Behavioral** patterns.

> Each category focuses on a different aspect of object-oriented design:

---

### 1. Creational Patterns

**Purpose:** Deal with object creation mechanisms, aiming to create objects in a manner suitable to the situation.

- How objects are created ?
- **What They Solve:** These patterns help in abstracting the instantiation process, making the system independent of how its objects are created, composed, and represented.
- **Common Patterns:**
  - **Singleton:** `imp` Ensures a class has only one instance.
  - **Factory Method:** `imp` Creates objects without specifying the exact class.
  - **Abstract Factory:** `imp` Creates families of related or dependent objects.
  - **Builder:** Constructs complex objects step by step.
  - **Prototype:** Creates new objects by copying existing ones.

### 2. Structural Patterns

**Purpose:** Deal with object composition and relationships, focusing on simplifying the structure by identifying the relationships.

- How objects are related to each others ?
- **What They Solve:** These patterns help ensure that if one part of a system changes, the entire system doesn’t need to change.
- **Common Patterns:**
  - **Adapter:** Allows incompatible interfaces to work together.
  - **Bridge:** Separates an object’s abstraction from its implementation.
  - **Composite:** Organizes objects into tree structures to represent part-whole hierarchies.
  - **Decorator:** Dynamically adds behavior to an object.
  - **Facade:** Provides a simplified interface to a complex system.
  - **Flyweight:** Minimizes memory use by sharing as much data as possible.
  - **Proxy:** Controls access to an object, adding a layer of indirection.

### 3. Behavioral Patterns

**Purpose:** Deal with algorithms and the assignment of responsibilities between objects.

- How objects communicate with each others ?
- **What They Solve:** These patterns manage the communication and interaction between objects, ensuring that systems remain flexible and extensible.

- **Common Patterns:**
  - **Chain of Responsibility:** Passes a request among a chain of handlers.
  - **Command:** Encapsulates a request as an object.
  - **Interpreter:** Implements a specialized language.
  - **Iterator:** Provides a way to access elements of a collection sequentially.
  - **Mediator:** Reduces the direct communication between objects by using a mediator.
  - **Memento:** Captures an object’s state so it can be restored later.
  - **Observer:** Defines a one-to-many dependency between objects.
  - **State:** Allows an object to change its behavior when its state changes.
  - **Strategy:** Defines a family of interchangeable algorithms.
  - **Template Method:** Defines the skeleton of an algorithm, deferring some steps to subclasses.
  - **Visitor:** Represents an operation to be performed on the elements of an object structure.

### Alternative Categories

While the Creational, Structural, and Behavioral categories are the most common, design patterns can also be categorized in other ways:

- **Scope-Based Categorization:**

  - **Class Patterns:** Deal with relationships between classes and their subclasses. These relationships are established through inheritance.
  - **Object Patterns:** Deal with object relationships, which can be changed at runtime.

- **Problem-Based Categorization:**
  - **Concurrency Patterns:** Focus on multi-threaded programming and the coordination between threads (e.g., Thread Pool, Double-Checked Locking).
  - **Architectural Patterns:** Deal with the overall layout of large-scale software applications (e.g., MVC, Microservices).

This classification helps in understanding the specific focus and application of each design pattern within software development.

---

# Most popular and widely used design patterns in each category:

### Creational Patterns

1. **Singleton**

   - Frequently used when only one instance of a class is needed, such as in logging, configuration settings, or managing connections.
   - Use Case: Managing a shared resource or configuration settings.
   - Example: Logging system where only one instance is responsible for writing log entries.

2. **Factory Method**

   - Commonly used in frameworks where the exact class of the object that needs to be created isn’t known until runtime.
   - Use Case: Creating objects without exposing the instantiation logic to the client.
   - Example: Generating different types of reports (PDF, CSV, HTML) based on user preferences.

3. **Builder**
   - Often used when an object needs to be constructed with many optional parameters or complex construction steps, like when creating complex objects in a readable way.

### Structural Patterns

1. **Adapter**

   - Commonly used to make existing classes work with others without modifying their source code, particularly when integrating with legacy systems.

2. **Decorator**

   - Frequently used to add behavior or responsibilities to objects dynamically, often seen in I/O streams in Java or UI component frameworks.

3. **Facade**
   - Widely used to provide a simplified interface to a complex subsystem, making it easier to use and understand.

### Behavioral Patterns

1. **Observer**

   - Commonly used in event-driven systems where objects need to be notified of changes in other objects, such as in UI frameworks.
   - Use Case: Implementing event-driven systems or handling notifications and updates.
   - Example: Notifying subscribers when a new blog post is published or when stock prices change.

2. **Strategy**

   - Often used to define a family of algorithms, encapsulate each one, and make them interchangeable, particularly in situations where a class behavior needs to change dynamically.
   - Use Case: Switching between interchangeable algorithms at runtime.
   - Example: Sorting a collection using different strategies like quicksort, mergesort, or bubblesort.

3. **Command**

   - Widely used to encapsulate all information needed to perform an action or trigger an event, often seen in implementations of undo/redo functionality or GUI buttons.

4. **State**
   - Commonly used to allow an object to change its behavior when its internal state changes, frequently seen in workflow management or game development.

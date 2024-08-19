Here are the design patterns categorized under Creational, Structural, and Behavioral patterns:

### Creational Patterns

These patterns deal with object creation mechanisms, trying to create objects in a manner suitable to the situation.

1. **Singleton**

   - Ensures a class has only one instance and provides a global point of access to it.

2. **Factory Method**

   - Defines an interface for creating an object, but lets subclasses alter the type of objects that will be created.

3. **Abstract Factory**

   - Provides an interface for creating families of related or dependent objects without specifying their concrete classes.

4. **Builder**

   - Separates the construction of a complex object from its representation, allowing the same construction process to create different representations.

5. **Prototype**
   - Creates a new object by copying an existing object, known as the prototype.

### Structural Patterns

These patterns deal with object composition or how objects are related to each other.

1. **Adapter**

   - Allows objects with incompatible interfaces to collaborate by converting the interface of a class into another interface clients expect.

2. **Bridge**

   - Decouples an abstraction from its implementation so that the two can vary independently.

3. **Composite**

   - Composes objects into tree structures to represent part-whole hierarchies. It lets clients treat individual objects and compositions of objects uniformly.

4. **Decorator**

   - Adds additional responsibilities to an object dynamically, providing a flexible alternative to subclassing for extending functionality.

5. **Facade**

   - Provides a unified interface to a set of interfaces in a subsystem, simplifying the subsystem’s usage.

6. **Flyweight**

   - Reduces the cost of creating and manipulating a large number of similar objects by sharing objects.

7. **Proxy**
   - Provides a surrogate or placeholder for another object to control access to it.

### Behavioral Patterns

These patterns deal with communication between objects and how they interact with each other.

1. **Chain of Responsibility**

   - Passes a request along a chain of handlers. Each handler can either process the request or pass it to the next handler in the chain.

2. **Command**

   - Encapsulates a request as an object, thereby allowing for parameterization of clients with queues, requests, and operations.

3. **Interpreter**

   - Defines a grammatical representation for a language and an interpreter to interpret the grammar.

4. **Iterator**

   - Provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation.

5. **Mediator**

   - Defines an object that encapsulates how a set of objects interact, promoting loose coupling by keeping objects from referring to each other explicitly.

6. **Memento**

   - Captures and externalizes an object’s internal state so that it can be restored later without violating encapsulation.

7. **Observer**

   - Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

8. **State**

   - Allows an object to alter its behavior when its internal state changes. The object will appear to change its class.

9. **Strategy**

   - Defines a family of algorithms, encapsulates each one, and makes them interchangeable. The strategy lets the algorithm vary independently from the clients that use it.

10. **Template Method**

    - Defines the skeleton of an algorithm in an operation, deferring some steps to subclasses.

11. **Visitor**
    - Represents an operation to be performed on elements of an object structure. It lets you define a new operation without changing the classes of the elements on which it operates.

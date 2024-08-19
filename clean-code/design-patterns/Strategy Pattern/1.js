// Explanation: The Strategy pattern defines a family of interchangeable algorithms and encapsulates each one. It allows the algorithms to be selected at runtime based on the context.

class Context {
    constructor(strategy) {
        this.strategy = strategy;
    }

    executeStrategy() {
        this.strategy.execute();
    }
}

class ConcreteStrategyA {
    execute() {
        console.log('Strategy A');
    }
}

class ConcreteStrategyB {
    execute() {
        console.log('Strategy B');
    }
}

const contextA = new Context(new ConcreteStrategyA());
contextA.executeStrategy();  // Output: 'Strategy A'

const contextB = new Context(new ConcreteStrategyB());
contextB.executeStrategy();  // Output: 'Strategy B'

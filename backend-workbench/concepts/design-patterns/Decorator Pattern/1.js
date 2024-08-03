// Explanation: The Decorator pattern allows adding behavior or modifying functionality of an object dynamically without changing its original structure.

class Component {
    operation() {
        console.log('Component operation');
    }
}

class Decorator {
    constructor(component) {
        this.component = component;
    }

    operation() {
        this.component.operation();
        console.log('Decorator operation');
    }
}

const component = new Component();
const decorator = new Decorator(component);

decorator.operation();  // Output: 'Component operation' followed by 'Decorator operation'

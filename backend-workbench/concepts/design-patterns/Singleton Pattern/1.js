// Singleton Pattern:

// Explanation: The Singleton pattern ensures that only one instance of a class is created and provides a global point of access to it.
// JavaScript Example:

let instance = null;

class Singleton {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }
}

const singletonInstance1 = new Singleton();
const singletonInstance2 = new Singleton();
console.log(singletonInstance1 === singletonInstance2);  // Output: true

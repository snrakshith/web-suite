// Observer Pattern

// Explanation: The Observer pattern defines a one - to - many dependency between objects, so that when one object changes its state, all its dependents are notified and updated automatically.


class Subject {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    notifyObservers() {
        this.observers.forEach(observer => observer.update());
    }
}

class Observer {
    update() {
        console.log('Observer is notified!');
    }
}

const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();

subject.addObserver(observer1);
subject.addObserver(observer2);

subject.notifyObservers();  // Output: 'Observer is notified!' (twice)

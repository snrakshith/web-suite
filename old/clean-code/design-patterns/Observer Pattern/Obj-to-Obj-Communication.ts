interface Observer {
  update(): void;
}

class Button {
  private observers: Observer[] = [];

  addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  click() {
    console.log("Button clicked!");
    this.notifyObservers();
  }

  private notifyObservers() {
    this.observers.forEach((observer) => observer.update());
  }
}

class ElementLogger implements Observer {
  update() {
    console.log("Button was clicked! Logging...");
  }
}

const button = new Button();
const elementLogger = new ElementLogger();

button.addObserver(elementLogger);
button.click();

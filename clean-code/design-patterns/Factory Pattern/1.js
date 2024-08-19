// Explanation: The Factory pattern provides a way to create objects without specifying their concrete classes. It encapsulates the object creation logic in a separate method or class.

class Product {
    constructor(name) {
        this.name = name;
    }
}

class ProductFactory {
    createProduct(name) {
        return new Product(name);
    }
}

const factory = new ProductFactory();
const product = factory.createProduct('Example Product');
console.log(product instanceof Product);  // Output: true


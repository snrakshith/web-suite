const { products, categories } = require("../db");

exports.Query = {
  hello: () => "Hello..",
  numberOfAnimals: () => {
    return 4;
  },
  peoples: () => {
    return ["Hello", "World"];
  },
  products: () => {
    return products;
  },
  product: (parent, args, context) => {
    const productId = args.id;
    const product = products.find((product) => product.id === productId);
    if (!product) {
      return null;
    }
    return product;
  },
  categories: () => categories,
  product: (parent, args, context) => {
    const { id } = args;
    return categories.find((category) => category.id === id);
  },
};

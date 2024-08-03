const { ApolloServer, gql } = require("apollo-server");

const products = [
  {
    id: 1,
    name: "Cake",
    description: "Ice cake",
    quantity: 100,
    price: 50.51,
    onSale: false,
  },
];
const categories = [
  {
    id: 1,
    name: "Food",
  },
];

// Scalars String , Int , Float ,Boolean, Id
const typeDefs = gql`
  type Query {
    hello: String
    numberOfAnimals: Int! # Important of Int type
    peoples: [String!]!
    products: [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
  }

  type Category {
    id: ID!
    name: String!
    # products: [Product!]!
  }
`;

const resolvers = {
  Query: {
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
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server started at ${url}`);
});

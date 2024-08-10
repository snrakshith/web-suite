const { gql } = require("apollo-server");

// Scalars String , Int , Float ,Boolean, Id
exports.typeDefs = gql`
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

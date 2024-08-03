const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema");
const { Query } = require("./resolvers/Query");

const server = new ApolloServer({
  typeDefs,
  resolvers: { Query },
});

server.listen().then(({ url }) => {
  console.log(`Server started at ${url}`);
});

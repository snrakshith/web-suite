import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";

let db;
let server: any;

beforeAll(async () => {
  server = new MongoMemoryServer();
  const mongoUri = await server.getUri();
  const client = new MongoClient(mongoUri);
  await client.connect();
  db = client.db(); // Use this database instance for your service

  // yourService = new YourService(db); // Create an instance of your service with the database connection
});

afterAll(async () => {
  await server.stop();
});

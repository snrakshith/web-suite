import { cacheData } from "./cacheData";
import { getSpeciesData } from "./getSpeciesData";
import { setupRedis, disconnectRedis, getRedisClient } from "./setupRedis";

import express from "express";

const app = express();
const port = process.env.PORT || 3000;

// Initialize Redis connection
(async () => {
  await setupRedis();
})();

// Define the route
app.get("/fish/:species", cacheData, getSpeciesData);

// Example of graceful shutdown
process.on("SIGINT", async () => {
  console.log("SIGINT signal received: closing Redis client");
  await disconnectRedis();
  process.exit(0);
});

// Start the server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

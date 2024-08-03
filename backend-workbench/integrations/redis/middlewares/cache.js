const express = require("express");
const redis = require("redis");

const app = express();
const port = 3000;

const redisClient = redis.createClient();

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

// Middleware for caching using Redis
const cacheMiddleware = (fetchDataCallback) => (req, res, next) => {
  const key = req.originalUrl;

  // Check if data is present in Redis
  redisClient.get(key, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (data !== null) {
      // Data found in Redis, send cached response
      const parsedData = JSON.parse(data);
      return res.json(parsedData);
    } else {
      // Data not found in Redis, proceed to the next middleware or route handler

      // Call the provided callback function to fetch data from the original source
      fetchDataCallback(req)
        .then((responseData) => {
          // Save data to Redis for future use with an expiration time of 1 hour (3600 seconds)
          redisClient.set(key, JSON.stringify(responseData), "EX", 3600);

          // Send the response
          res.json(responseData);
        })
        .catch((error) => {
          console.error(error);
          return res
            .status(500)
            .json({ error: "Error fetching data from the original source" });
        });
    }
  });
};

// Example function to fetch animals from the original source (replace with your actual data fetching logic)
const fetchAnimalsFromDatabase = (req) => {
  return new Promise((resolve) => {
    // Your logic to fetch animals goes here
    // ...

    // For demonstration purposes, returning a static list
    resolve({ animals: ["lion", "tiger", "bear"] });
  });
};

// Apply the cache middleware to the animals route
app.get("/animals", cacheMiddleware(fetchAnimalsFromDatabase));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

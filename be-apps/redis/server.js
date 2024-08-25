const express = require("express");
const axios = require("axios");
const redis = require("redis");

const app = express();
const port = process.env.PORT || 3000;

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

async function fetchApiData(species) {
  const apiResponse = await axios.get(
    `https://www.fishwatch.gov/api/species/${species}`
  );
  console.log("Request sent to the API");
  return apiResponse.data;
}
async function fetchPostsData() {
  const apiResponse = await axios.get(
    `https://jsonplaceholder.typicode.com/posts`
  );
  console.log("Request sent to the API");
  return apiResponse.data;
}
const CACHE_KEY = {
  posts: "posts",
};
// Reusable cacheData middleware with cacheKey
function cacheData(cacheKey) {
  return async function (req, res, next) {
    try {
      const key = typeof cacheKey === "function" ? cacheKey(req) : cacheKey;
      const cacheResults = await redisClient.get(key);
      if (cacheResults) {
        const results = JSON.parse(cacheResults);
        res.send({
          fromCache: true,
          data: results,
        });
      } else {
        next();
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  };
}

async function getSpeciesData(req, res) {
  const species = req.params.species;
  let results;

  try {
    results = await fetchApiData(species);
    if (results.length === 0) {
      throw "API returned an empty array";
    }
    await redisClient.set(`${species}-fish-data`, JSON.stringify(results), {
      EX: 180,
      NX: true,
    });

    res.send({
      fromCache: false,
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(404).send("Data unavailable");
  }
}
async function getAllPosts(req, res) {
  let results;

  try {
    results = await fetchPostsData();
    if (results.length === 0) {
      throw "API returned an empty array";
    }
    await redisClient.set(CACHE_KEY.posts, JSON.stringify(results), {
      EX: 180,
      NX: true,
    });

    res.send({
      fromCache: false,
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(404).send("Data unavailable");
  }
}

// Apply cacheData middleware with dynamic cache key for species
app.get(
  "/fish/:species",
  cacheData((req) => `${req.params.species}-fish-data`),
  getSpeciesData
);

// Apply cacheData middleware with a static cache key for posts
app.get("/posts", cacheData(CACHE_KEY.posts), getAllPosts);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

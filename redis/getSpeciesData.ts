import { fetchApiData } from "./fetchApiData";
import { getRedisClient } from "./setupRedis";

export const getSpeciesData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const species = req.params.species;
  try {
    const redisClient = getRedisClient();
    if (redisClient) {
      const results = await fetchApiData(species);
      if (results.length === 0) {
        throw new Error("API returned an empty array");
      }
      await redisClient.set(species, JSON.stringify(results), {
        EX: 180, // Cache expiration time in seconds
        NX: true, // Set the key only if it does not already exist
      });

      res.send({
        fromCache: false,
        data: results,
      });
    } else {
      res.status(500).send("Redis client not initialized");
    }
  } catch (error) {
    console.error("API data retrieval error:", error);
    res.status(404).send("Data unavailable");
  }
};

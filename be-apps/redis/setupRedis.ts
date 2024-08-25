import { createClient, RedisClientType } from "redis";

let redisClient: RedisClientType | undefined;

export const setupRedis = async (): Promise<void> => {
  redisClient = createClient({
    url: "redis://localhost:6379", // Update if needed
  });

  redisClient.on("error", (error) => console.error(`Redis Error: ${error}`));

  try {
    await redisClient.connect();
    console.log("Redis client connected");
  } catch (error) {
    console.error("Error connecting to Redis", error);
    process.exit(1); // Exit if Redis connection fails
  }
};

export const disconnectRedis = async (): Promise<void> => {
  if (redisClient) {
    try {
      await redisClient.quit();
      console.log("Redis client disconnected");
    } catch (error) {
      console.error("Error disconnecting Redis client", error);
    }
  }
};

export const getRedisClient = (): RedisClientType | undefined => redisClient;

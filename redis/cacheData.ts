import express, { Request, Response, NextFunction } from "express";

import { setupRedis, disconnectRedis, getRedisClient } from "./setupRedis";

export const cacheData = async (
  req: Request,
  res: Response,
  next: NextFunction,
  cachekey: string
): Promise<void> => {
  const species = req.params.species;
  try {
    const redisClient = getRedisClient();
    if (redisClient) {
      // const cacheResults = await redisClient.get(species);
      const cacheResults = await redisClient.get(cachekey);
      if (cacheResults) {
        const results = JSON.parse(cacheResults);
        res.send({
          fromCache: true,
          data: results,
        });
      } else {
        next();
      }
    } else {
      res.status(500).send("Redis client not initialized");
    }
  } catch (error) {
    console.error("Cache retrieval error:", error);
    res.status(500).send("Error retrieving from cache");
  }
};

import { createClient, RedisClientType } from "redis";
import Logger from "@/interfaces/http/logger/logger";

export default function connection(redis: RedisClientType, config: any) {
  const createRedisClient = function createRedisClient() {
    return createClient(config.redis.uri);
  };
  createRedisClient().on("connect", () => {
    Logger.info("Connected to Redis!");
  });

  createRedisClient().on("error", err => {
    Logger.error("Redis connection error", err);
  });

  return {
    createRedisClient,
  };
}

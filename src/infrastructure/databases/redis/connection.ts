import { createClient, RedisClientType } from "redis";

export default function connection(redis: RedisClientType, config: any) {
  const createRedisClient = function createRedisClient() {
    return createClient(config.redis.uri);
  };
  createRedisClient().on("connect", () => {
    console.log("Connected to Redis!");
  });

  createRedisClient().on("error", err => {
    console.error(err);
  });

  return {
    createRedisClient,
  };
}

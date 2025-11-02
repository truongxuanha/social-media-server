export default {
  port: process.env.PORT || 3000,
  shutdownDelay: 5000,
  ip: process.env.IP || "0.0.0.0",
  databaseUrl:
    process.env.DATABASE_URL ||
    "mongodb://localhost:27017/socialdb?replicaSet=rs0",
  redis: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
  },
  jwtSecret: process.env.JWT_SECRET,
};

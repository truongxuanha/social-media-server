import { prisma } from "../../infrastructure/databases/prisma";
import { createTerminus } from "@godaddy/terminus";
import { Application } from "express";
import path from "path";
import express from "express";

export default function serverConfig(app: Application, config: any) {
  async function healthCheck() {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(new Error("PostgreSQL is not connected"));
    }
  }

  async function onSignal() {
    try {
      await prisma.$disconnect();
      console.log("MongoDB disconnected");
    } catch (err) {
      console.error("Error disconnecting from MongoDB", err);
    }
  }

  function beforeShutdown() {
    return new Promise((resolve) => {
      setTimeout(resolve, config.shutdownDelay || 5000);
    });
  }
  function onShutdown() {
    return Promise.resolve();
  }

  function startServer() {
    const options = {
      logger: console.log,
      signal: "SIGINT",
      healthChecks: { "/healthcheck": healthCheck },
      timeout: 1000,
      onSignal,
      beforeShutdown,
      onShutdown,
    };

    createTerminus(app, options);
    
    app.use(express.static(path.join(__dirname, "public")));
    
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "public", "index.html"));
    });
    app.listen(config.port, () => {
      console.log(`Server is running on port http://localhost:${config.port}`);
    });
  }
  return { startServer };
}

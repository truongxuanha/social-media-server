import prisma from "@/infrastructure/databases/prisma";
import { createTerminus } from "@godaddy/terminus";
import { Application } from "express";
import path from "path";
import express from "express";
import Logger from "@/shared/utils/logger";

export default function serverConfig(app: Application, config: any) {
  async function healthCheck() {
    try {
      await prisma.$connect();
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(new Error(err as string));
    }
  }

  async function onSignal() {
    try {
      await prisma.$disconnect();
      Logger.info("MongoDB disconnected");
    } catch (err) {
      Logger.error("Error disconnecting from MongoDB", err);
    }
  }

  function beforeShutdown() {
    return new Promise(resolve => {
      setTimeout(resolve, config.shutdownDelay || 5000);
    });
  }
  function onShutdown() {
    return Promise.resolve();
  }

  function startServer() {
    const options = {
      logger: (msg: string, err?: Error) => {
        if (err) {
          Logger.error(msg, err);
        } else {
          Logger.info(msg);
        }
      },
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
      Logger.info(`Server is running on port http://localhost:${config.port}`);
    });
  }
  return { startServer };
}

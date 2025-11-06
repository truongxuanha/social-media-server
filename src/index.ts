import dotenv from "dotenv";
dotenv.config();

import express from "express";
import expressConfig from "./interfaces/http/express";
import serverConfig from "./interfaces/http/server";
import configs from "./shared/configs";
import router from "./interfaces/http/routes";
import "./shared/configs/alias";
import { createServer } from "http";
const app = express();
const server = createServer(app);

expressConfig(app);

app.use(router);

// Error handler middleware phải được đặt sau tất cả routes
import { ErrorMiddleware } from "./interfaces/http/middlewares/error.middleware";
app.use(ErrorMiddleware.handle());

serverConfig(app, configs).startServer();
export { app, server };

import express from "express";
import expressConfig from "./interfaces/http/express";
import serverConfig from "./interfaces/http/server";
import configs from "./shared/configs";
import router from "./interfaces/http/routes";
import dotenv from "dotenv";
import "./shared/configs/alias";

dotenv.config();
const app = express();
const server = require("http").createServer(app);

expressConfig(app);

app.use(router);

serverConfig(app, configs).startServer();
export { app, server };

import express from "express";
import expressConfig from "./interfaces/http/express";
import serverConfig from "./interfaces/http/server";
import configs from "./shared/configs";
import userRoutes from "./interfaces/http/routes/user.routes";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const server = require("http").createServer(app);

expressConfig(app);

// Thêm routes
app.use("/api/users", userRoutes);

serverConfig(app, configs).startServer();
export { app, server };

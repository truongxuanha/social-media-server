import { Application } from "express";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import morgan from "morgan";

export default function expressConfig(app: Application) {
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
      crossOriginEmbedderPolicy: false,
    })
  );

  app.use(compression());

  app.use(bodyParser.json({ limit: "50mb" }));

  app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 50000,
    })
  );

  app.use((req, res, next) => {
    const origin = req.headers.origin;
    const allowedOrigins = process.env.CORS_ORIGINS?.split(",") || ["*"];

    if (
      allowedOrigins.includes("*") ||
      (origin && allowedOrigins.includes(origin))
    ) {
      res.setHeader("Access-Control-Allow-Origin", origin || "*");
    }

    res.setHeader("Access-Control-Allow-Credentials", "true");

    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );

    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With, Content-Type, Authorization, Cache-Control, Pragma, Accept, Origin"
    );

    res.setHeader(
      "Access-Control-Expose-Headers",
      "Authorization, Content-Length, X-Requested-With"
    );

    // Xử lý preflight OPTIONS request
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }

    next();
  });
  app.use(morgan("combined"));
}

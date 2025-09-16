import { Application } from "express";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import morgan from "morgan";

export default function expressConfig(app: Application) {
  app.use(helmet());

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
    res.setHeader(
      "Access-Control-Allow-Origin",
      "GET, POST, PUT, DELETE, PATCH"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type,Authorization, Cache-control, Pragma"
    );
    next();
  });
  app.use(morgan("combined"));
}

require("dotenv").config();

import cors from "cors";
import express from "express";
import config from "./config/config";
import winstonLogger from "./startup/log";
import setExtensions from "./startup/extensions";

import { handleFatalErrors } from "./startup/process-handler";
import { setRoutes } from "./startup/routes";

const port: number = config.port;
const app: express.Application = express();

app.use(cors());
setExtensions();
handleFatalErrors();
setRoutes(app);

if (process.env.NODE_ENV !== "test") {
  winstonLogger.debug(`env: ${process.env.NODE_ENV}`);
  app.listen(port, () => winstonLogger.debug(`Listening on port ${port}`));
}

export default app;

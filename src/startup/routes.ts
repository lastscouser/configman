import express from "express";
import mung from "express-mung";

import { error } from "../middleware/error";
import { transform } from "../middleware/response-handler";
import { session } from "../middleware/session";

import home from "../routes/home";
import user from "../routes/user";
import parameter from "../routes/parameter";
import cache from "../routes/cache";

export const setRoutes = (app: express.Application) => {
  app.use(express.json());
  app.use(session);
  // app.use(lang);
  app.use(mung.json(transform));
  app.use("/api", home);
  app.use("/api/users", user);
  app.use("/api/parameters", parameter);
  app.use("/api/cache", cache);
  app.use(error);
};

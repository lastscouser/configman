import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { createNamespace, getNamespace } from "continuation-local-storage";
import { setSessionKey } from "../helper/session";
import { Context } from "../domain/context";

let requestSession = createNamespace("appRequestSession");

export function context(req: Request, res: Response, next: NextFunction) {
  req.sessionId = uuidv4();

  var namespace = getNamespace("appRequestSession");
  if (namespace) {
    // wrap the events from request and response
    namespace.bindEmitter(req);
    namespace.bindEmitter(res);

    const context: Context = {
      sessionId: req.sessionId,
      user: req.user,
    };

    setSessionKey(next, "context", context);
  } else {
    next();
  }
}

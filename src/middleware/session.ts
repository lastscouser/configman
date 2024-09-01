import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { createNamespace, getNamespace } from "continuation-local-storage";
import { setSessionKey } from "../helper/session";

declare global {
  namespace Express {
    export interface Request {
      sessionId: string;
    }
  }
}

let requestSession = createNamespace("appRequestSession");

export function session(req: Request, res: Response, next: NextFunction) {
  req.sessionId = uuidv4();

  var namespace = getNamespace("appRequestSession");
  if (namespace) {
    // wrap the events from request and response
    namespace.bindEmitter(req);
    namespace.bindEmitter(res);

    setSessionKey(next, "sessionId", req.sessionId);
  } else {
    next();
  }
}

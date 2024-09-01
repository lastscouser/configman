import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

declare global {
  namespace Express {
    export interface Request {
      requestId: string;
    }
  }
}

declare global {
  namespace Express {
    export interface Response {
      requestId: string;
    }
  }
}

export async function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.requestId = uuidv4();
  res.requestId = req.requestId;

  const reqUrl: string = req.originalUrl || req.url;

  if (!reqUrl || reqUrl.indexOf("api/") <= 0) {
    return next();
  }

  //logger.logRequest(req);

  const cleanup = () => {
    res.removeListener("finish", logFn);
  };

  const logFn = async () => {
    cleanup();
  };

  res.on("finish", logFn); // successful pipeline (regardless of its response)

  next();
}

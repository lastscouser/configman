import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    export interface Request {
      lang: string;
    }
  }
}

export function lang(req: Request, res: Response, next: NextFunction) {
  const lang = req.header("lang");

  if (lang) {
    req.lang = lang;
  } else {
    req.lang = "tr-TR";
  }

  next();
}

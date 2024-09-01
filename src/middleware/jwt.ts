import { Request, Response, NextFunction } from "express";
import winstonLogger from "../startup/log";
import { setSessionKey } from "../helper/session";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { admin } from "../config/firebase";
import { Unauthorized } from "../domain/exception";

declare global {
  namespace Express {
    export interface Request {
      user: DecodedIdToken;
    }
  }
}

export async function jwt(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;

    setSessionKey(next, "email", decodedToken.email);
  } catch (err) {
    winstonLogger.error("jwt error", err);
    throw new Unauthorized("token-expired");
  }
}

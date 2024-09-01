import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { Unauthorized } from "../domain/exception";

export interface UserTokenPayload {
  userId: number;
  expireDate: number;
  email: string;
  name: string;
  surname: string;
  code: string;
}

export function generateToken(
  customerNumber: number,
  tokenDurationMinutes: number
): string {
  const jwtPrivateKey: string = config.jwtPrivateKey;
  const tokenDurationMiliseconds = tokenDurationMinutes * 60 * 1000;
  return jwt.sign(
    {
      customerNumber: customerNumber,
      expireDate: tokenDurationMiliseconds + new Date().getTime(),
    },
    jwtPrivateKey
  );
}

export async function generateTokenForMembers(user: any): Promise<string> {
  const jwtPrivateKey: string = config.jwtPrivateKey;
  const tokenDurationMiliseconds = config.tokenDurationInMinutes * 60 * 1000;

  const payload: UserTokenPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    surname: user.surname,
    code: user.name[0].toUpperCase() + user.surname[0].toUpperCase(),
    expireDate: tokenDurationMiliseconds + new Date().getTime(),
  };

  return jwt.sign(payload, jwtPrivateKey);
}

export function verifyMemberToken(token: string | undefined): UserTokenPayload {
  if (!token) {
    throw new Unauthorized("Access denied. No token provided");
  }
  const jwtPrivateKey: string = config.jwtPrivateKey;

  let decoded: UserTokenPayload;

  try {
    decoded = jwt.verify(token, jwtPrivateKey) as UserTokenPayload;
  } catch (error: any) {
    throw new Unauthorized(error.message || "invalid token", 102);
  }

  if (!decoded) {
    throw new Unauthorized("empty token", 102);
  }

  if (decoded.expireDate < new Date().getTime()) {
    throw new Unauthorized("token is expired", 101);
  }

  return decoded;
}

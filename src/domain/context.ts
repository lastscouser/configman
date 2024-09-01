import { UserTokenPayload } from "../helper/jwt";

export interface Context {
  sessionId: string;
  user: UserTokenPayload;
}

import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

export interface Context {
  sessionId: string;
  user: DecodedIdToken;
}

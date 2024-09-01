import { Config } from "../domain/config";
import { ConfigStatus } from "./dev";

require("dotenv").config();

const uatConfig: Config = {
  port: Number(process.env.BATCH_PORT) || 0,
  logLevel: process.env.LOG_LEVEL || ConfigStatus.NotDefined,
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY || ConfigStatus.NotDefined,
  telegram: {
    key: process.env.TELEGRAM_KEY || ConfigStatus.NotMandatory,
    groupId: process.env.TELEGRAM_GROUP_ID || ConfigStatus.NotMandatory,
  },
  tokenDurationInMinutes: Number(process.env.TOKEN_DURATION_IN_MINUTES || 100),
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY || "",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.FIREBASE_APP_ID || "",
  },
};

export default uatConfig;

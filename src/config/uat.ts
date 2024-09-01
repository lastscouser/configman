import { Config } from "../domain/config";

require("dotenv").config();

const uatConfig: Config = {
  port: Number(process.env.PORT) || 0,
  logLevel: process.env.LOG_LEVEL || "debug",
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

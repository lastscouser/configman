import { Config } from "../domain/config";

export enum ConfigStatus {
  NotDefined = "not-defined",
  NotMandatory = "not-mandatory",
}

const devConfig: Config = {
  port: 1892,
  logLevel: "debug",
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY || "",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.FIREBASE_APP_ID || "",
  },
};

export default devConfig;

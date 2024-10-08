const firebase = require("firebase/app");
const admin = require("firebase-admin");

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import config from "./config";
import winstonLogger from "../startup/log";

const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT || "", "base64").toString(
    "utf-8"
  )
);

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

winstonLogger.debug({
  ...config.firebase,
});

const firebaseApp = firebase.initializeApp({
  ...config.firebase,
});

export {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  admin,
  firebaseApp,
};

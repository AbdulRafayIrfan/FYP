import { initializeApp, getApps, getApp } from "firebase-admin/app";
import { credential } from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, "base64").toString(
    "utf-8"
  )
);

const app = getApps().length
  ? getApp()
  : initializeApp({ credential: credential.cert(serviceAccount) });

const db = getFirestore(app);

export { app, db };

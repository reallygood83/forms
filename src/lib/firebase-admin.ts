import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

function ensureApp() {
  if (!projectId || !clientEmail || !privateKey) {
    const missing = [];
    if (!projectId) missing.push("FIREBASE_ADMIN_PROJECT_ID");
    if (!clientEmail) missing.push("FIREBASE_ADMIN_CLIENT_EMAIL");
    if (!privateKey) missing.push("FIREBASE_ADMIN_PRIVATE_KEY");
    throw new Error(`Firebase Admin credentials are not configured. Missing: ${missing.join(", ")}`);
  }
  return getApps().length ? getApp() : initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
}

export function getAdminDb() {
  const app = ensureApp();
  return getFirestore(app);
}

export function getAdminAuth() {
  const app = ensureApp();
  return getAuth(app);
}
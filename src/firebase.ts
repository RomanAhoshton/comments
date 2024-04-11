import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const FIREBASE_API_KEY = "AIzaSyBTqQ_qundFGPOQt_YinVPDfRjlnqN9qR8";
const FIREBASE_AUTH_DOMAIN = "todolistapp-908f6.firebaseapp.com";
const FIREBASE_PROJECT_ID = "todolistapp-908f6";
const FIREBASE_STORAGE_BUCKET = "todolistapp-908f6.appspot.com";
const FIREBASE_MESSAGING_SENDER_ID = "981434960858";
const FIREBASE_APP_ID = "1:981434960858:web:4ad752ce197b9ae9eecee3";
const FIREBASE_MEASUREMENT_ID = "G-Y6PM0VFX74";

export const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);

export const DB = getFirestore(app);

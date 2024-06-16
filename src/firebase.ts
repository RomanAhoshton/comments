import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import * as firebaseAuth from 'firebase/auth';

const FIREBASE_API_KEY = 'AIzaSyC87SxOa9uhEQIetr_RLtlmyRu-kaIrZmo';
const FIREBASE_AUTH_DOMAIN = 'comments-app-5039f.firebaseapp.com';
const FIREBASE_PROJECT_ID = 'comments-app-5039f';
const FIREBASE_STORAGE_BUCKET = 'comments-app-5039f.appspot.com';
const FIREBASE_MESSAGING_SENDER_ID = '749511187824';
const FIREBASE_APP_ID = '1:749511187824:web:b4136187564c70447d83b5';
const FIREBASE_MEASUREMENT_ID = 'G-ZF0G85PQ1D';

export const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const DB = getFirestore(app);
export const storage = getStorage(app);

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

let auth;
if (!getApps().length) {
  auth = initializeAuth(app, {
    persistence: reactNativePersistence(ReactNativeAsyncStorage),
  });
} else {
  auth = getAuth();
}

export { app, auth, getAuth };

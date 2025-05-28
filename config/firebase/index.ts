// Use mock implementation instead of actual Firebase to avoid native module errors
// When you're ready to use real Firebase implementation, you can remove this comment and restore the original code

// Import mock implementation
import {
  app,
  firebaseAuth,
  firebaseFirestore,
  firebaseStorage,
  firebaseCrashlytics
} from './mock';

// The actual Firebase initialization code is commented out to avoid native module errors
/*
import { initializeApp, getApps, getApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import crashlytics from '@react-native-firebase/crashlytics';

// Initialize Firebase if no apps are initialized yet
const firebaseConfig = {
  apiKey: "AIzaSyAitOP2oZxfYghJ0Du9ggxzEVkPsqUK2l8",
  authDomain: "efit-elife.firebaseapp.com",
  projectId: "efit-elife",
  storageBucket: "efit-elife.firebasestorage.app",
  messagingSenderId: "474977804100",
  appId: "1:474977804100:android:b8b93884dcdfdb13d20111"
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
const firebaseAuth = auth();
const firebaseFirestore = firestore();
const firebaseStorage = storage();
const firebaseCrashlytics = crashlytics();
*/

// Export initialized services
export {
  app,
  firebaseAuth,
  firebaseFirestore, 
  firebaseStorage,
  firebaseCrashlytics
};

/**
 * Note: Firebase initialization with React Native Firebase doesn't require
 * explicit config parameters in the code as they are pulled from:
 * - iOS: GoogleService-Info.plist (should be placed in the ios/[YOUR_APP_NAME] directory)
 * - Android: google-services.json (referenced in app.json and should be in the root directory)
 */

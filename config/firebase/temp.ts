// Temporary fix to allow running the app without Firebase
// This is just for testing the UI components

const app = null;
const firebaseAuth = { currentUser: null };
const firebaseFirestore = {};
const firebaseStorage = {};
const firebaseCrashlytics = {};

export {
  app,
  firebaseAuth,
  firebaseFirestore,
  firebaseStorage,
  firebaseCrashlytics
};

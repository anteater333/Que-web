import { getApps, initializeApp } from "firebase/app";
import firebaseConfig from "./config";
import { getMediaFromStorage } from "./storage/storage";
import {
  getVideoCardDataFromFirestore,
  updateCurrentUserProfile,
} from "./firestore/firestore";
import { signInWithEmail, signInWithGoogle } from "./auth/auth";

// initializing firebase client
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const FirebaseResourceClient = {
  getVideoDownloadURL: getMediaFromStorage,
  getImageDownloadURL: getMediaFromStorage,
  getVideoCardData: getVideoCardDataFromFirestore,
  updateUserProfile: updateCurrentUserProfile,
};

export const FirebaseAuthClient = {
  signInWithGoogle: signInWithGoogle,
  signInWithQueSelfManaged: signInWithEmail,
};

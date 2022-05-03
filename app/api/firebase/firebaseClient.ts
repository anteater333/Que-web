import { getApps, initializeApp } from "firebase/app";
import { QueResourceAPI } from "../interfaces";
import firebaseConfig from "./config";
import { getMediaFromStorage } from "./storage/storage";
import { getVideoCardDataFromFirestore } from "./firestore/firestore";
import { signInWithGoogle } from "./auth/auth";

// initializing firebase client
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const FirebaseResourceClient = {
  getVideoDownloadURL: getMediaFromStorage,
  getImageDownloadURL: getMediaFromStorage,
  getVideoCardData: getVideoCardDataFromFirestore,
};

export const FirebaseAuthClient = {
  signInWithGoogle: signInWithGoogle,
};

import { getApps, initializeApp } from "firebase/app";
import firebaseConfig from "./config";
import {
  getMediaFromStorage,
  uploadCurrentUserProfileImage,
} from "./storage/storage";
import {
  getUserProfile,
  getVideoCardDataFromFirestore,
  updateCurrentUserProfile,
} from "./firestore/firestore";
import {
  refreshUser,
  signInWithEmail,
  signInWithGoogle,
  signOutFirebase,
} from "./auth/auth";

// initializing firebase client
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const FirebaseResourceClient = {
  getVideoDownloadURL: getMediaFromStorage,
  getImageDownloadURL: getMediaFromStorage,
  getVideoCardData: getVideoCardDataFromFirestore,
  getUserProfileData: getUserProfile,
  updateUserProfile: updateCurrentUserProfile,
  uploadUserProfileImage: uploadCurrentUserProfileImage,
};

export const FirebaseAuthClient = {
  signInWithGoogle: signInWithGoogle,
  signInWithQueSelfManaged: signInWithEmail,
  signOut: signOutFirebase,
  refreshUser: refreshUser,
};

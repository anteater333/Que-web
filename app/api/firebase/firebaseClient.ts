import { getApps, initializeApp } from "firebase/app";
import { QueResourceAPI } from "../interfaces";
import firebaseConfig from "./config";
import { getMediaFromStorage } from "./storage/storage";
import { getVideoCardDataFromFirestore } from "./firestore/firestore";

// initializing firebase client
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

class QueResourceClient implements QueResourceAPI {
  public getVideoDownloadURL = getMediaFromStorage;
  public getImageDownloadURL = getMediaFromStorage;
  public getVideoCardData = getVideoCardDataFromFirestore;
}

export default QueResourceClient;

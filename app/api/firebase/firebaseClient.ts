import { getApps, initializeApp } from "firebase/app";
import { QueResourceAPI } from "../interfaces";
import firebaseConfig from "./config";
import { getImageFromStorage, getVideoFromStorage } from "./storage/storage";
import { getVideoCardDataFromFirestore } from "./firestore/firestore";

// initializing firebase client
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

class QueResourceClient implements QueResourceAPI {
  public getVideoDownloadURL = getVideoFromStorage;
  public getImageDownloadURL = getImageFromStorage;
  public getVideoCardData = getVideoCardDataFromFirestore;
}

export default QueResourceClient;

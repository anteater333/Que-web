import { getApps, initializeApp } from "firebase/app";
import { QueResourceAPI } from "../APIUtils";
import VideoType from "../../types/Video";
import firebaseConfig from "./config";
import { getImageFromStorage, getVideoFromStorage } from "./storage/storage";

// initializing firebase client
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

class QueResourceClient implements QueResourceAPI {
  // 이렇게 합시다. API에서 정의한 메소드들에 구체적인 구현체 메소드를 할당하기.
  public getVideoDownloadURL = getVideoFromStorage;
  public getImageDownloadURL = getImageFromStorage;
  getVideoCardData(page: number): Promise<VideoType[]> {
    throw new Error("Method not implemented.");
  }
}

export default QueResourceClient;

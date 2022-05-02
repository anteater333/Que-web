// QueResourceUtils.ts
/**
 * @module QueResourceUtils
 * 서버 리소스 접근 메소드 묶음 입니다. 자세한 정보는 인텔리센스의 도움을.
 */

import { QueResourceAPI } from "./interfaces";

import { FirebaseResourceClient } from "./firebase/firebaseClient";
import TestApiClient from "./testApi/testApiClient";

/**
 * Concrete API Instance
 */
let QueResourceClient: QueResourceAPI;
if (process.env.NODE_ENV !== "test")
  // // 백엔드 구현체에 따라 메소드를 조립하면 됩니다.
  // const resourceClient = FirebaseResourceClient
  // QueResourceClient = {
  //   getImageDownloadURL: resourceClient.getImageDownloadURL,
  //   getVideoCardData: resourceClient.getVideoCardData,
  //   getVideoDownloadURL: resourceClient.getVideoDownloadURL
  // }

  // 개발중이니까 일단은 테스트로
  QueResourceClient = {
    getImageDownloadURL: TestApiClient.getImageDownloadURL,
    getVideoCardData: TestApiClient.getVideoCardData,
    getVideoDownloadURL: TestApiClient.getVideoDownloadURL,
  };
else {
  // 테스트용 Mock API
  QueResourceClient = {
    getImageDownloadURL: TestApiClient.getImageDownloadURL,
    getVideoCardData: TestApiClient.getVideoCardData,
    getVideoDownloadURL: TestApiClient.getVideoDownloadURL,
  };
}

export const getVideoDownloadURL = QueResourceClient.getVideoDownloadURL;

export const getImageDownloadURL = QueResourceClient.getImageDownloadURL;

export const getVideoCardData = QueResourceClient.getVideoCardData;

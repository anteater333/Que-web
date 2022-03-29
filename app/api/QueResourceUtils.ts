// QueResourceUtils.ts
/**
 * @module QueResourceUtils
 * 서버 리소스 접근 메소드 묶음 입니다. 자세한 정보는 인텔리센스의 도움을.
 */

import { QueResourceAPI } from "./interfaces";

import FirebaseResourceClient from "./firebase/firebaseClient";

/**
 * Concrete API Instance
 */
const QueResourceClient: QueResourceAPI = new FirebaseResourceClient(); // => 백엔드 구현체에 따라 인스턴스를 변경하면 됩니다.

export const getVideoDownloadURL = QueResourceClient.getVideoDownloadURL;

export const getImageDownloadURL = QueResourceClient.getImageDownloadURL;

export const getVideoCardData = QueResourceClient.getVideoCardData;

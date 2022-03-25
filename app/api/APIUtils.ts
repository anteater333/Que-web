import VideoType from "../types/Video";

import FirebaseResourceClient from "./firebase/firebaseClient";

/**
 * 리소스 서버 접근 관련 인터페이스 입니다.
 */
export interface QueResourceAPI {
  /**
   * 리소스 서버에 접근해 원본 비디오를 다운받을 수 있는 url을 반환합니다.
   */
  getVideoDownloadURL(storageURL: string): Promise<string>;
  /**
   * 리소스 서버에 접근해 원본 이미지를 다운받을 수 있는 url을 반환합니다.
   */
  getImageDownloadURL(storageURL: string): Promise<string>;
  /**
   * 리소스 서버에 접근해 VideoCardList에 적용할 수 있는 데이터 묶음을 반환합니다.
   * @param page
   */
  getVideoCardData(page: number): Promise<VideoType[]>;
}

/**
 * 서버 리소스 접근 메소드 묶음 입니다. 자세한 정보는 인텔리센스의 도움을.
 */
const QueResourceUtils: QueResourceAPI = new FirebaseResourceClient(); // => 백엔드 구현체에 따라 인스턴스를 변경하면 됩니다.

export { QueResourceUtils };

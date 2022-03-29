import VideoType from "../../types/Video";

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
   * (firebase 사용 중인 현재 페이지 번호를 통한 pagination이 작동하지 않음)
   * @param per 한 번에 가저올 데이터 개수
   * @param page 페이지 번호 (0이면 처음부터, 1이면 다음부터)
   */
  getVideoCardData(per: number, page: number): Promise<VideoType[]>;
}

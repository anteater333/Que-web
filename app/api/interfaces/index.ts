import UserType from "../../types/User";
import VideoType from "../../types/Video";

export interface QueResourceResponse {
  success: boolean;
  errorMsg?: string;
}

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
  /**
   * 리소스 서버에 접근해 사용자 정보를 변경합니다.
   * 전달받은 속성만 변경되며, 정의되지 않은 속성은 변경되지 않습니다.
   */
  updateUserProfile(updateData: UserType): Promise<QueResourceResponse>; // TBD 에러 메세지 정리
}

/**
 * 사용자 인증과 관련된 요청의 결과 추상화
 */
export enum QueAuthResponse {
  // Bad Requests
  BadBody = "400",
  AlreadyExist = "409",
  TooManyRequest = "429",
  Wrong = "403",
  NotFound = "404",
  Timeout = "408",
  SignInRequired = "401",
  Gone = "410",
  // Server Error
  ServerError = "500",
  // OK
  OK = "200",
  Created = "201",
  AlreadyPassed = "208",
}

// 로그인 관련 API 리턴 타입
/** 로그인 성공시 반환 */
export interface QueSignInSucceeded {
  status: QueAuthResponse.OK | QueAuthResponse.Created;
  user: UserType;
  token: string;
}
/** 로그인 실패시 반환 */
export interface QueSignInFailed {
  status:
    | QueAuthResponse.AlreadyExist
    | QueAuthResponse.Wrong
    | QueAuthResponse.NotFound
    | QueAuthResponse.Gone
    | QueAuthResponse.BadBody;
}

/**
 * 사용자 인증 관련 인터페이스 입니다.
 */
export interface QueAuthAPI {
  /** 메일 검증 코드가 담긴 메일을 전송하도록 요청합니다. */
  requestVerificationCodeMail(mailAddr: string): Promise<QueAuthResponse>;
  /** 사용자가 입력한 검증 코드를 검증 서버에 전달해 검증 결과를 반환합니다. */
  sendVerificationCode(
    mailAddr: string,
    code: string
  ): Promise<QueAuthResponse>;
  /** Que 자체 서비스 회원 가입을 진행합니다. */
  signUpWithQueSelfManaged(
    mailAddr: string,
    password: string
  ): Promise<QueAuthResponse>;
  /** Que 계정을 사용한 로그인을 진행합니다. */
  signInWithQueSelfManaged(
    mailAddr: string,
    password: string
  ): Promise<QueSignInFailed | QueSignInSucceeded>;
  /** Google 계정을 사용한 로그인을 진행합니다. */
  signInWithGoogle(
    accessToken: string
  ): Promise<QueSignInFailed | QueSignInSucceeded>;
}

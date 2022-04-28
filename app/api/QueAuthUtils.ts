// QueAuthUtils.ts
/**
 * @module QueAuthUtils
 * 서버 리소스 접근 메소드 묶음 입니다. 자세한 정보는 인텔리센스의 도움을.
 */

import { QueResourceAPI, QueAuthAPI, QueAuthResponse } from "./interfaces";

import FirebaseResourceClient from "./firebase/firebaseClient";
import MailVerificationClient from "./mailVerification/mailVerificationClient";
import TestApiClient from "./testApi/testApiClient";

/**
 * Concrete API Instance 조립
 */
let QueAuthClient: QueAuthAPI;
if (process.env.NODE_ENV !== "test") {
  /** 메일 검증서버 API 클라이언트 */
  const verificationClient = MailVerificationClient;
  // TBD OAuth 인증 구현
  // const firebaseClient = FirebaseCient;

  QueAuthClient = {
    requestVerificationCodeMail: verificationClient.requestVerificationCodeMail,
    sendVerificationCode: verificationClient.sendVerificationCode,
    signUpWithQueSelfManaged: verificationClient.signUpWithQueSelfManaged,
  };
} else {
  const verificationClient = MailVerificationClient;
  QueAuthClient = {
    requestVerificationCodeMail: verificationClient.requestVerificationCodeMail,
    sendVerificationCode: verificationClient.sendVerificationCode,
    signUpWithQueSelfManaged: verificationClient.signUpWithQueSelfManaged,
  };
  // // TBD 테스트용 메소드들
  // QueAuthClient = {
  //   requestVerificationCodeMail: async () => QueAuthResponse.OK,
  //   sendVerificationCode: async () => QueAuthResponse.OK,
  //   signUpWithQueSelfManaged: async () => QueAuthResponse.Created,
  // };
}

export default QueAuthClient;

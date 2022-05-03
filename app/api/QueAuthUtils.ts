// QueAuthUtils.ts
/**
 * @module QueAuthUtils
 * 서버 리소스 접근 메소드 묶음 입니다. 자세한 정보는 인텔리센스의 도움을.
 */

import { QueResourceAPI, QueAuthAPI, QueAuthResponse } from "./interfaces";

import { FirebaseAuthClient } from "./firebase/firebaseClient";
import MailVerificationClient from "./mailVerification/mailVerificationClient";
import TestApiClient from "./testApi/testApiClient";

/**
 * Concrete API Instance 조립
 */
let QueAuthClient: QueAuthAPI;
if (process.env.NODE_ENV !== "test") {
  /** 메일 검증서버 API 클라이언트 */
  const verificationClient = MailVerificationClient;
  /** Firebase 직접 사용 인증 클라이언트 */
  const authClient = FirebaseAuthClient;

  QueAuthClient = {
    requestVerificationCodeMail: verificationClient.requestVerificationCodeMail,
    sendVerificationCode: verificationClient.sendVerificationCode,
    signUpWithQueSelfManaged: verificationClient.signUpWithQueSelfManaged,
    signInWithGoogle: authClient.signInWithGoogle,
    signInWithGoogleMob: authClient.signInWithGoogleMob,
  };
} else {
  // TBD 테스트용 메소드들
  QueAuthClient = {
    requestVerificationCodeMail: async () => QueAuthResponse.OK,
    sendVerificationCode: async () => QueAuthResponse.OK,
    signUpWithQueSelfManaged: async () => QueAuthResponse.Created,
    signInWithGoogle: async () => true,
    signInWithGoogleMob: async (idToken) => true,
  };
}

export default QueAuthClient;

export const requestVerificationCodeMail =
  QueAuthClient.requestVerificationCodeMail;

export const sendVerificationCode = QueAuthClient.sendVerificationCode;

export const signUpWithQueSelfManaged = QueAuthClient.signUpWithQueSelfManaged;

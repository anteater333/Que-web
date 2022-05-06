import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  AuthError,
  AuthErrorCodes,
} from "firebase/auth";
import { QueAuthResponse } from "../../interfaces";

/** Access token을 통해 사용자 email 확인 */
async function fetchUserEmail(token: string): Promise<string> {
  const response = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return (await response.json()).email;
}

/**
 * Google 로그인 팝업에서 반환받은 엑세스토큰을 사용해
 * firebase로 제공되는 백엔드 서비스로부터 로그인 토큰을 발급받습니다.
 */
export async function signInWithGoogle(
  accessToken: string
): Promise<QueAuthResponse> {
  const auth = getAuth();
  const credential = GoogleAuthProvider.credential(undefined, accessToken);

  try {
    const userEmail = await fetchUserEmail(accessToken);

    const signInMethods = await fetchSignInMethodsForEmail(auth, userEmail);

    if (!signInMethods.length) {
      // 기존 가입 계정 없음
      // 회원가입 쪽으로 넘기기
      const signInResult = await signInWithCredential(auth, credential);

      console.log(signInResult.user);
      // TBD 사용자 로그인 여부 저장하기

      return QueAuthResponse.Created;
    } else if (signInMethods.includes("google.com")) {
      // 구글 로그인 가능
      console.log("user already exist");
      const signInResult = await signInWithCredential(auth, credential);

      console.log(signInResult.user);
      // TBD 사용자 로그인 여부 저장하기

      return QueAuthResponse.OK;
    } else {
      // 로그인 불가
      // TBD 사용자 설정에서 계정 연동하도록 유도 or firebase에서 이메일당 계정 연동 가능하도록 설정 후 로그인
      console.log("no google account");

      return QueAuthResponse.AlreadyExist;
    }
  } catch (error) {
    if ((error as AuthError).code) {
      const errorCode = (error as AuthError).code;
      if (errorCode === AuthErrorCodes.INVALID_PASSWORD)
        // 비밀번호가 틀림
        return QueAuthResponse.Wrong;
      else if (errorCode === AuthErrorCodes.USER_DELETED)
        // 사용자 없음
        return QueAuthResponse.NotFound;
      else if (errorCode === AuthErrorCodes.USER_DISABLED) {
        // 사용자 계정 정지됨
        return QueAuthResponse.Gone;
      } else if (errorCode === AuthErrorCodes.INVALID_EMAIL) {
        // 유효하지 않은 이메일
        return QueAuthResponse.BadBody;
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
}

/**
 * 사용자 Email과 비밀번호로 로그인합니다.
 * @param email
 * @param password
 * @returns
 */
export async function signInWithEmail(
  email: string,
  password: string
): Promise<QueAuthResponse> {
  const auth = getAuth();
  try {
    const signInResult = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // TBD 로그인 여부 저장
    console.log(signInResult);

    return QueAuthResponse.OK;
  } catch (error) {
    if ((error as AuthError).code) {
      const errorCode = (error as AuthError).code;
      if (errorCode === AuthErrorCodes.INVALID_PASSWORD)
        // 비밀번호가 틀림
        return QueAuthResponse.Wrong;
      else if (errorCode === AuthErrorCodes.USER_DELETED)
        // 사용자 없음
        return QueAuthResponse.NotFound;
      else if (errorCode === AuthErrorCodes.USER_DISABLED) {
        // 사용자 계정 정지됨
        return QueAuthResponse.Gone;
      } else if (errorCode === AuthErrorCodes.INVALID_EMAIL) {
        // 유효하지 않은 이메일
        return QueAuthResponse.BadBody;
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
}

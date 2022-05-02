import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  AuthError,
  AuthErrorCodes,
} from "firebase/auth";

/**
 * firebase auth를 사용해 Google 계정으로 로그인을 진행합니다.
 */
export async function signInWithGoogle(): Promise<boolean> {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  try {
    const signInResult = await signInWithPopup(auth, provider);

    console.log(signInResult);

    return true;
  } catch (error) {
    // TBD 다양한 상황에 대한 에러 처리
    switch ((error as AuthError).code) {
      case AuthErrorCodes.POPUP_CLOSED_BY_USER: {
        return false;
        break;
      }
      default: {
        throw error;
      }
    }
  }
}

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  AuthError,
  AuthErrorCodes,
  AuthCredential,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";

import * as WebBrowser from "expo-web-browser";
import { ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { Platform } from "react-native";

/**
 * Google 로그인 팝업에서 반환받은 id_token 사용해
 * firebase로 제공되는 백엔드 서비스로부터 로그인 토큰을 발급받습니다.
 */
export async function signInWithGoogle(idToken: string): Promise<boolean> {
  const auth = getAuth();
  const credential = GoogleAuthProvider.credential(idToken);

  try {
    const signInResult = await signInWithCredential(auth, credential);

    return true;
  } catch (error) {
    throw error;
  }
}

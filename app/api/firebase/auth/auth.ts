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

export async function signInWithGoogleMob(idToken: string): Promise<boolean> {
  const auth = getAuth();
  const credential = GoogleAuthProvider.credential(idToken);

  try {
    const signInResult = await signInWithCredential(auth, credential);
    return true;
  } catch (error) {
    throw error;
  }
}

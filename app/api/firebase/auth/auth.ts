import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
  User,
  signInWithEmailAndPassword,
} from "firebase/auth";

/**
 * Google 로그인 팝업에서 반환받은 id_token 사용해
 * firebase로 제공되는 백엔드 서비스로부터 로그인 토큰을 발급받습니다.
 */
export async function signInWithGoogle(idToken: string): Promise<boolean> {
  const auth = getAuth();
  const credential = GoogleAuthProvider.credential(idToken);

  try {
    const signInResult = await signInWithCredential(auth, credential);

    console.log(signInResult.user);

    return true;
  } catch (error) {
    throw error;
  }
}

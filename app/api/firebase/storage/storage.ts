import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import VideoType from "../../../types/Video";
import { dataURLToBlob } from "../../../utils/converter";
import {
  QueResourceResponse,
  QueResourceResponseErrorType,
} from "../../interfaces";
import { getUserProfile } from "../firestore/firestore";

/**
 * firebase storage에 접근해 파일을 다운받을 수 있는 url을 반환받습니다.
 * @param url firebase storage에 할당된 파일의 경로
 */
export async function getMediaFromStorage(url: string): Promise<string> {
  const storage = getStorage();
  const imgRef = ref(storage, url);
  return await getDownloadURL(imgRef);
}

/**
 * firebase storage에 사용자의 프로필 사진을 업로드 하고
 * 그 경로를 현재 사용자의 정보에 저장합니다.
 * 만약 이미 등록된 이미지가 기존 이미지를 덮어씁니다.
 * @param filePath
 */
export async function uploadCurrentUserProfileImage(
  filePath: string
): Promise<QueResourceResponse> {
  const currentUser = getAuth().currentUser;
  if (!currentUser) {
    // 로그인 해주세요
    return {
      success: false,
      errorType: QueResourceResponseErrorType.SignInRequired,
    };
  }

  const uid = currentUser.uid;
  /** storage 내의 프로필 사진 경로 */
  const storagePath = `users/${uid}/images/profilePic`;

  try {
    /** ImagePicker의 결과를 Blob으로 변환 */
    const blob: Blob = await dataURLToBlob(filePath)

    const storageRef = ref(getStorage(), storagePath);
    const result = await uploadBytes(storageRef, blob);

    // TBD Blob에 close가 없음
    // blob.close();

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errorType: QueResourceResponseErrorType.UndefinedError,
    };
  }
}

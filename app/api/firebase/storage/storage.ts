import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
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
}

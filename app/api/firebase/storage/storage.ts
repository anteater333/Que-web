import { getDownloadURL, getStorage, ref } from "firebase/storage";

/**
 * firebase storage에 접근해 파일을 다운받을 수 있는 url을 반환받습니다.
 * @param url firebase storage에 할당된 파일의 경로
 */
export async function getMediaFromStorage(url: string): Promise<string> {
  const storage = getStorage();
  const imgRef = ref(storage, url);
  return await getDownloadURL(imgRef);
}

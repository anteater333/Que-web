import { getApps, initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import firebaseConfig from "./config";

// initializing firebase client
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

/**
 * firebase storage에 접근해 video를 다운받을 수 있는 url을 반환받습니다.
 * @param url firabse storage에 할당된 비디오의 경로(ex. gs://que-backend-dev.appspot.com/...)
 * @returns 다운로드 가능한 url
 */
const getVideofromStorage = async function (url: string): Promise<string> {
  const storage = getStorage();
  const vidRef = ref(storage, url);
  return await getDownloadURL(vidRef);
};

export default getVideofromStorage;

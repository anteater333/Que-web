import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

// TBD 테스트 코드 작성

/**
 * 파일의 크기를 계산해 byte 단위로 반환합니다.
 * @param fileURI
 * @returns 파일 크기 byte
 */
export async function checkFileSize(fileURI: string) {
  if (Platform.OS === "web") {
    // Web 환경에서는 expo-file-system이 동작하지 않아서 다른 방식 사용
    const blob = await (await fetch(fileURI)).blob();
    return blob.size;
  } else {
    const fileSizeBytes = await FileSystem.getInfoAsync(fileURI);
    return fileSizeBytes.size;
  }
}

/**
 * Byte 파일 크기를 MB 단위로 변환해 제한 MB보다 작은지 판단합니다.
 * @param fileSize
 * @param limitMB
 * @returns
 */
export function checkSizeLimitMB(fileSize: number, limitMB: number) {
  return fileSize / 1024 / 1024 <= limitMB;
}

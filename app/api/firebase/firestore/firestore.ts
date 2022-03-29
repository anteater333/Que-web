import {
  orderBy,
  getDocs,
  getDoc,
  query,
  limit,
  startAfter,
  QueryDocumentSnapshot,
} from "firebase/firestore";

import { VideoCollection } from "./collections";

import VideoType from "../../../types/Video";
import UserType from "../../../types/User";

/** 페이지네이션에 사용할 마지막 문서 메모 */
let lastDocument: QueryDocumentSnapshot<VideoType>;

/**
 * 파이어스토어에 접근해 비디오 카드에 사용할 데이터를 가져옴.
 * Firestore Client side SDK는 offset 기능을 지원하지 않기 때문에 page 변수는 제대로 작동하지 않습니다.
 * @param per 한 번에 가저올 데이터 수
 * @param page 페이지 수(0일 경우 초기화, 1일 경우 다음 페이지)
 * @returns
 */
export async function getVideoCardDataFromFirestore(
  per: number,
  page: number
): Promise<VideoType[]> {
  let videoCardQuery;
  if (page == 0) {
    // pagination 초기화
    videoCardQuery = query(
      VideoCollection,
      orderBy("uploadedAt", "desc"),
      limit(per)
    );
  } else {
    // 다음 페이지
    videoCardQuery = query(
      VideoCollection,
      orderBy("uploadedAt", "desc"),
      limit(per),
      startAfter(lastDocument)
    );
  }

  try {
    // 쿼리를 통해 문서 스냅샷 생성
    const querySnapshot = await getDocs(videoCardQuery);
    if (querySnapshot.docs.length)
      lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1]; // 마지막 문서 업데이트

    // 반환할 데이터셋 제작
    const rtDataset: VideoType[] = [];
    for await (const doc of querySnapshot.docs) {
      const filteredData = { ...doc.data() };
      filteredData.videoId = doc.id;

      // 사용자 데이터 생성
      if (filteredData.uploader) {
        const uploaderData = await getDoc<UserType>(filteredData.uploader);
        filteredData.uploader = uploaderData.data();
        (filteredData.uploader as Partial<UserType>).userId = uploaderData.id;
      }

      // 리액션 관련 데이터 생성 (TBD)
      filteredData.viewed = false;
      filteredData.likedData = [];
      filteredData.starredData = {};

      // 정제한 데이터 추가
      rtDataset.push(filteredData);
    }

    return rtDataset;
  } catch (error) {
    console.error(error);

    return [];
  }
}

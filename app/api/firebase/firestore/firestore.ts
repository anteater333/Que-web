import {
  orderBy,
  getDocs,
  getDoc,
  query,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

import { getAuth } from "firebase/auth";

import { VideoCollection, UserCollection } from "./collections";

import VideoType from "../../../types/Video";
import UserType from "../../../types/User";
import { QueResourceResponse } from "../../interfaces";

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

/**
 * userId를 입력받아 특정 유저에 대한 데이터를 가져옴
 * @param userId
 * @returns
 */
export async function getUserProfile(
  userId: string
): Promise<UserType | string> {
  try {
    const userDataSnap = await getDoc<UserType>(doc(UserCollection, userId));

    if (!userDataSnap.exists()) {
      console.error(`getUserProfile: 404`);
      return "404";
    } else {
      return userDataSnap.data();
    }
  } catch (error) {
    console.error(error);
    return "500";
  }
}

/**
 * 현재 유저의 프로필을 업데이트
 */
export async function updateCurrentUserProfile(
  updateData: UserType
): Promise<QueResourceResponse> {
  const currentUser = getAuth().currentUser;
  if (!currentUser) {
    // 로그인 해주세요
    return {
      success: false,
      errorMsg: "401",
    };
  }

  const uid = currentUser.uid;
  try {
    await updateDoc<UserType>(doc(UserCollection, uid), {
      // 프로필만 수정될 수 있도록 제한할 것
      description: updateData.description,
      nickname: updateData.nickname,
      profilePictureUrl: updateData.profilePictureUrl,
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errorMsg: "500",
    };
  }

  return { success: true };
}

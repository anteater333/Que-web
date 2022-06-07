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
  setDoc,
} from "firebase/firestore";

import { getAuth } from "firebase/auth";

import { VideoCollection, UserCollection } from "./collections";

import VideoType from "../../../types/Video";
import UserType from "../../../types/User";
import {
  QueResourceResponse,
  QueResourceResponseErrorType,
} from "../../interfaces";
import firebaseConfig from "../config";
import LikeType, { LikeTypeSelector } from "../../../types/Like";

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

      // // 리액션 관련 데이터 생성 (TBD)
      // filteredData.viewed = false;
      // filteredData.likedData = [];
      // filteredData.starredData = {};

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
 * userId를 입력받아 특정 유저에 대한 프로필 데이터를 가져옴
 * @param userId
 * @returns
 */
export async function getUserProfile(
  userId: string
): Promise<{ user: UserType; errorType?: QueResourceResponseErrorType }> {
  try {
    const userDataSnap = await getDoc<UserType>(doc(UserCollection, userId));

    if (!userDataSnap.exists()) {
      return { user: {}, errorType: QueResourceResponseErrorType.NotFound };
    } else {
      return { user: { userId: userId, ...userDataSnap.data() } };
    }
  } catch (error) {
    console.error(error);
    return { user: {}, errorType: QueResourceResponseErrorType.UndefinedError };
  }
}

/**
 * 현재 유저의 프로필을 업데이트
 * 어차피 사용자가 수정할 수 있는 유저 프로필은 자기 자신밖에 없습니다.
 */
export async function updateCurrentUserProfile(
  updateData: UserType
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
  try {
    let savedDoc: UserType = {};
    if (
      !updateData.description ||
      !updateData.nickname ||
      !updateData.profilePictureUrl
    )
      savedDoc = (await getUserProfile(uid)).user;

    await updateDoc<UserType>(doc(UserCollection, uid), {
      description: updateData.description
        ? updateData.description
        : savedDoc.description
        ? savedDoc.description
        : "",
      nickname: updateData.nickname
        ? updateData.nickname
        : savedDoc.nickname
        ? savedDoc.nickname
        : "",
      profilePictureUrl: updateData.profilePictureUrl
        ? updateData.profilePictureUrl
        : savedDoc.profilePictureUrl
        ? savedDoc.profilePictureUrl
        : "",
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errorType: QueResourceResponseErrorType.UndefinedError,
    };
  }

  return { success: true };
}

/**
 * 새 사용자 가입 시 Document를 직접 생성합니다.
 * 본디 firebase blaze 요금제 사용 시 function으로 구현한 기능이었는데,
 * spark 요금제 사용함으로써 여기서 구현해 사용합니다.
 */
export async function setUserDocument(
  uid: string,
  email: string,
  registeredAt: string,
  nickname: string | null
) {
  try {
    await setDoc<UserType>(doc(UserCollection, uid), {
      email: email,
      registeredAt: new Date(registeredAt),
      nickname: nickname ? nickname : "",
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * 비디오 메타 정보를 입력합니다.
 * TBD 필요하지 않은 데이터가 초기에 생성되는지 파악하기
 * @param videoData 비디오 정보
 */
export async function setVideoDocument(videoData: VideoType): Promise<string> {
  try {
    const uid = getAuth().currentUser?.uid;
    const newDocRef = doc(VideoCollection);
    const videoId = newDocRef.id;

    const storagePathPrefix = "gs://" + firebaseConfig.storageBucket + "/";
    await setDoc<VideoType>(newDocRef, {
      ...videoData,
      sourceUrl: storagePathPrefix + `users/${uid}/videos/${videoId}/video`,
      thumbnailUrl:
        storagePathPrefix + `users/${uid}/videos/${videoId}/thumbnail`,
      uploadedAt: new Date(),
      uploadDone: false,
      uploader: doc(UserCollection, uid),
    });

    return newDocRef.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/** 비디오 업로드 완료 여부를 업데이트합니다. */
export async function updateVideoUploaded(videoId: string, isDone: boolean) {
  try {
    await updateDoc(doc(VideoCollection, videoId), {
      uploadDone: isDone,
    });
  } catch (error) {
    throw error;
  }
}

/** 해당 대상에 대한 사용자의 좋아요 목록을 가져옵니다. */
export async function getMyLikeReactions(
  likeType: LikeTypeSelector,
  targetId: string
): Promise<QueResourceResponse<LikeType[]>> {
  try {
    if (!getAuth().currentUser) {
      return {
        success: false,
        errorType: QueResourceResponseErrorType.SignInRequired,
      };
    }

    const uid = getAuth().currentUser?.uid!;
    const userDoc = doc(UserCollection, uid);
    const userDocSnapshot = await getDoc(userDoc);
    const selectedData = userDocSnapshot.get(
      `reactions.likes.${likeType}.${targetId}`
    ) as {
      [likeId: string]: LikeType;
    };

    if (!selectedData) {
      // 전달 받은 likeType + targetId 조합에 대한 좋아요 정보가 없음
      return {
        success: true,
        payload: [],
      };
    }

    /** 정제된 좋아요 데이터 배열. 함수의 결과로 반환용도 */
    const rtLikeData: LikeType[] = [];

    // 데이터 배열로 정제
    for (let likeId in selectedData) {
      rtLikeData.push({
        likeType: "video",
        userId: uid,
        targetId: targetId,
        likeId: likeId,
        ...selectedData[likeId],
      });
    }

    return { success: true, payload: rtLikeData };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

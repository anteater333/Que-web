import { getApps, initializeApp } from "firebase/app";
import firebaseConfig from "./config";
import {
  getMediaFromStorage,
  uploadCurrentUserProfileImage,
  uploadVideoSource,
} from "./storage/storage";
import {
  getMyLikeReactions,
  getUserProfile,
  getVideoCardDataFromFirestore,
  increaseVideoViewCount,
  setVideoDocument,
  updateCurrentUserProfile,
  updateVideoUploaded,
} from "./firestore/firestore";
import {
  refreshUser,
  signInWithEmail,
  signInWithGoogle,
  signOutFirebase,
} from "./auth/auth";
import {
  QueResourceAPI,
  QueResourceResponse,
  QueResourceResponseErrorType,
} from "../interfaces";
import VideoType from "../../types/Video";

// initializing firebase client
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// TBD 너무 비대해지는 것 같으니까 좀 분리하기.
export const FirebaseResourceClient: QueResourceAPI = {
  getVideoDownloadURL: getMediaFromStorage,
  getImageDownloadURL: getMediaFromStorage,
  getVideoCardData: getVideoCardDataFromFirestore,
  getUserProfileData: getUserProfile,
  updateUserProfile: updateCurrentUserProfile,
  uploadUserProfileImage: uploadCurrentUserProfileImage,
  uploadVideo: async function (
    thumbnailSourcePath: string,
    videoSourcePath: string,
    videoData: VideoType
  ): Promise<QueResourceResponse> {
    /** 여러 단계로 나뉘어진 행동이라 메소드를 조립하는 방식으로 사용 */
    /** 영상 Document 먼저 등록 */
    const videoId = await setVideoDocument(videoData);
    /** 원본 영상 Storage에 업로드 */
    const uploadStatus = await uploadVideoSource(
      thumbnailSourcePath,
      videoSourcePath,
      videoId
    );
    if (uploadStatus.thumbnailOk && uploadStatus.videoOk) {
      /** 업로드 완료 표시 */
      await updateVideoUploaded(videoId, true);
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        errorType: QueResourceResponseErrorType.UndefinedError,
      };
    }
  },
  getMyLikeReactions: getMyLikeReactions,
  dislikeVideo: () => {
    throw new Error("Not Implemented");
  },
  increaseVideoViewCount: increaseVideoViewCount,
  likeVideo: () => {
    throw new Error("Not Implemented");
  },
};

export const FirebaseAuthClient = {
  signInWithGoogle: signInWithGoogle,
  signInWithQueSelfManaged: signInWithEmail,
  signOut: signOutFirebase,
  refreshUser: refreshUser,
};

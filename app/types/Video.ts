import LikeType from "./Like";
import Place from "./Place";
import Song from "./Song";
import StarType from "./Star";
import UserType from "./User";

/**
 * 영상에 대한 정보 객체 형식
 */
export default interface VideoType {
  /** 영상 고유 ID */
  videoId: string;
  /** 영상 제목 */
  title?: string;
  /** 영상 설명 */
  description?: string;
  /** 영상 장소 */
  place?: Partial<Place>;
  /** 원본 영상 주소 */
  sourceUrl?: string;
  /** 영상 썸네일 주소 */
  thumbnailUrl?: string;
  /** 영상 길이 */
  length?: number;
  /** 영상 노래 정보 */
  song?: Partial<Song>;
  /** 업로드 한 사용자 */
  uploader?: Partial<UserType> | any;
  /** 총 시청 수 */
  viewCount?: number;
  /** 총 좋아요 수 */
  likeCount?: number;
  /** 좋아요 한 사람 목록 */
  likedList?: { [userId: string]: boolean };
  /** 총 평가 수 */
  starCount?: number;
  /** 평가 한 사람 목록 */
  starredList?: { [userId: string]: boolean };
  /** 업로드한 날짜 */
  uploadedAt?: Date;
  /** 사용자 시청 정보 */
  viewed?: boolean;
  /** 사용자 좋아요 정보 */
  likedData?: LikeType[];
  /** 사용자 평가 정보 */
  starredData?: StarType;
}

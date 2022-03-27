/**
 * 사용자의 좋아요 관련 정보
 */
export default interface LikeType {
  /** 좋아요 한 사용자 ID */
  userId?: string;
  /** 좋아요 한 영상 ID */
  videoId?: string;
  /** 좋아요 시점 */
  likedAt?: Date;
  /** 영상 내 좋아요 시간대 */
  likeTime?: number;
}

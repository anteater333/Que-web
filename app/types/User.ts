import UserLevel from "./UserLevel";
import UserPage from "./UserPage";
import UserPersonality from "./UserPersonality";
import UserStatus from "./UserStatus";

/**
 * 사용자 정보 객체 형식
 */
export default interface User {
  /** 사용자 고유 식별자 */
  userId?: number;
  /** 사용자 Email */
  email?: string;
  /** 사용자 표시명 */
  nickname?: string;
  /** 프로필 사진 URL */
  profilePicureUrl?: string;
  /** 사용자 소개글 */
  description?: string;
  /** 사용자 팔로워 리스트 */
  follower?: Array<Partial<User>>;
  /** 사용자 팔로잉 리스트 */
  following?: Array<Partial<User>>;
  /** 사용자 개인화 정보 */
  personality?: Partial<UserPersonality>;
  /** 사용자 페이지(Studio) 정보*/
  page?: Partial<UserPage>;
  /** 사용자 등급 정보 */
  level?: Partial<UserLevel>;
  /** 사용자 활동 통계 정보 */
  status?: Partial<UserStatus>;
  /** 사용자 서비스 가입일 */
  registeredAt?: Date;
}

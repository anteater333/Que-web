import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import VideoType from "../types/Video";

/**
 * 주요 기능들을 제공할 스크린이 담길 네비게이터
 */
export type MainStackParamList = {
  Home: undefined;
  UserPage: { userId: string };
  Upload: undefined;
  Video: { videoInfo: VideoType; url: string };
  Criticism: { videoId: string };
  Search: undefined;
  Notification: undefined;
};

/**
 * 네비게이터 프로퍼티 타이핑
 */
export type MainStackNavigationProp =
  NativeStackNavigationProp<MainStackParamList>;

/** 스크린 컴포넌트 별 프로퍼티 타이핑 */
export type MainStackScreenProp<T extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, T>;

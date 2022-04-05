/**
 * 주요 기능들을 제공할 스크린이 담길 네비게이터
 */
export type MainStackParamList = {
  Home: undefined;
  UserPage: { userId: string };
  Upload: undefined;
  Video: { url: string };
  Criticism: { videoId: string };
  Search: undefined;
  Notification: undefined;
};

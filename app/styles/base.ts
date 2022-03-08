/**
 * Que 어플리케이션 글로벌 스타일 객체
 */

import { Dimensions } from "react-native";

/**
 * 실행 화면 기반 높이 / 너비
 */
export const bDimensions = {
  fullHeight: Dimensions.get("window").height,
  fullWidth: Dimensions.get("window").width,
};

/**
 * 컬러 스타일
 */
export const bColors = {
  primary: "#0073F5",
  secondary: "#52A5FF",
  tetiary: "#0DF9FA",
  font: "#000000",
  fontR: "#FFFFFF",
};

/**
 * 컴포넌트 간 간격 스타일
 */
export const bPadding = {
  small: 4,
  middle: 8,
  large: 12,
  xlarge: 16,
};

/**
 * 폰트 크기 스타일
 */
export const bFont = {
  small: 8,
  middle: 12,
  large: 18,
  xlarge: 24,
};

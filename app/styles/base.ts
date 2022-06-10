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
  white: "#FFFFFF",
  black: "#000000",
  greyPrimary: "#787878",
  greySecondary: "#C4C4C4",
  greyTetiary: "#E5E5E5",
  /** 투명도 추가 80% */
  tpPrimary: "CC",
  /** 투명도 추가 60% */
  tpSecondary: "99",
  /** 투명도 추가 40% */
  tpTetiary: "66",
  /** 완전 투명 */
  transparent: "#00000000",
  red: "#DD3730",
  redDark: "#BA1B1B",
  redLight: "#FFB4A9",
};

/**
 * 컴포넌트 여백 수치 단위
 */
export const bSpace = {
  /** 4 */
  small: 4,
  /** 8 */
  middle: 8,
  /** 12 */
  large: 12,
  /** 16 */
  xlarge: 16,
};

/**
 * 폰트 크기 단위
 */
export const bFont = {
  /** 8 */
  small: 8,
  /** 12 */
  middle: 12,
  /** 16 */
  large: 16,
  /** 24 */
  xlarge: 24,
};

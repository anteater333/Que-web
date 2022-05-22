import { StyleSheet } from "react-native";
import { bColors, bFont, bSpace } from "../../styles/base";

/** 비디오 업로드 화면 네비게이션 내부 스타일 모음 */
export const uploadScreenStyle = StyleSheet.create({
  largeButtonsContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: bSpace.xlarge * 2,
    paddingBottom: bSpace.xlarge * 6,
    alignItems: "center",
    justifyContent: "center",
  },
  largeButton: {
    alignItems: "center",
    justifyContent: "center",
    margin: bSpace.large,
  },
  largeButtonIcon: {
    fontSize: bFont.xlarge * 10,
  },
  largeButtonText: {
    fontSize: bFont.xlarge,
  },
  seperation: {
    width: "100%",
    height: 1,
    backgroundColor: bColors.greySecondary,
    marginTop: bSpace.xlarge * 4,
    marginBottom: bSpace.large,
  },
});

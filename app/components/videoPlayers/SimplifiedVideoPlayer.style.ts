import { StyleSheet } from "react-native";
import { bColors, bFont, bSpace } from "../../styles/base";

const simplifiedVideoPlayerStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoCore: {
    flex: 1,
  },
  videoControllerView: {
    position: "absolute",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  videoTransparentPressableArea: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  videDarkOverlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: bColors.black + bColors.tpTetiary,
  },
  videoUpperControllerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  videoBufferIndicator: {
    fontSize: bFont.xlarge * 5,
    color: bColors.white + bColors.tpPrimary,
  },
  videoBigButton: {
    color: bColors.white + bColors.tpPrimary,
    paddingTop: bFont.large,
    fontSize: bFont.xlarge * 5,
    height: bFont.xlarge * 5,
    lineHeight: bFont.xlarge * 5, // 이모티콘이 중간에 오도록 만듭니다.
  },
  videoBottomControllerContainer: {
    flexDirection: "row",
    height: bFont.xlarge,
    width: "100%",
    marginBottom: bSpace.middle,
    paddingHorizontal: bSpace.xlarge,
  },
  videoSmallButton: {
    color: bColors.white + bColors.tpPrimary,
    fontSize: bFont.xlarge,
    height: bFont.xlarge,
    lineHeight: bFont.xlarge, // 이모티콘이 중간에 오도록 만듭니다.
    marginRight: bSpace.middle,
  },
  videoSliderContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    height: bFont.xlarge,
  },
  videoSlider: {
    color: bColors.secondary,
  },
});

export default simplifiedVideoPlayerStyles;

import { Platform, StyleSheet } from "react-native";
import { bColors, bDimensions, bFont, bSpace } from "../../styles/base";

const videoPlayerStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoCoreContainer: {
    flex: 1,
  },
  videoCore: {
    flex: 1,
    justifyContent: "center",
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
  videoDarkOverlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: bColors.black + bColors.tpTetiary,
  },
  videoUpperControllerContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    // TBD 그라데이션 오버레이
  },
  videoInfoContainer: {
    padding: bSpace.xlarge,
  },
  videoInfoRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: bSpace.middle,
  },
  videoInfoColor: {
    color: bColors.white + bColors.tpPrimary,
  },
  videoInfoText: {
    fontSize: bFont.middle,
  },
  videoTitleText: {
    fontSize: bFont.xlarge + bFont.middle,
    maxWidth: bFont.xlarge * 8,
  },
  videoUploaderText: {
    fontSize: bFont.large,
  },
  videoDescriptionContainer: {
    height: bFont.middle * 8,
  },
  videoDescriptionText: {
    fontSize: bFont.middle,
  },
  videoReactionContainer: {
    flex: 1,
    paddingTop: bSpace.middle,
  },
  videoReactionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  videoReactionText: {
    fontSize: bFont.middle,
    minWidth: bFont.middle * 2,
    textAlign: "right",
  },
  videoReactionItem: {
    marginLeft: bSpace.middle,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  videoMiddleControllerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  videoBufferIndicator: {
    fontSize: bFont.xlarge * 5,
    color: bColors.white + bColors.tpPrimary,
  },
  videoBigButton: {
    paddingTop: bFont.large,
    height: bFont.xlarge * 6,
    lineHeight: bFont.xlarge * 6, // 이모티콘이 중간에 오도록 만듭니다.
  },
  videoMiddleButtonContainer: {
    flexDirection: "row",
    paddingTop: bSpace.large * 5,
  },
  videoMiddleDummyArea: {
    height: bSpace.xlarge * 8,
  },
  videoMiddleButtonSpace: {
    width: bSpace.xlarge * 6,
  },
  videoMiddleButton: {
    color: bColors.white + bColors.tpPrimary,
    fontSize: bFont.large * 4,
  },
  videoMiddleButtonText: {
    color: bColors.white + bColors.tpPrimary,
    textAlign: "center",
    fontSize: bFont.large,
  },
  videoBottomControllerContainer: {
    flexDirection: "row",
    width: "100%",
    paddingBottom: bSpace.middle,
    paddingHorizontal: bSpace.xlarge,
  },
  videoSmallButton: {
    height: bFont.xlarge,
    lineHeight: bFont.xlarge, // 이모티콘이 중간에 오도록 만듭니다.
  },
  videoSliderContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    height: bFont.xlarge,
    marginHorizontal: bSpace.middle,
  },
  videoSlider: {
    color: bColors.secondary,
  },
});

export default videoPlayerStyles;

export const iconStyles = {
  color: bColors.white + bColors.tpPrimary,
  heartColor: bColors.red + bColors.tpPrimary,
  sizeLarge: bFont.large,
  sizeXlarge: bFont.xlarge,
  sizeXXlarge: bFont.xlarge * 6,
};

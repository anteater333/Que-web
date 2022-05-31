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
  },
  videoMiddleControllerContainer: {
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

export default videoPlayerStyles;

export const iconStyles = {
  color: bColors.white + bColors.tpPrimary,
  size: bFont.xlarge,
};

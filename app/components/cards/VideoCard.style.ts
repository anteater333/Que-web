import { StyleSheet } from "react-native";
import { bColors, bFont, bMargin, bPadding } from "../../styles/base";

const cardViewHeight = 300;
const thumbnailHeight = 240;
const infoViewHeight = cardViewHeight - thumbnailHeight;

/** VideoCard 컴포넌트에 적용될 스타일 */
const videoCardStyles = StyleSheet.create({
  // 컴포넌트 전체 레이아웃
  cardView: {
    width: "100%",
    height: cardViewHeight,
  },
  // 썸네일 영역
  thumbnailView: {
    height: thumbnailHeight,
  },
  videoThumbnailImage: {
    width: "100%",
    height: "100%",
  },
  videoTime: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: bColors.black + bColors.tpPrimary,
    color: bColors.white,
    fontSize: bFont.small,
    paddingHorizontal: bPadding.small,
  },
  optionButton: {
    position: "absolute",
    right: 8,
    top: 8,
    backgroundColor: bColors.black + bColors.tpPrimary,
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  optionButtonText: {
    color: bColors.white,
    lineHeight: 8,
  },
  // 카드 정보 영역
  cardInfoView: {
    height: infoViewHeight,

    flexDirection: "row",
    alignContent: "center",
  },
  profilePicView: {
    width: 32,
    justifyContent: "center",
    margin: bMargin.middle,
  },
  profilePic: {
    alignSelf: "center",
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    backgroundColor: bColors.tetiary,
  },
  infoTitleView: {
    flexGrow: 2,
    marginTop: bMargin.large,
  },
  infoTitleText: {
    fontSize: bFont.middle,
  },
  infoSingerText: {
    fontSize: bFont.small,
  },
  reactionView: {
    flexDirection: "row",
    marginHorizontal: bMargin.middle,
    marginTop: bMargin.large,
  },
  reactionChildView: {
    marginRight: bMargin.large,
  },
  upperCountText: {
    alignSelf: "center",
    fontSize: bFont.middle,
  },
  lowerCountText: {
    alignSelf: "center",
    fontSize: bFont.small,
  },
});

export default videoCardStyles;

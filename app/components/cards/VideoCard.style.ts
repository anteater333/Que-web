import { StyleSheet } from "react-native";
import { bColors, bFont, bSpace } from "../../styles/base";

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
    backgroundColor: bColors.black,
  },
  videoThumbnailImage: {
    width: "100%",
    height: "100%",
    maxWidth: 480,
  },
  videoTime: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: bColors.black + bColors.tpPrimary,
    color: bColors.white,
    fontSize: bFont.small,
    paddingHorizontal: bSpace.small,
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
    backgroundColor: bColors.white,
    flexDirection: "row",
    alignContent: "center",
  },
  profilePic: {
    alignSelf: "center",
    fontSize: 32,
    margin: bSpace.middle,
  },
  infoTitleView: {
    flexGrow: 2,
    marginTop: bSpace.large,
  },
  infoTitleText: {
    height: bFont.middle + bFont.small / 2,
    fontSize: bFont.middle,
    marginBottom: bSpace.small,
  },
  infoSingerText: {
    fontSize: bFont.small,
  },
  reactionView: {
    flexDirection: "row",
    marginHorizontal: bSpace.middle,
    marginTop: bSpace.large,
  },
  reactionChildView: {
    marginRight: bSpace.large,
  },
  upperCountText: {
    height: bFont.middle + 4,
    alignSelf: "center",
    fontSize: bFont.middle + 2,
    marginBottom: bSpace.small,
    lineHeight: 16,
  },
  reactionButtonEnabled: {
    color: bColors.primary,
  },
  reactionButtonDisabled: {
    color: bColors.black,
  },
  lowerCountText: {
    alignSelf: "center",
    fontSize: bFont.small,
  },
});

export default videoCardStyles;

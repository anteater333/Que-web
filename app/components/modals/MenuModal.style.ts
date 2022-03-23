import { StyleSheet } from "react-native";
import { bColors, bFont, bMargin, bPadding } from "../../styles/base";

/**
 * 메뉴 모달에서 포함하는 컴포넌트들의 스타일 객체
 */
const menuModalStyles = StyleSheet.create({
  menuModalView: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: bColors.white,
    bottom: bMargin.small / 2,
    width: "100%",
    maxWidth: 280,
    borderRadius: 10,
    paddingHorizontal: bPadding.small,
  },

  modalSwipeIndicator: {
    height: bMargin.xlarge + bFont.small,
    justifyContent: "center",
    alignItems: "center",
  },

  modalSwipeHandle: {
    backgroundColor: bColors.greyTetiary,
    width: 40,
    height: 4,
  },

  menuModalChildrenContainer: {
    width: "100%",
  },

  menuModalItemContainer: {
    flexDirection: "column",
  },

  menuModalItemFlexBox: {
    flexDirection: "row",
    width: "100%",
    marginBottom: bMargin.large,
  },
  menuModalItemFlexItem: {
    marginLeft: bMargin.xlarge,
  },
});

export default menuModalStyles;

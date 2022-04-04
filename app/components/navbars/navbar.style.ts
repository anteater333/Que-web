import { StyleSheet } from "react-native";
import { bColors } from "../../styles/base";

/** VideoCard 컴포넌트에 적용될 스타일 */
const navBarStyle = StyleSheet.create({
  default: {
    height: 56,
    backgroundColor: bColors.white,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderTopColor: bColors.greyTetiary,
    borderTopWidth: 1,
  },
});

export default navBarStyle;

import { StyleSheet } from "react-native";
import { bDimensions } from "../../styles/base";

const videoCardListStyles = StyleSheet.create({
  cardListConatiner: {
    maxWidth: 480,
    width: bDimensions.fullWidth,
    height: bDimensions.fullHeight,
  },
  noMoreDataIndicator: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default videoCardListStyles;

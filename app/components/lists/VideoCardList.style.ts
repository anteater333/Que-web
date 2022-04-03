import { StyleSheet } from "react-native";
import { bColors, bDimensions, bMargin } from "../../styles/base";

const videoCardListStyles = StyleSheet.create({
  cardListConatiner: {
    backgroundColor: bColors.white,
    maxWidth: 480,
  },
  indicatorContainer: {
    margin: bMargin.large,
    alignItems: "center",
    justifyContent: "center",
  },
  noMoreDataImage: {
    opacity: 0.25,
  },
});

export default videoCardListStyles;

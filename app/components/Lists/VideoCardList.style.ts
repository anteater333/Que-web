import { StyleSheet } from "react-native";
import { bDimensions, bMargin } from "../../styles/base";

const videoCardListStyles = StyleSheet.create({
  cardListConatiner: {
    maxWidth: 480,
    width: bDimensions.fullWidth,
    height: bDimensions.fullHeight,
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

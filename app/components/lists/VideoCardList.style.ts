import { StyleSheet } from "react-native";
import { bColors, bDimensions, bFont, bMargin } from "../../styles/base";

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
    height: 36,
  },
  easterMessage: {
    opacity: 0.25,
    color: bColors.black,
    fontSize: bFont.small,
    marginTop: bMargin.middle,
  },
});

export default videoCardListStyles;

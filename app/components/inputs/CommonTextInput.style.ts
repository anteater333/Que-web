import { StyleSheet } from "react-native";
import { bColors, bFont } from "../../styles/base";

const commonTextInputStyles = StyleSheet.create({
  default: {
    borderBottomWidth: 2,
    borderColor: bColors.black,
    fontSize: bFont.xlarge,
    color: bColors.black,
  },
});

export default commonTextInputStyles;

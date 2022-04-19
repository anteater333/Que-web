import { StyleSheet } from "react-native";
import { bColors, bFont } from "../../styles/base";

const commonTextInputStyles = StyleSheet.create({
  default: {
    borderBottomWidth: 2,
    fontSize: bFont.xlarge,
    color: bColors.black,
  },
  valid: {
    borderColor: bColors.black,
  },
  invalid: {
    borderColor: bColors.error,
  },
  disabled: {
    borderColor: bColors.greyTetiary,
    color: bColors.greyPrimary,
  },
});

export default commonTextInputStyles;

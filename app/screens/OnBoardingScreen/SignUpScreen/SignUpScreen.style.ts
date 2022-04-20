import { StyleSheet } from "react-native";
import { bColors, bFont, bSpace } from "../../../styles/base";

export const signUpScreenStyle = StyleSheet.create({
  titleContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  titleLogo: { resizeMode: "contain", maxHeight: 72 },
  titleText: {
    fontWeight: "bold",
    fontSize: bFont.xlarge,
    marginTop: bSpace.middle,
    marginBottom: bSpace.xlarge,
  },
  bottomContainer: {
    flex: 1,
    marginTop: bSpace.middle,
    marginHorizontal: bSpace.xlarge * 2,
  },
  upperContainer: {
    flex: 1,
    marginHorizontal: bSpace.xlarge * 2,
  },
  textInput: {
    fontSize: bFont.large,
    marginBottom: bSpace.large * 2,
  },
  textInputUpper: {
    fontSize: bFont.large,
    marginTop: bSpace.large,
  },
  messageText: {
    marginTop: bSpace.small,
    fontSize: bFont.middle,
    color: bColors.black,
  },
  errorMessageText: {
    color: bColors.error,
  },
  messageTextButton: {
    color: bColors.primary,
  },
});

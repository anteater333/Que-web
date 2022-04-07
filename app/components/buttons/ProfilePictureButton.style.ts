import { StyleSheet } from "react-native";
import { bColors } from "../../styles/base";

const profilePictureStyles = (size: number = 24) => {
  return StyleSheet.create({
    default: {
      alignSelf: "center",
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: bColors.black,
    },
    profilePic: {
      alignSelf: "center",
      flex: 1,
    },
  });
};

export default profilePictureStyles;

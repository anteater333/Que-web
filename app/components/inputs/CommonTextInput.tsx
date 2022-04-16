import { TextInputProps } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import commonTextInputStyles from "./CommonTextInput.style";

const styles = commonTextInputStyles;

/** 기본 텍스트 입력 폼 */
function CommonTextInput(props: TextInputProps) {
  return (
    <TextInput {...props} style={[styles.default, props.style]}>
      {props.children}
    </TextInput>
  );
}

export default CommonTextInput;

import { useCallback, useEffect, useRef, useState } from "react";
import { TextInput, TextInputProps } from "react-native";
import commonTextInputStyles from "./CommonTextInput.style";

const styles = commonTextInputStyles;

interface CommonTextInput extends TextInputProps {
  disabled?: boolean;
  invalid?: boolean;
}

/** 기본 텍스트 입력 폼 */
function CommonTextInput(props: CommonTextInput) {
  const [focused, setFocused] = useState(false);

  /** focus 처리 */
  // useEffect(() => {}, [focused]);

  return (
    <TextInput
      {...props}
      onFocus={(e) => {
        setFocused(true);
        if (props.onFocus) props.onFocus(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        if (props.onBlur) props.onBlur(e);
      }}
      style={[
        styles.default,
        props.invalid ? styles.invalid : styles.valid,
        props.disabled ? styles.disabled : {},
        props.style,
      ]}
    >
      {props.children}
    </TextInput>
  );
}

/** 기본 property */
const defaultProps: CommonTextInput = {
  invalid: false,
};

CommonTextInput.defaultProps = defaultProps;

export default CommonTextInput;

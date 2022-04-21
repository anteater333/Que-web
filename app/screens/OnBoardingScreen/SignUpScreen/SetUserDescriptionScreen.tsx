import { useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import CommonTextInput from "../../../components/inputs/CommonTextInput";
import { OnBoardingStackNavigationProp } from "../../../navigators/OnBoardingNavigator";
import {
  RootStackNavigationProp,
  RootStackParamList,
} from "../../../navigators/RootNavigator";
import screens from "../../../styles/screens";
import { SignUpContext } from "./SignUpContext";
import { signUpScreenStyle } from "./SignUpScreen.style";

const styles = signUpScreenStyle;

const maxLength = 140;

/**
 * 4. 사용자 자기소개 화면
 * @returns
 */
export default function SetUserDescriptionScreen() {
  /** 자기소개 입력 정보 */
  const [description, setDescription] = useState<string>("");
  /** 길이 초과 여부 */
  const [isLengthOver, setIsLengthOver] = useState<boolean>(false);

  const onBoardingNavigator = useNavigation<OnBoardingStackNavigationProp>();

  /** SignUp 컨텍스트 */
  const { setButtonAction, setButtonEnabled, userInfo } =
    useContext(SignUpContext);

  /** Description 길이 제한 */
  const updateDescriptionInput = useCallback(
    (newStr: string) => {
      if (newStr.length <= maxLength) {
        setDescription(newStr);
        setIsLengthOver(newStr.length === maxLength);
      }
    },
    [description]
  );

  /** 버튼 액션, 자기소개를 서버에 등록하기 */
  const postUserDescription = useCallback(() => {
    // TBD 자기소개 등록하기 API 호출

    console.log(userInfo);
    console.log(description);

    // 온보딩 화면 처음으로 이동 -> 해당 화면에서 로그인 여부 판단 -> 메인화면으로 이동
    onBoardingNavigator.navigate("CatchPhrase");
  }, [description]);

  /** 버튼 액션 설정 */
  useEffect(() => {
    if (description.length) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }

    setButtonAction({ action: postUserDescription });
  }, [description]);

  return (
    <SafeAreaView style={screens.defaultScreenLayout}>
      <View style={styles.upperContainer}>
        <CommonTextInput
          style={styles.textInputUpper}
          autoFocus
          multiline
          placeholder="자기소개를 작성해주세요."
          accessibilityRole="text"
          textContentType="none"
          onChangeText={updateDescriptionInput}
          onContentSizeChange={(event) => {
            console.log(event.nativeEvent.contentSize);
          }}
          value={description}
        />
        <Text
          style={[
            styles.messageText,
            styles.textAlignRight,
            isLengthOver ? styles.errorMessageText : {},
          ]}
        >{`${description.length}/${maxLength}`}</Text>
      </View>
    </SafeAreaView>
  );
}

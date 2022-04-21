import { useNavigation } from "@react-navigation/native";
import { useAssets } from "expo-asset";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import SocialLoginButton from "../../../components/buttons/SocialLoginButton";
import CommonTextInput from "../../../components/inputs/CommonTextInput";
import WizardNavBar from "../../../components/navbars/WizardNavBar";
import { OnBoardingStackNavigationProp } from "../../../navigators/OnBoardingNavigator";
import screens from "../../../styles/screens";
import { validateEmail } from "../../../utils/validator";
import { signInScreenStyle } from "./SignInScreen.style";

const styles = signInScreenStyle;

/**
 * 사용자 로그인 화면
 */
function SignInScreen() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  /** 로그인 버튼 활성화 여부 */
  const [isTriable, setIsTriable] = useState<boolean>(false);

  /** 로고 표시용 에셋 */
  const [assets, error] = useAssets([
    require("../../../assets/custom/logo-big.png"),
  ]);

  const onBoardingNavigator = useNavigation<OnBoardingStackNavigationProp>();

  /** 로그인 진행 */
  const loginWithQue = useCallback(() => {
    alert("로그인 구현해");

    // TBD 온보딩 화면 첫 화면으로 넘긴 뒤 로그인 여부 파악 후 메인 화면으로 보내기
    onBoardingNavigator.navigate("CatchPhrase");
  }, []);

  /** 구글 로그인 버튼 */
  const loginWithGoogle = useCallback(() => {
    alert("구현예정입니다.");
  }, []);

  /** 이메일과 비밀번호가 입력되었으면 버튼 활성화 */
  useEffect(() => {
    setIsTriable(validateEmail(userEmail) && password.length >= 8);
  }, [userEmail, password]);

  return (
    <SafeAreaView style={screens.defaultScreenLayout}>
      <StatusBar translucent={false} />
      <View style={styles.titleContainer}>
        {assets ? (
          <Image
            style={styles.titleLogo}
            source={assets[0] as ImageSourcePropType}
          />
        ) : null}
      </View>

      <View style={styles.bottomContainer}>
        <CommonTextInput
          style={styles.textInput}
          autoFocus
          accessibilityRole="text"
          textContentType="emailAddress"
          keyboardType="email-address"
          placeholder="이메일"
          onChangeText={(newStr) => setUserEmail(newStr)}
          value={userEmail}
          onKeyPress={(event) => {}}
        />
        <CommonTextInput
          style={styles.textInput}
          /** TBD : textinput의 버튼을 누르면 비밀번호 드러내기 */
          secureTextEntry={true}
          accessibilityRole="text"
          textContentType="password"
          placeholder="비밀번호"
          onChangeText={(newStr) => setPassword(newStr)}
          value={password}
          onKeyPress={(event) => {
            if (event.nativeEvent.key == "Enter" && isTriable) {
              loginWithQue();
            } else {
              // do nothing
            }
          }}
        />
        <View>
          <SocialLoginButton
            buttonType="google"
            onPress={loginWithGoogle}
          ></SocialLoginButton>
        </View>
      </View>

      <WizardNavBar
        enableNextButton={isTriable}
        hideSkipButton={true}
        onNext={loginWithQue}
      ></WizardNavBar>
    </SafeAreaView>
  );
}

export default SignInScreen;

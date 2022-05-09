import { useNavigation } from "@react-navigation/native";
import { useAssets } from "expo-asset";
import { StatusBar } from "expo-status-bar";
import { SetStateAction, useCallback, useEffect, useState } from "react";
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

import * as WebBrowser from "expo-web-browser";
import ScreenCoverLoadingSpinner from "../../../components/common/ScreenCoverLoadingIndicator";
import { useAuth } from "../../../hooks/useAuth";
import { useSignInWithQue, useSignWithGoogle } from "../../../hooks/useSign";

const styles = signInScreenStyle;

WebBrowser.maybeCompleteAuthSession();

/**
 * 사용자 로그인 화면
 */
function SignInScreen() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  /** 로그인 버튼 활성화 여부 */
  const [isTriable, setIsTriable] = useState<boolean>(false);

  /** 로딩 컴포넌트 표시 여부 */
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /** 로고 표시용 에셋 */
  const [assets, error] = useAssets([
    require("../../../assets/custom/logo-big.png"),
  ]);

  const { user } = useAuth();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const onBoardingNavigator = useNavigation<OnBoardingStackNavigationProp>();

  /** 이메일과 비밀번호를 통해 로그인 진행 */
  const loginWithQue = useSignInWithQue(userEmail, password, setIsLoading);

  /**
   * Google Auth를 통한 계정 인증
   * 이미 등록된 Google 계정이 있으면 로그인 진행 후 main 화면으로
   * 등록된 Google 계정이 없으면 회원 가입 화면으로
   */
  const signWithGoogle = useSignWithGoogle(setIsLoading);

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
            onPress={signWithGoogle}
          ></SocialLoginButton>
        </View>
      </View>

      {isLoading ? <ScreenCoverLoadingSpinner /> : null}
      <WizardNavBar
        enableNextButton={isTriable}
        hideSkipButton={true}
        onNext={loginWithQue}
      ></WizardNavBar>
    </SafeAreaView>
  );
}

export default SignInScreen;

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

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import QueAuthClient from "../../../api/QueAuthUtils";
import ScreenCoverLoadingSpinner from "../../../components/common/ScreenCoverLoadingIndicator";

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

  // TBD DRY
  const [request, response, promptAsync] = Google.useAuthRequest({
    responseType: "id_token",
    clientId:
      "944223797321-3fc5f5sn2l4vl3k3feuf61ckb7mirheb.apps.googleusercontent.com",
  });

  const onBoardingNavigator = useNavigation<OnBoardingStackNavigationProp>();

  /** 로그인 진행 */
  const loginWithQue = useCallback(() => {
    alert("로그인 구현해");

    // TBD 온보딩 화면 첫 화면으로 넘긴 뒤 로그인 여부 파악 후 메인 화면으로 보내기
    onBoardingNavigator.navigate("CatchPhrase");
  }, []);

  /**
   * Google Auth를 통한 계정 인증
   * 이미 등록된 Google 계정이 있으면 로그인 진행 후 main 화면으로
   * 등록된 Google 계정이 없으면 회원 가입 화면으로
   */
  const signWithGoogle = useCallback(async () => {
    setIsLoading(true);
    const result = await promptAsync();

    if (result.type === "success") {
      const { id_token } = result.params;

      try {
        await QueAuthClient.signInWithGoogle(id_token);
      } catch (error) {
        alert(`구글 로그인 과정에서 오류가 발생했습니다. ${error}`);
      }
    } else {
      // 오류 처리
    }

    // if (result) {
    //   // 로그인 성공함
    //   // navigate to signup screen with google user info
    //   onBoardingNavigator.navigate("SignUp", {
    //     someGoogleTokenShit: { userName: "삼식이" },
    //   });
    // }
    setIsLoading(false);
  }, [response, request]);

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

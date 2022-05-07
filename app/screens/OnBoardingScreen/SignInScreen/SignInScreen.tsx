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
import { useToast } from "react-native-toast-notifications";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import QueAuthClient from "../../../api/QueAuthUtils";
import ScreenCoverLoadingSpinner from "../../../components/common/ScreenCoverLoadingIndicator";
import { QueAuthResponse } from "../../../api/interfaces";

const styles = signInScreenStyle;

WebBrowser.maybeCompleteAuthSession();

// TBD 로그인 인터페이스에서 타입 지정, 그 리턴 타입을 키로써 가지도록 강제하기.
/** 로그인 과정에서의 에러 메세지 */
const loginErrorMessages: {
  [key in QueAuthResponse | "default"]?: string;
} = {
  "403": `비밀번호를 다시 확인해주세요.`,
  "404": `이메일을 다시 확인해주세요.`,
  "409": `다른 방식으로 로그인해주세요.`,
  "410": `정지된 계정입니다. 문의 부탁드립니다.`,
  "400": `유효하지 않은 이메일입니다.`,
  default: `로그인 과정에서 오류가 발생했습니다.`,
};

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
    clientId:
      "944223797321-3fc5f5sn2l4vl3k3feuf61ckb7mirheb.apps.googleusercontent.com",
    selectAccount: true,
  });

  const toast = useToast();

  const onBoardingNavigator = useNavigation<OnBoardingStackNavigationProp>();

  /** 로그인 진행 */
  const loginWithQue = useCallback(async () => {
    setIsLoading(true);
    try {
      const loginResult = await QueAuthClient.signInWithQueSelfManaged(
        userEmail,
        password
      );

      console.log(loginResult);

      /** 에러 발생 시 토스트에 표시할 메세지 */
      let errMsg: string | undefined;

      switch (loginResult) {
        case QueAuthResponse.OK: {
          // TBD 온보딩 화면 첫 화면으로 넘긴 뒤 로그인 여부 파악 후 메인 화면으로 보내기
          //    onBoardingNavigator.navigate("CatchPhrase");
          toast.show("로그인했습니다."); // 임시
          break;
        }
        default: {
          errMsg = loginErrorMessages[loginResult];
          break;
        }
      }

      if (errMsg) {
        toast.show(errMsg, { type: "danger" });
      }
    } catch (error) {
      const errorMessage = loginErrorMessages.default + `\n${error}`;
      toast.show(errorMessage, {
        type: "danger",
      });
    }

    setIsLoading(false);
  }, [userEmail, password]);

  /**
   * Google Auth를 통한 계정 인증
   * 이미 등록된 Google 계정이 있으면 로그인 진행 후 main 화면으로
   * 등록된 Google 계정이 없으면 회원 가입 화면으로
   */
  const signWithGoogle = useCallback(async () => {
    setIsLoading(true);
    const result = await promptAsync();

    if (result.type === "success") {
      const accessToken = result.authentication?.accessToken!;

      try {
        const loginResult = await QueAuthClient.signInWithGoogle(accessToken);

        console.log(loginResult);

        /** 에러 발생 시 토스트에 표시할 메세지 */
        let errMsg: string | undefined;

        switch (loginResult) {
          case QueAuthResponse.OK: {
            // TBD 온보딩 화면 첫 화면으로 넘긴 뒤 로그인 여부 파악 후 메인 화면으로 보내기
            //    onBoardingNavigator.navigate("CatchPhrase");
            toast.show("로그인했습니다."); // 임시
            break;
          }
          default: {
            errMsg = loginErrorMessages[loginResult];
            break;
          }
        }

        if (errMsg) {
          toast.show(errMsg, { type: "danger" });
        }
      } catch (error) {
        const errorMessage = loginErrorMessages.default + `\n${error}`;
        toast.show(errorMessage, {
          type: "danger",
        });
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

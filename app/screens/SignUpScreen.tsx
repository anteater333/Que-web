/** TBD: 모듈 하나의 크기가 비대해짐, 분리 필요 */

import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAssets } from "expo-asset";
import { StatusBar } from "expo-status-bar";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Image,
  ImageSourcePropType,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import DummyComponent from "../components/common/DummyComponent";
import CommonHeader from "../components/headers/CommonHeader";
import CommonTextInput from "../components/inputs/CommonTextInput";
import WizardNavBar from "../components/navbars/WizardNavBar";
import {
  OnBoardingStackScreenProp,
  SignUpStackNavigationProp,
  SignUpStackParamList,
} from "../navigators/OnBoardingNavigator";
import { bColors, bFont, bSpace } from "../styles/base";
import screens from "../styles/screens";
import { validateEmail } from "../utils/validator";

const SignUpStack = createNativeStackNavigator<SignUpStackParamList>();

type SignUpContextType = {
  buttonEnabled: boolean;
  setButtonEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  buttonAction: { action: () => void }; // function을 바로 쓰지 않고 객체로 wrapping 해야 변경 가능합니다.
  setButtonAction: React.Dispatch<React.SetStateAction<{ action: () => void }>>;
};
const defaultSignUpContext: SignUpContextType = {
  buttonEnabled: false,
  setButtonEnabled: function (): void {
    throw new Error("Function not implemented.");
  },
  buttonAction: {
    action: function (): void {
      throw new Error("Function not implemented.");
    },
  },
  setButtonAction: function (): void {
    throw new Error("Function not implemented.");
  },
};

/**
 * 회원가입 흐름에 한정되어 사용할 Context
 */
const SignUpContext = createContext<SignUpContextType>(defaultSignUpContext);

/**
 * 회원 가입 화면
 */
function SignUpScreen({
  route,
  navigation,
}: OnBoardingStackScreenProp<"SignUp">) {
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [buttonAction, setButtonAction] = useState<{ action: () => void }>({
    action: useCallback(() => {}, []),
  });

  return (
    <SafeAreaView style={screens.defaultScreenLayout}>
      <StatusBar translucent={false} />
      <SignUpContext.Provider
        value={{
          buttonEnabled,
          setButtonEnabled,
          buttonAction,
          setButtonAction,
        }}
      >
        <SignUpStack.Navigator
          screenOptions={{
            contentStyle: screens.defaultScreenLayout,
            header: (props) => (
              <CommonHeader replaceTitleWithLogo hideButton={true} {...props} />
            ),
          }}
        >
          <SignUpStack.Group>
            <SignUpStack.Screen
              options={{
                header: (props) => (
                  <CommonHeader hideButton={true} {...props} />
                ),
                title: "",
              }}
              name="VerifyMail"
              component={VerifyMailScreen}
            />
            <SignUpStack.Screen name="SetPassword" component={DummyComponent} />
          </SignUpStack.Group>
          <SignUpStack.Group>
            <SignUpStack.Screen
              name="SetUserProfile"
              component={DummyComponent}
            />
            <SignUpStack.Screen
              name="SetUserDescription"
              component={DummyComponent}
            />
          </SignUpStack.Group>
        </SignUpStack.Navigator>
        <SignUpContext.Consumer>
          {({ buttonEnabled, buttonAction }) => (
            <WizardNavBar
              hideSkipButton={true}
              enableNextButton={buttonEnabled}
              onNext={buttonAction.action}
            />
          )}
        </SignUpContext.Consumer>
      </SignUpContext.Provider>
    </SafeAreaView>
  );
}

/**
 * Step 1. 이메일 확인
 * @returns
 */
function VerifyMailScreen() {
  /** Email 주소 입력 데이터 */
  const [userEmail, setUserEmail] = useState<string>("");
  /** 인증 코드 입력 데이터 */
  const [verifyingCode, setVerifyingCode] = useState<string>("");
  /** 메일 발송 여부 */
  const [sentMail, setSentMail] = useState<boolean>(false);
  /** 인증 가능 잔여 시간 표시 */
  const [timer, setTimer] = useState<number>(0);

  /** 로고 표시용 에셋 접근 */
  const [assets, error] = useAssets([require("../assets/custom/logo-big.png")]);

  /** SignUp 컨텍스트 사용 */
  const { buttonEnabled, setButtonEnabled, buttonAction, setButtonAction } =
    useContext(SignUpContext);

  /** 다음 화면으로 이동하기 위한 네비게이터 */
  const signUpNavigator = useNavigation<SignUpStackNavigationProp>();

  /** TBD: In RN w/ typescript, using ref for custom functional component. To autofocus on second textinput */
  // const textInputEmail = useRef();
  // const textInputCode = useRef();

  /** 메일을 전송하고 전송 여부에 따라 인증 코드 입력 UI를 활성화합니다. */
  const sendVerificationMail = useCallback(() => {
    // TBD : 인증 메일 전송 API 호출

    // 메일 전송 결과에 따라 다음 UI 활성화
    setSentMail(true);
    setVerifyingCode("");
    setButtonEnabled(false);
    setTimer(300);
  }, [sentMail, userEmail]);

  /** 사용자가 입력한 코드를 검증한 다음 겨로가에 따라 다음 단계로 넘어갑니다. */
  const verifyWithCode = useCallback(() => {
    console.log(verifyingCode);

    // TBD 인증 결과 파악 후 다음 화면으로 이동
    signUpNavigator.navigate("SetPassword");
  }, [verifyingCode]);

  /** 진행 여부에 따라 navbar 버튼 활성화 로직 지정 */
  useEffect(() => {
    if (!sentMail) setButtonEnabled(validateEmail(userEmail));
    if (sentMail && verifyingCode.length >= 6) setButtonEnabled(true);
  }, [userEmail, verifyingCode, sentMail]);

  /** 인증 가능 시간 타이머 설정 */
  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else if (timer === 0) {
        clearInterval(countdown); // 타이머 종료
      }
    }, 1000);

    return () => clearInterval(countdown); // useEffect 콜백의 return은 컴포넌트가 unmount 될 때의 동작을 의미
  }, [timer]);

  /**  진행 여부에 따라 navbar button의 onPress 행동 결정 */
  useEffect(() => {
    if (sentMail) {
      setButtonAction({ action: verifyWithCode });
    } else {
      setButtonAction({ action: sendVerificationMail });
    }
  }, [sentMail]);

  return (
    <SafeAreaView style={screens.defaultScreenLayout}>
      <View
        style={verifyMailScreenStyle.titleContainer}
        testID="signUpTitleContainer"
      >
        {assets ? (
          <Image
            style={verifyMailScreenStyle.titleLogo}
            source={assets[0] as ImageSourcePropType}
          />
        ) : null}
        <Text style={verifyMailScreenStyle.titleText}>회원가입</Text>
      </View>

      <View style={verifyMailScreenStyle.bottomContainer}>
        <View>
          <CommonTextInput
            style={verifyMailScreenStyle.textInput}
            autoFocus
            accessibilityRole="text"
            textContentType="emailAddress"
            placeholder="이메일"
            onChangeText={(newStr) => setUserEmail(newStr)}
            value={userEmail}
            onKeyPress={(event) => {
              if (event.nativeEvent.key == "Enter" && buttonEnabled) {
                if (!sentMail) {
                  buttonAction.action();
                }
              } else {
                // do nothing
              }
            }}
          />
        </View>
        {sentMail ? (
          <View>
            <CommonTextInput
              style={verifyMailScreenStyle.textInput}
              autoFocus
              textContentType="oneTimeCode"
              accessibilityRole="text"
              placeholder="인증번호"
              onChangeText={(newStr) => setVerifyingCode(newStr)}
              value={verifyingCode}
              onKeyPress={(event) => {
                if (event.nativeEvent.key == "Enter" && buttonEnabled) {
                  if (sentMail) {
                    buttonAction.action();
                  }
                } else {
                  // do nothing
                }
              }}
            />
            <Text style={verifyMailScreenStyle.messageText}>
              {`입력하신 이메일로 인증번호를 전송했습니다.\n인증번호는 ${timer}초 이후 만료됩니다.`}
              <Text
                style={verifyMailScreenStyle.messageTextButton}
                onPress={sendVerificationMail}
                accessibilityRole="button"
              >
                {` 재전송 `}
              </Text>
            </Text>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const verifyMailScreenStyle = StyleSheet.create({
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
  textInput: {
    fontSize: bFont.large,
    marginBottom: bSpace.large * 2,
  },
  messageText: {
    fontSize: bFont.middle,
  },
  messageTextButton: {
    color: bColors.primary,
  },
});

/**
 * Step 2. 비밀번호 입력
 */
function SetPasswordScreen() {}

/**
 * Step 3. 프로필 설정
 */
function SetUserProfileScreen() {}

/**
 * Step 4. 자기소개하기
 */
function SetUserDescriptionScreen() {}

/**
 * TBD: 추가 개인화 작업
 */

export default SignUpScreen;

import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAssets } from "expo-asset";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { ScreenStackHeaderBackButtonImage } from "react-native-screens";
import RoundedButton, {
  RoundedButtonType,
} from "../components/buttons/RoundedButton";
import DummyComponent from "../components/common/DummyComponent";
import CommonHeader from "../components/headers/CommonHeader";
import WizardNavBar from "../components/navbars/WizardNavBar";
import {
  OnBoardingStackScreenProp,
  SignUpStackNavigationProp,
  SignUpStackParamList,
} from "../navigators/OnBoardingNavigator";
import { bColors, bFont, bSpace } from "../styles/base";
import screens from "../styles/screens";

const SignUpStack = createNativeStackNavigator<SignUpStackParamList>();

/**
 * 회원 가입 화면
 */
function SignUpScreen({
  route,
  navigation,
}: OnBoardingStackScreenProp<"SignUp">) {
  const signUpNavigator = useNavigation<SignUpStackNavigationProp>();

  return (
    <SafeAreaView style={screens.defaultScreenLayout}>
      <StatusBar translucent={false} />
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
              header: (props) => <CommonHeader hideButton={true} {...props} />,
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
      <WizardNavBar
        hideSkipButton={true}
        enableNextButton={false}
        onNext={() => alert("h")}
      />
    </SafeAreaView>
  );
}

/**
 * Step 1. 이메일 확인
 * @returns
 */
function VerifyMailScreen() {
  const [sentMail, setSetMail] = useState(false);
  const [timer, setTimer] = useState(0);
  const [assets, error] = useAssets([require("../assets/custom/logo-big.png")]);

  return (
    <View style={screens.defaultScreenLayout}>
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
        {/** TBD 커스텀 컴포넌트로 대체하기 */}
        <TextInput
          style={verifyMailScreenStyle.textInput}
          accessibilityRole="text"
          textContentType="emailAddress"
          placeholder="이메일"
        />
        <TextInput
          style={verifyMailScreenStyle.textInput}
          textContentType="oneTimeCode"
          accessibilityRole="text"
          placeholder="인증번호"
        />
        <Text style={verifyMailScreenStyle.messageText}>
          입력하신 이메일로 인증번호를 전송했습니다.{"\n"}
          인증번호는 {timer}초 이후 만료됩니다.{" "}
          <Text
            style={verifyMailScreenStyle.messageTextButton}
            onPress={() => {
              alert("재전송");
            }}
            accessibilityRole="button"
          >
            재전송
          </Text>
        </Text>
      </View>
    </View>
  );
}

const verifyMailScreenStyle = StyleSheet.create({
  titleContainer: {
    flex: 1.2,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  titleLogo: { resizeMode: "contain", height: 96 },
  titleText: {
    fontWeight: "bold",
    fontSize: bFont.xlarge + bFont.middle,
    marginVertical: bSpace.xlarge,
  },
  bottomContainer: {
    flex: 1,
    marginTop: bSpace.xlarge * 2,
    marginHorizontal: bSpace.xlarge * 2,
  },
  textInput: {
    fontSize: bFont.xlarge,
    marginBottom: bSpace.large * 2,
    borderBottomWidth: 2,
  },
  messageText: {
    flex: 1,
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

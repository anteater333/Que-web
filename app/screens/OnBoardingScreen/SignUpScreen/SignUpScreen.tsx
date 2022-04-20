import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native";
import CommonHeader from "../../../components/headers/CommonHeader";
import WizardNavBar from "../../../components/navbars/WizardNavBar";
import {
  OnBoardingStackScreenProp,
  SignUpStackNavigationProp,
  SignUpStackParamList,
} from "../../../navigators/OnBoardingNavigator";
import screens from "../../../styles/screens";
import SetPasswordScreen from "./SetPasswordScreen";
import SetUserDescriptionScreen from "./SetUserDescriptionScreen";
import SetUserProfileScreen from "./SetUserProfileScreen";
import { SignUpContext } from "./SignUpContext";
import VerifyMailScreen from "./VerifyMailScreen";

const SignUpStack = createNativeStackNavigator<SignUpStackParamList>();

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

  /** 다음 화면으로 이동하기 위한 네비게이터 */
  const signUpNavigator = useNavigation<SignUpStackNavigationProp>();

  return (
    <SafeAreaView style={screens.defaultScreenLayout}>
      <StatusBar translucent={false} />
      <SignUpContext.Provider
        value={{
          buttonEnabled,
          setButtonEnabled,
          buttonAction,
          setButtonAction,
          signUpNavigator,
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
            <SignUpStack.Screen
              name="SetPassword"
              component={SetPasswordScreen}
            />
          </SignUpStack.Group>
          <SignUpStack.Group>
            <SignUpStack.Screen
              name="SetUserProfile"
              component={SetUserProfileScreen}
            />
            <SignUpStack.Screen
              name="SetUserDescription"
              component={SetUserDescriptionScreen}
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
 * TBD: 추가 개인화 화면 기획 & 개발
 */

export default SignUpScreen;

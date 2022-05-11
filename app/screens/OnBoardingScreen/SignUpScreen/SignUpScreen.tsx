import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native";
import ScreenCoverLoadingSpinner from "../../../components/common/ScreenCoverLoadingIndicator";
import CommonHeader from "../../../components/headers/CommonHeader";
import WizardNavBar from "../../../components/navbars/WizardNavBar";
import { useAuth } from "../../../hooks/useAuth";
import {
  OnBoardingStackParamList,
  OnBoardingStackScreenProp,
  SignUpStackNavigationProp,
  SignUpStackParamList,
} from "../../../navigators/OnBoardingNavigator";
import screens from "../../../styles/screens";
import UserType from "../../../types/User";
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
  // Context states
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);
  const [hideButton, setHideButton] = useState<boolean>(true);
  const [buttonAction, setButtonAction] = useState<{ action: () => void }>({
    action: useCallback(() => {}, []),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newUserProfile, setNewUserProfile] = useState<UserType>({});

  /** 다음 화면으로 이동하기 위한 네비게이터 */
  const signUpNavigator = useNavigation<SignUpStackNavigationProp>();

  return (
    <SafeAreaView style={screens.defaultScreenLayout}>
      <StatusBar translucent={false} />
      <SignUpContext.Provider
        value={{
          buttonEnabled,
          setButtonEnabled,
          hideButton,
          setHideButton,
          buttonAction,
          setButtonAction,
          signUpNavigator,
          isLoading,
          setIsLoading,
          newUserProfile,
          setNewUserProfile,
        }}
      >
        <SignUpStack.Navigator
          initialRouteName={
            route.params.hasProvider ? "SetUserProfile" : "VerifyMail"
          }
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
                header: (props) => <CommonHeader hideButton {...props} />,
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
              options={{
                header: (props) => (
                  <CommonHeader hideBackButton hideButton {...props} />
                ),
              }}
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
          {({ buttonEnabled, buttonAction, hideButton }) => (
            <WizardNavBar
              hideSkipButton={hideButton}
              enableNextButton={buttonEnabled}
              onSkip={() => {
                // TBD 건너뛰기 구현
                alert("다음에 하시겠습니까?");
              }}
              onNext={buttonAction.action}
            />
          )}
        </SignUpContext.Consumer>
        {isLoading ? <ScreenCoverLoadingSpinner /> : null}
      </SignUpContext.Provider>
    </SafeAreaView>
  );
}

/**
 * TBD: 추가 개인화 화면 기획 & 개발, 장기계획
 */

export default SignUpScreen;

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { SafeAreaView } from "react-native";
import CommonHeader from "../../../components/headers/CommonHeader";
import WizardNavBar from "../../../components/navbars/WizardNavBar";
import {
  OnBoardingStackScreenProp,
  SignUpStackParamList,
} from "../../../navigators/OnBoardingNavigator";
import screens from "../../../styles/screens";
import SetPasswordScreen from "./SetPasswordScreen";
import SetUserDescriptionScreen from "./SetUserDescriptionScreen";
import SetUserProfileScreen from "./SetUserProfileScreen";
import VerifyMailScreen from "./VerifyMailScreen";

const SignUpStack = createNativeStackNavigator<SignUpStackParamList>();

type SignUpContextType = {
  buttonEnabled: boolean;
  setButtonEnabled: Dispatch<SetStateAction<boolean>>;
  buttonAction: { action: () => void }; // function을 바로 쓰지 않고 객체로 wrapping 해야 변경 가능합니다.
  setButtonAction: Dispatch<SetStateAction<{ action: () => void }>>;
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
export const SignUpContext =
  createContext<SignUpContextType>(defaultSignUpContext);

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

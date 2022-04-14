import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
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

function VerifyMailScreen() {
  return (
    <View>
      <Text>회원가입!</Text>
    </View>
  );
}

export default SignUpScreen;

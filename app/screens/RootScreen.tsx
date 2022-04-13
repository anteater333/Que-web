import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView, Text } from "react-native";
import screens from "../styles/screens";
import {
  RootStackNavigationProp,
  RootStackParamList,
} from "../navigators/RootNavigator";
import MainScreen from "./MainScreen";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import OnBoardingScreen from "./OnBoardingScreen";

/** 최상단 네비게이터 */
const RootStack = createNativeStackNavigator<RootStackParamList>();

/**
 * 최상단 네비게이터가 담길 화면
 * 메인 서비스 화면들과 가입&로그인 화면들 사이에서
 * 사용자의 로그인 여부에 따라 표현할 화면을 결정한다.
 */
function RootScreen(props: { userSignedIn: boolean }) {
  const rootNavigator = useNavigation<RootStackNavigationProp>();

  // TBD: prop이 아니라 전역상태 사용하는 방법 고려
  // TBD: React-Navigation 공식 문서
  let initialScreen: keyof RootStackParamList;
  if (props.userSignedIn) {
    // 로그인 된 상태, 바로 어플리케이션 메인 화면으로
    initialScreen = "Main";
  } else {
    // 로그인 안 된 상태, 온보딩 화면으로
    initialScreen = "OnBoarding";
  }

  /**
   * 로그인 여부 변경을 읽어 루트 네비게이션에서 표시할 페이지 변경하기
   */
  useEffect(() => {
    if (props.userSignedIn) {
      // 로그인 했으면 메인 스크린으로
      rootNavigator.navigate("Main");
    } else {
      // 로그아웃 했거나 로그인 안되어있으면 온보딩 화면으로
      rootNavigator.navigate("OnBoarding");
    }
  }, [props.userSignedIn]);

  return (
    <SafeAreaView style={screens.defaultScreenLayout}>
      <RootStack.Navigator
        initialRouteName={initialScreen}
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen name="OnBoarding" component={OnBoardingScreen} />
        <RootStack.Screen name="Main" component={MainScreen} />
      </RootStack.Navigator>
    </SafeAreaView>
  );
}

export default RootScreen;

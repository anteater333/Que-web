import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, AppRegistry, LogBox } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { Entypo } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MainStackParamList } from "./app/navigators/MainNavigator";
import VideoScreen from "./app/screens/VideoScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./app/screens/HomeScreen";
import { bColors } from "./app/styles/base";
import UploadScreen from "./app/screens/UploadScreen";

// 타이머 경고 무효
LogBox.ignoreLogs(["Setting a timer"]);

// 추후에 RootStackNavigator 할당하기
const RootStack = createNativeStackNavigator<MainStackParamList>();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [userSignedIn, setUserLoggedIn] = useState(true);

  useEffect(() => {
    /**
     * Splash screen 함수
     */
    async function prepare() {
      try {
        // 리소스를 fetch하는 동안 splash를 보이게 하기
        await SplashScreen.preventAutoHideAsync();

        // 폰트  미리 로드. 여기다가 원하는 API콜을 만들 수 있음
        await Font.loadAsync(Entypo.font);
      } catch (e) {
        console.warn(e);
      } finally {
        // 어플리케이션에게 준비됐다고 말하기
        setAppIsReady(true);
      }
    }

    // 함수 호출
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // 이 코드는 스플래시 화면이 바로 사라지게 만듬
      // 우리가 'setAppIsReady' 다음 호출하면
      // 앱이 미처 렌더링 되기 전의 빈 화면을 볼 수도 있음.
      // 그러니까 root view가 layout을 생성한 것을 인식한 다음 사라지게 하는게 좋다.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  let firstPage;
  if (userSignedIn) {
    // firstPage = TimelineScene
  } else {
    // firstPage = OnBoardingScene
  }

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider style={styles.rootBackground}>
      <View onLayout={onLayoutRootView} style={styles.rootContainer}>
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={HomeScreen}
            />
            <RootStack.Screen name="Upload" component={UploadScreen} />
            <RootStack.Screen name="Video" component={VideoScreen} />
          </RootStack.Navigator>
        </NavigationContainer>
      </View>
      {QueStatusBar()}
    </SafeAreaProvider>
  );
}

/** Statusbar customize */
function QueStatusBar() {
  // TBD 테마별 스테이터스 바 변경
  return <StatusBar style="auto" backgroundColor={bColors.white} />;
}

const styles = StyleSheet.create({
  rootBackground: {
    backgroundColor: bColors.white,
    alignItems: "center",
  },
  rootContainer: {
    width: "100%",
    maxWidth: 480,
    height: "100%",
    shadowColor: bColors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 50,
    elevation: 5,
  },
});

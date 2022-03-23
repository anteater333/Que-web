import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, AppRegistry } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { Entypo } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import VideoCard from "./app/components/cards/VideoCard";
import { RootStackParamList } from "./app/screens/RootStackParamList";
import VideoScreen from "./app/screens/VideoScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import VideoCardList from "./app/components/Lists/VideoCardList";

function AppScreen() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(true);

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

  if (!appIsReady) {
    return null;
  }

  let firstPage;
  if (userLoggedIn) {
    // firstPage = TimelineScene
  } else {
    // firstPage = OnBoardingScene
  }

  return (
    <SafeAreaView>
      <View
        style={styles.container}
        testID="appScreen"
        onLayout={onLayoutRootView}
      >
        <VideoCardList />
        {/* <VideoCard
        videoInfo={{
          videoId: "1",
          sourceUrl: "gs://que-backend-dev.appspot.com/testvideo.mp4",
          thumbnailUrl:
            "gs://que-backend-dev.appspot.com/videos/thumbnail/image.png",
        }}
      />
      <VideoCard
        videoInfo={{
          videoId: "2",
          sourceUrl: "gs://que-backend-dev.appspot.com/testvideo.mp4",
          thumbnailUrl:
            "gs://que-backend-dev.appspot.com/videos/thumbnail/image 2.png",
        }}
      /> */}
        {/* <StatusBar style="auto" /> */}
      </View>
    </SafeAreaView>
  );
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen name="App" component={AppScreen} />
          <RootStack.Screen name="Video" component={VideoScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 480,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

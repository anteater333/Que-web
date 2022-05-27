import { useIsFocused, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import ScreenCoverLoadingSpinner from "../../components/common/ScreenCoverLoadingIndicator";
import CommonHeader from "../../components/headers/CommonHeader";
import { MainStackNavigationProp } from "../../navigators/MainNavigator";
import {
  UploadStackNavigationProp,
  UploadStackParamList,
} from "../../navigators/UploadNavigator";
import screens from "../../styles/screens";
import PlaceType from "../../types/Place";
import SongType from "../../types/Song";
import InputDataScreen from "./InputDataScreen";
import SelectTypeScreen from "./SelectTypeScreen";
import { UploadContext } from "./UploadContext";

const UploadStack = createNativeStackNavigator<UploadStackParamList>();

/**
 * 영상 업로드 화면
 */
function UploadScreen() {
  // Context states
  /** 확인 버튼 숨기기 */
  const [buttonHidden, setButtonHidden] = useState<boolean>(true);
  /** 확인 버튼 활성화하기 */
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);
  const [videoPath, setVideoPath] = useState<string>("");
  const [thumbnailPath, setThumbnailPath] = useState<string>("");
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [videoDescription, setVideoDescription] = useState<string>("");
  const [songInfo, setSongInfo] = useState<SongType>({ title: "" });
  const [placeInfo, setPlaceInfo] = useState<PlaceType>({ name: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("");

  const isFocused = useIsFocused();

  const mainNavigator = useNavigation<MainStackNavigationProp>();
  const uploadNavigator = useNavigation<UploadStackNavigationProp>();

  /**
   * 업로드 확인 버튼 눌렀을 때 실행되는 콜백함수
   * !! 업로드 화면 핵심 기능 입니다. !!
   */
  const uploadAndPostVideo = useCallback(() => {
    console.log(videoPath, videoTitle, videoDescription, songInfo, placeInfo);
    // TBD 업로드 API 함수 호출 및 업로드 진행률 표시 방법론 구상
    // TBD 업로드 하시겠습니까? 질문하기.
    mainNavigator.navigate("Home");
  }, [
    videoPath,
    thumbnailPath,
    videoTitle,
    videoDescription,
    songInfo,
    placeInfo,
  ]);

  /**
   * 업로드 화면 재진입시 네비게이션 순서가 초기화 될 수 있도록 설정
   */
  useEffect(() => {
    if (!isFocused) {
      uploadNavigator.navigate("SelectType");
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={screens.defaultScreenLayout}>
      <UploadContext.Provider
        value={{
          buttonEnabled,
          setButtonEnabled,
          buttonHidden,
          setButtonHidden,
          placeInfo,
          setPlaceInfo,
          songInfo,
          setSongInfo,
          videoDescription,
          setVideoDescription,
          videoTitle,
          setVideoTitle,
          videoPath,
          setVideoPath,
          thumbnailPath,
          setThumbnailPath,
          isLoading,
          setIsLoading,
          loadingMessage,
          setLoadingMessage,
        }}
      >
        <UploadStack.Navigator
          initialRouteName="SelectType"
          screenOptions={{
            contentStyle: screens.defaultScreenLayout,
            title: "업로드",
            header: (props) => (
              <CommonHeader
                hideButton={buttonHidden}
                buttonType={buttonEnabled ? "primary" : "disabled"}
                onPress={uploadAndPostVideo}
                {...props}
              />
            ),
          }}
        >
          <UploadStack.Screen
            options={{ headerShown: true }}
            name="SelectType"
            component={SelectTypeScreen}
          />
          <UploadStack.Screen
            options={{ headerShown: true }}
            name="InputData"
            component={InputDataScreen}
          />
          {/* TBD 음악 검색 시스템 개발하기 (장기계획) */}
          {/* <UploadStack.Screen
          options={{ headerShown: true }}
          name="SearchSong"
          component={DummyComponent}
        /> */}
        </UploadStack.Navigator>
        {isLoading ? (
          <ScreenCoverLoadingSpinner message={loadingMessage} />
        ) : (
          false
        )}
      </UploadContext.Provider>
    </SafeAreaView>
  );
}

export default UploadScreen;

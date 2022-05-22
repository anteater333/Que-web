import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import DummyComponent from "../../components/common/DummyComponent";
import CommonHeader from "../../components/headers/CommonHeader";
import { UploadStackParamList } from "../../navigators/UploadNavigator";
import screens from "../../styles/screens";
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

  return (
    <SafeAreaView style={screens.defaultScreenLayout}>
      <UploadContext.Provider
        value={{
          buttonEnabled,
          buttonHidden,
          setButtonEnabled,
          setButtonHidden,
        }}
      >
        <UploadStack.Navigator
          initialRouteName="SelectType"
          screenOptions={{
            contentStyle: screens.defaultScreenLayout,
            title: "업로드",
            header: (props) => (
              <UploadContext.Consumer>
                {({ buttonEnabled, buttonHidden }) => (
                  <CommonHeader
                    hideButton={buttonHidden}
                    buttonType={buttonEnabled ? "primary" : "disabled"}
                    {...props}
                  />
                )}
              </UploadContext.Consumer>
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
            component={DummyComponent}
          />
          {/* TBD 음악 검색 시스템 개발하기 (장기계획) */}
          {/* <UploadStack.Screen
          options={{ headerShown: true }}
          name="SearchSong"
          component={DummyComponent}
        /> */}
        </UploadStack.Navigator>
      </UploadContext.Provider>
    </SafeAreaView>
  );
}

export default UploadScreen;

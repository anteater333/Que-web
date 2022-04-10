import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import MainScreenHeader from "../components/headers/MainScreenHeader";
import { MainStackParamList } from "../navigators/MainNavigator";
import screens from "../styles/screens";
import HomeScreen from "./HomeScreen";
import UploadScreen from "./UploadScreen";
import UserPageScreen from "./UserPageScreen";
import VideoScreen from "./VideoScreen";

/** 메인 스택 네비게이터 컴포넌트 */
const MainStack = createNativeStackNavigator<MainStackParamList>();

/**
 * 어플리케이션 메인 스크린
 */
function MainScreen() {
  return (
    <SafeAreaView style={screens.defaultScreenLayout}>
      <MainStack.Navigator
        screenOptions={{
          header: (props) => <MainScreenHeader {...props} />,
        }}
      >
        <MainStack.Screen name="Home" component={HomeScreen} />
        <MainStack.Screen
          name="Upload"
          options={{ headerShown: false }}
          component={UploadScreen}
        />
        <MainStack.Screen
          name="Video"
          options={{ headerShown: false }}
          component={VideoScreen}
        />
        <MainStack.Screen name="UserPage" component={UserPageScreen} />
        <MainStack.Screen name="Notification" component={DummyComponent} />
        <MainStack.Screen name="Search" component={DummyComponent} />
      </MainStack.Navigator>
    </SafeAreaView>
  );
}

/** 더미 컴포넌트를 인라인으로 전달할 경우 발생하는 에러 방지 */
function DummyComponent() {
  return null;
}

export default MainScreen;

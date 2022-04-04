import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeNavBar from "../components/navbars/HomeNavbar";
import HomeScreenHeader from "../components/headers/HomeScreenHeader";
import { HomeTabParamList } from "../navigators/HomeNavigator";
import screens from "../styles/screens";
import PreferenceScreen from "./PreferenceScreen";
import TimelineScreen from "./TimelineScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainStackParamList } from "../navigators/MainNavigator";
import { Text, View } from "react-native";

const HomeTabNavigator = createBottomTabNavigator<HomeTabParamList>();

/**
 * 어플리케이션 홈 스크린
 */
function HomeScreen() {
  return (
    <SafeAreaView style={screens.defaultScreenLayout}>
      <HomeTabNavigator.Navigator
        tabBar={(props) => <HomeNavBar {...props} />}
        screenOptions={{ header: HomeScreenHeader }}
      >
        <HomeTabNavigator.Screen
          name="Timeline"
          component={TimelineScreen}
          options={{ title: "영상" }}
        />
        <HomeTabNavigator.Screen
          name="Upload"
          component={DummyComponent}
          options={{ title: "업로드" }}
        />
        <HomeTabNavigator.Screen
          name="Preference"
          component={PreferenceScreen}
          options={{ title: "설정" }}
        />
      </HomeTabNavigator.Navigator>
    </SafeAreaView>
  );
}

/** 더미 컴포넌트를 인라인으로 전달할 경우 발생하는 에러 방지 */
function DummyComponent() {
  return null;
}

export default HomeScreen;

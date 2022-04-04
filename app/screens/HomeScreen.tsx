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
import { Text } from "react-native";

const HomeTabNavigator = createBottomTabNavigator<HomeTabParamList>();
const MainNavigator = createNativeStackNavigator<MainStackParamList>();

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
          component={() => null}
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

export default HomeScreen;

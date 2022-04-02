import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeNavBar from "../components/common/HomeNavBar";
import HomeScreenHeader from "../components/headers/HomeScreenHeader";
import { HomeTabParamList } from "../navigators/HomeNavigator";
import screens from "../styles/screens";
import PreferenceScreen from "./PreferenceScreen";
import TimelineScreen from "./TimelineScreen";

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
        <HomeTabNavigator.Screen name="Timeline" component={TimelineScreen} />
        <HomeTabNavigator.Screen
          name="Preference"
          component={PreferenceScreen}
        />
      </HomeTabNavigator.Navigator>
    </SafeAreaView>
  );
}

export default HomeScreen;

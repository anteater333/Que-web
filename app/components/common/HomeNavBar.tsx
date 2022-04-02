import { Text, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

/**
 * 홈 스크린 적용 커스텀 네비게이션 바
 */
function HomeNavBar(props: BottomTabBarProps) {
  return (
    <View>
      <Text>NavBar</Text>
    </View>
  );
}

export default HomeNavBar;

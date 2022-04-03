import { Text, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import navBarStyle from "./navbar.style";

const styles = navBarStyle;

/**
 * 홈 스크린 적용 커스텀 네비게이션 바
 */
function HomeNavBar(props: BottomTabBarProps) {
  return (
    <View style={styles.default}>
      <Text>ThisISANavBar</Text>
    </View>
  );
}

export default HomeNavBar;

import { Text, TouchableOpacity, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import navBarStyle from "./navbar.style";
import { bColors } from "../../styles/base";

const styles = navBarStyle;

/**
 * 홈 스크린 적용 커스텀 네비게이션 바
 */
function HomeNavBar(props: BottomTabBarProps) {
  /**
   * 네비게이션 바 버튼 컴포넌트 매핑
   */
  const navButtonMapper = props.state.routes.map((route, index) => {
    const { options } = props.descriptors[route.key];
    const label =
      options.tabBarLabel !== undefined
        ? options.tabBarLabel
        : options.title !== undefined
        ? options.title
        : route.name;

    const isFocused = props.state.index === index;

    const onPress = () => {
      const event = props.navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        if (route.name === "Upload") {
          // 업로드 화면의 경우 상위의 main stack navigator 사용
          props.navigation.getParent()?.navigate(route.name, { merge: true });
        } else {
          // `merge: true` 옵션은 탭 스크린 안의 파라미터가 보존되도록 한다.
          props.navigation.navigate(route.name, { merge: true });
        }
      }
    };

    const onLongPress = () => {
      props.navigation.emit({
        type: "tabLongPress",
        target: route.key,
      });
    };

    return (
      <TouchableOpacity
        key={route.key}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        style={{ flex: 1, alignItems: "center" }}
      >
        <Text style={{ color: isFocused ? bColors.primary : bColors.black }}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  });

  return <View style={styles.default}>{navButtonMapper}</View>;
}

export default HomeNavBar;

import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { useAssets } from "expo-asset";
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from "react-native";
import headerStyle from "./header.style";
import { MaterialIcons } from "@expo/vector-icons";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  NativeStackHeaderProps,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigators/MainNavigator";
import ProfilePictureButton from "../buttons/ProfilePictureButton";

const styles = headerStyle;

/**
 * 홈 스크린 적용 헤더
 */
function HomeScreenHeader(props: BottomTabHeaderProps) {
  const [assets, error] = useAssets([
    require("../../assets/custom/haeder-logo.png"),
  ]);

  /** 어플리케이션 로고 asset 붙여놓기 */
  const headerTitle = (
    <View style={styles.titleContainer} testID="homeHeaderTitleContainer">
      {assets ? (
        <Image
          style={styles.titleLogo}
          source={assets[0] as ImageSourcePropType}
        />
      ) : null}
    </View>
  );

  return (
    <View style={styles.default} testID="homeScreenHeader">
      {headerTitle}
      <HomeHeaderButtonGroup />
    </View>
  );
}

/** 버튼 묶음 코드 분리 */
function HomeHeaderButtonGroup() {
  /** 메인 네비게이터 사용 */
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  /** 알림 버튼을 누르면 알림 화면으로 */
  const handleOnPressAlarm = useCallback(() => {
    navigation.navigate("Notification");
  }, []);

  /** 검색 버튼을 누르면 검색 화면으로 */
  const handleOnPressSearch = useCallback(() => {
    navigation.navigate("Search");
  }, []);

  return (
    <View style={styles.buttonsContainer} testID="homeHeaderButtonsContainer">
      <TouchableOpacity
        onPress={handleOnPressSearch}
        accessibilityRole="button"
      >
        <MaterialIcons style={styles.headerButtonIcon} name="search" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleOnPressAlarm} accessibilityRole="button">
        <MaterialIcons
          style={styles.headerButtonIcon}
          name="notifications-none"
        />
      </TouchableOpacity>
      <ProfilePictureButton userId="test" style={styles.headerButtonIcon} />
    </View>
  );
}

export default HomeScreenHeader;

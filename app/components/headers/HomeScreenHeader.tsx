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
  return (
    <View style={styles.buttonsContainer} testID="homeHeaderButtonsContainer">
      <TouchableOpacity accessibilityRole="button">
        <MaterialIcons style={styles.headerButtonIcon} name="search" />
      </TouchableOpacity>
      <TouchableOpacity accessibilityRole="button">
        <MaterialIcons
          style={styles.headerButtonIcon}
          name="notifications-none"
        />
      </TouchableOpacity>
      {/* TBD : 프로필 사진 영역 컴포넌트화 하기 (VideoCard쪽 코드에도 존재함.) */}
      <TouchableOpacity accessibilityRole="button">
        <View style={[styles.headerButtonIcon, styles.profilePic]} />
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreenHeader;

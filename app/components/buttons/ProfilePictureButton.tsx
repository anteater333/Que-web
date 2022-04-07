import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAssets } from "expo-asset";
import { useCallback } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import { MainStackNavigationProp } from "../../navigators/MainNavigator";
import profilePictureStyles from "./ProfilePictureButton.style";

/** 컴포넌트 프로퍼티 타입, TouchableOpacityProp 처럼 동작할 수 있습니다. 인터페이스 상속을 통한 Union */
interface ProfilePictureProps extends TouchableOpacityProps {
  size?: number;
  userId: string;
  style?: StyleProp<ViewStyle & { fontSize?: number }>;
}

/** 프로필 사진을 포함한 버튼, 누르면 사용자 페이지로 이동합니다. TouchableOpacity 처럼 작동합니다. */
function ProfilePicture(props: ProfilePictureProps) {
  /** 상속받은 스타일에서 fontSize 추출 */
  const inheritedFontSize = props.style
    ? StyleSheet.flatten(props.style).fontSize
    : undefined;

  /** prop을 전달해 스타일 결정 */
  const styles = profilePictureStyles(
    props.size ? props.size : inheritedFontSize ? inheritedFontSize : undefined
  );

  /** 페이지 전환을 위한 메인 네비게이터 사용 */
  const mainNavigator = useNavigation<MainStackNavigationProp>();

  /** 임시 프로필 사진Placeholder */
  const [assets, error] = useAssets([
    require("../../../potato/placeholders/profilePic.png"),
  ]);

  /**
   * 카드 컴포넌트의 프로필 사진 영역을 눌렀을 때 실행됩니다.
   * 프로필을 업로드한 사용자의 Studio 페이지로 이동합니다.
   */
  const navigateToUserPage = useCallback(async () => {
    mainNavigator.navigate("UserPage", {
      userId: props.userId,
    });
  }, []);

  return (
    <TouchableOpacity
      {...props}
      testID={props.testID ? props.testID : "profileButton"}
      onPress={navigateToUserPage}
      style={[styles.default, props.style]}
    >
      {assets ? (
        <Image
          resizeMode="contain"
          style={[styles.profilePic]}
          source={assets[0] as ImageSourcePropType}
        />
      ) : null}
    </TouchableOpacity>
  );
}

export default ProfilePicture;

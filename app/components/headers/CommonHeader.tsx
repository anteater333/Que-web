import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { useAssets } from "expo-asset";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { commonHeaderStyle } from "./header.style";
import { MaterialIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { HeaderBackButton } from "@react-navigation/elements";
import RoundedButton, { RoundedButtonProps } from "../buttons/RoundedButton";

const styles = commonHeaderStyle;

type CommonHeaderProps = NativeStackHeaderProps &
  RoundedButtonProps & { hideButton?: boolean; replaceTitleWithLogo?: boolean };

/**
 * 홈 스크린 적용 헤더
 */
function CommonHeader(props: CommonHeaderProps) {
  const [assets, error] = useAssets([
    require("../../assets/custom/logo-colored.png"),
  ]);

  return (
    <SafeAreaView style={styles.default} testID="commonHeader">
      <View style={styles.backButtonContainer}>
        {/* TBD 혹시라도 뒤로 갈 수 없는 경우(canGoBack() 이 false인 경우 메인 화면으로 이동하기) */}
        <HeaderBackButton onPress={() => props.navigation.goBack()} />
      </View>
      <View style={styles.titleContainer}>
        {props.replaceTitleWithLogo && assets ? (
          <Image
            style={styles.titleLogo}
            source={assets[0] as ImageSourcePropType}
          />
        ) : (
          <Text style={styles.titleText}>{props.options.title}</Text>
        )}
      </View>
      <View style={styles.roundedButtonContainer}>
        {props.hideButton ? null : (
          <RoundedButton
            style={styles.roundedButton}
            buttonType={props.buttonType}
          >
            확인
          </RoundedButton>
        )}
      </View>
    </SafeAreaView>
  );
}

export default CommonHeader;

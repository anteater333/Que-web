import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAssets } from "expo-asset";
import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  OnBoardingStackNavigationProp,
  OnBoardingStackParamList,
} from "../navigators/OnBoardingNavigator";
import { bColors, bFont, bMargin, bPadding } from "../styles/base";
import screens from "../styles/screens";

const OnBoardingStack = createNativeStackNavigator<OnBoardingStackParamList>();

/**
 * 회원가입 OR 로그인 권유 온보딩 화면, 네비게이션으로 이루어짐
 */
function OnBoardingScreen() {
  return (
    <SafeAreaView style={screens.defaultScreenLayout}>
      <OnBoardingStack.Navigator screenOptions={{ headerShown: false }}>
        <OnBoardingStack.Screen
          name="OnBoarding"
          component={OnBoardingContextScreen}
        />
        <OnBoardingStack.Screen name="SignIn" component={() => null} />
        <OnBoardingStack.Screen name="SignUp" component={() => null} />
      </OnBoardingStack.Navigator>
    </SafeAreaView>
  );
}

/**
 * 캐치프레이즈 & 회원가입 권유
 * 백그라운드에 휘황찬란한 GIF
 * @returns
 */
function OnBoardingContextScreen() {
  /** TBD: 영상 교체하기 */
  const mockingVideoSrc = "https://i.postimg.cc/mgdFtJd5/welcome.gif";

  // 임시 네비게이터입니다.
  const rootNavigator = useNavigation<OnBoardingStackNavigationProp>();

  const [assets, error] = useAssets([
    require("../assets/custom/logo-colored.png"),
  ]);

  return (
    <SafeAreaView style={[screens.defaultScreenLayout]}>
      <ImageBackground
        testID="serviceMockingVideo"
        source={{ uri: mockingVideoSrc }}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View testID="emptySpace" style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: bFont.middle,
              color: bColors.greyPrimary,
              alignSelf: "center",
              paddingTop: bPadding.small,
            }}
          >
            임시 영상입니다.
          </Text>
        </View>
        <LinearGradient
          testID="darkOverlay"
          colors={["transparent", bColors.black]}
          start={{ x: 0, y: -1 }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
        <View
          testID="onBoardingContextContainer"
          style={styles.contextContainer}
        >
          <View testID="logoContainer">
            {assets ? (
              <Image source={assets[0] as ImageSourcePropType}></Image>
            ) : null}
          </View>
          <View
            testID="catchPhraseContainer"
            style={styles.catchPhraseContainer}
          >
            <Text style={styles.catchPhraseText}>
              당신의 콘서트를{"\n"}
              시작하세요.
            </Text>
          </View>
          <View testID="signUpButtonContainer" style={styles.buttonContainer}>
            <TouchableOpacity
              style={{
                backgroundColor: bColors.white,
                marginBottom: bPadding.xlarge,
                height: bFont.xlarge + bFont.middle,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                height: bFont.xlarge + bFont.middle,
                backgroundColor: bColors.primary,
                marginBottom: bPadding.xlarge,
              }}
            ></TouchableOpacity>
          </View>
          <View testID="signInTextContainer">
            <Text style={styles.signInSuggestionText}>이미 계정이 있다면</Text>
            <Text>
              {/** 이 Text 컴포넌트를 통한 Wrapping은 하위 컴포넌트의 크기가 텍스트의 길이에 맞춰지도록 만듭니다. */}
              <Text
                style={[styles.signInSuggestionText, styles.signInButtonText]}
                onPress={() => {
                  rootNavigator.navigate("SignIn");
                }}
                accessibilityRole="button"
              >
                로그인
              </Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contextContainer: {
    flexGrow: 0.1,
    marginHorizontal: bMargin.xlarge * 2,
  },
  catchPhraseContainer: {
    paddingTop: bPadding.large,
  },
  catchPhraseText: {
    fontWeight: "bold",
    fontSize: bFont.xlarge + bFont.middle,
    color: bColors.white,
  },
  buttonContainer: {
    paddingTop: bPadding.xlarge + bPadding.middle,
  },
  signInSuggestionText: { color: bColors.white, fontSize: bFont.middle },
  signInButtonText: { color: bColors.primary },
});

export default OnBoardingScreen;

import { SafeAreaView, Text } from "react-native";
import screens from "../styles/screens";

/**
 * 회원가입 OR 로그인 권유 온보딩 화면
 * 백그라운드에 휘황찬란한 GIF
 */
function OnBoardingScreen() {
  return (
    <SafeAreaView style={[screens.defaultScreenLayout]}>
      <Text>얼른 가입해</Text>
    </SafeAreaView>
  );
}

export default OnBoardingScreen;

import { Text, View } from "react-native";
import { OnBoardingStackScreenProp } from "../navigators/OnBoardingNavigator";

/**
 * 회원 가입 화면
 */
function SignUpScreen({
  route,
  navigation,
}: OnBoardingStackScreenProp<"SignUp">) {
  return (
    <View>
      {route.params.someGoogleTokenShit ? (
        <Text>{JSON.stringify(route.params.someGoogleTokenShit)}</Text>
      ) : null}
      <Text>가입하시오</Text>
    </View>
  );
}

export default SignUpScreen;

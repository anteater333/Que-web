import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "react-native";
import {
  MainStackParamList,
  MainStackScreenProp,
} from "../navigators/MainNavigator";

/**
 * 어플리케이션 설정 화면
 */
function UserPageScreen({
  route,
  navigation,
}: MainStackScreenProp<"UserPage">) {
  return <Text>Hello, This is {route.params.userId}'s Studio</Text>;
}

export default UserPageScreen;

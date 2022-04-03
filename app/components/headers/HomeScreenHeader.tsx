import { Text, View } from "react-native";
import headerStyle from "./header.style";

const style = headerStyle;

/**
 * 홈 스크린 적용 헤더
 */
function HomeScreenHeader() {
  return (
    <View style={style.default}>
      <Text>ThisISAHeader</Text>
    </View>
  );
}

export default HomeScreenHeader;

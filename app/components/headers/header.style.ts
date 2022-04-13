import { StyleSheet } from "react-native";
import { bColors, bFont, bSpace } from "../../styles/base";

const sharedSize = bFont.xlarge;

/** VideoCard 컴포넌트에 적용될 스타일 */
const headerStyle = StyleSheet.create({
  default: {
    flexDirection: "row",
    height: 56,
    backgroundColor: bColors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: bSpace.xlarge,
    marginVertical: bSpace.middle,
  },
  titleLogo: {
    height: sharedSize,
    width: Math.ceil((sharedSize * 187) / 75), // 러프한 방법으로 로고 크기 지정 하였음
    resizeMode: "contain",
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: bSpace.xlarge,
  },
  headerButtonIcon: {
    fontSize: sharedSize,
    marginLeft: bSpace.xlarge,
  },
});

export default headerStyle;

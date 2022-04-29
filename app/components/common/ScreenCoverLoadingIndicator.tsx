import { ActivityIndicator, View } from "react-native";
import { bColors } from "../../styles/base";

/**
 * 화면 전체를 커버하는 로딩 표시
 */
export default function ScreenCoverLoadingSpinner() {
  return (
    <View
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: bColors.greyPrimary + bColors.tpTetiary,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}

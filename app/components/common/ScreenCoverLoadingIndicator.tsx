import { ActivityIndicator, View } from "react-native";
import { bColors, bFont } from "../../styles/base";

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
        backgroundColor: bColors.black + bColors.tpTetiary,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size={bFont.xlarge * 2} color={bColors.primary} />
    </View>
  );
}

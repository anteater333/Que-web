import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import screens from "../../styles/screens";
import { uploadScreenStyle } from "./UploadScreen.style";
import { useNavigation } from "@react-navigation/native";
import { UploadStackNavigationProp } from "../../navigators/UploadNavigator";
import { useCallback, useContext, useEffect } from "react";
import { UploadContext } from "./UploadContext";

/**
 * 1. 영상 업로드 유형 선택
 * 새 영상 촬영 기능의 경우 용량 문제도 있고 구현 범위 축소에 따라 TBD
 */
function SelectTypeScreen() {
  const uploadNavigator = useNavigation<UploadStackNavigationProp>();

  const { setButtonHidden } = useContext(UploadContext);

  /** 화면 틀 개발용 임시 네비게이션
   * TBD 영상 업로드 / 촬영으로 전환 (촬영의 경우 비활성화 하자 당분간)
   */
  const tmpNavigation = useCallback(() => {
    uploadNavigator.navigate("InputData");
  }, []);

  /** 최초 렌더링 시 버튼 숨기기 */
  useEffect(() => {
    setButtonHidden(true);
  }, []);

  return (
    <SafeAreaView style={screens.defaultScreenLayout}>
      <View style={uploadScreenStyle.largeButtonsContainer}>
        <TouchableOpacity
          style={[uploadScreenStyle.largeButton]}
          onPress={tmpNavigation}
        >
          <MaterialIcons
            style={uploadScreenStyle.largeButtonIcon}
            name="file-upload"
          />
          <Text style={uploadScreenStyle.largeButtonText}>파일 업로드</Text>
        </TouchableOpacity>
        <View style={uploadScreenStyle.seperation} />
        <TouchableOpacity
          style={[uploadScreenStyle.largeButton]}
          onPress={() => {
            alert("개발중입니다. 아임 쏘리");
          }}
        >
          <MaterialIcons
            style={[
              uploadScreenStyle.largeButtonIcon,
              uploadScreenStyle.largeButtonDisabled,
            ]}
            name="video-call"
          ></MaterialIcons>
          <Text
            style={[
              uploadScreenStyle.largeButtonText,
              uploadScreenStyle.largeButtonDisabled,
            ]}
          >
            새 영상 촬영
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default SelectTypeScreen;

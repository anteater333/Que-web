import { useContext, useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import screens from "../../styles/screens";
import { uploadScreenStyle } from "./UploadScreen.style";
import { UploadContext } from "./UploadContext";
import { ScrollView } from "native-base";
import CommonTextInput from "../../components/inputs/CommonTextInput";

/**
 * 2. 업로드한 영상에 대한 편집(일단 TBD) 및 메타 정보 입력 화면
 */
function InputDataScreen() {
  const { setButtonHidden, setButtonEnabled } = useContext(UploadContext);

  /** 첫 렌더링 시 버튼 숨김 해제 */
  useEffect(() => {
    setButtonHidden(false);
  }, []);

  return (
    <SafeAreaView style={screens.defaultScreenLayout}>
      <View style={uploadScreenStyle.videoContainer}></View>
      <ScrollView style={uploadScreenStyle.dataInputContainer}>
        <CommonTextInput
          accessibilityRole="text"
          textContentType="none"
          style={uploadScreenStyle.dataInputField}
          placeholder="무대 제목"
        />
        <CommonTextInput
          accessibilityRole="text"
          textContentType="none"
          multiline
          style={uploadScreenStyle.dataInputField}
          placeholder="무대 설명"
        />
        <CommonTextInput
          accessibilityRole="text"
          textContentType="none"
          style={uploadScreenStyle.dataInputField}
          placeholder="노래"
        />
        <CommonTextInput
          accessibilityRole="text"
          textContentType="none"
          style={uploadScreenStyle.dataInputField}
          placeholder="장소"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default InputDataScreen;

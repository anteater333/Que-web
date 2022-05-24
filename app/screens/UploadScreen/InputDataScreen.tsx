import { useContext, useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import screens from "../../styles/screens";
import { uploadScreenStyle as styles } from "./UploadScreen.style";
import { UploadContext } from "./UploadContext";
import { ScrollView } from "native-base";
import CommonTextInput from "../../components/inputs/CommonTextInput";

/**
 * 2. 업로드한 영상에 대한 편집(일단 TBD) 및 메타 정보 입력 화면
 */
function InputDataScreen() {
  const {
    setButtonHidden,
    setButtonEnabled,
    placeInfo,
    setPlaceInfo,
    songInfo,
    setSongInfo,
    videoDescription,
    setVideoDescription,
    videoTitle,
    setVideoTitle,
    videoPath,
  } = useContext(UploadContext);

  /** 첫 렌더링 시 버튼 숨김 해제 */
  useEffect(() => {
    setButtonHidden(false);
    setButtonEnabled(false);
  }, []);

  /** 필요 데이터가 입력된 경우를 확인해 버튼 활성화하기 */
  useEffect(() => {
    // TBD 장소, 설명은 optional 제목, 노래는 required
    if (videoTitle.length >= 2 && !!songInfo.title) {
      setButtonEnabled(true);
    }
  }, [videoTitle, songInfo.title]);

  return (
    <SafeAreaView style={screens.defaultScreenLayout}>
      <View style={styles.videoContainer}></View>
      <ScrollView style={styles.dataInputContainer}>
        {videoTitle ? (
          <Text style={styles.dataInputLabel}>무대 제목</Text>
        ) : null}
        <CommonTextInput
          accessibilityRole="text"
          textContentType="none"
          style={styles.dataInputField}
          placeholder="무대 제목"
          onChangeText={(newStr) => setVideoTitle(newStr)}
          value={videoTitle}
        />
        {videoDescription ? (
          <Text style={styles.dataInputLabel}>무대 설명</Text>
        ) : null}
        <CommonTextInput
          accessibilityRole="text"
          textContentType="none"
          multiline
          style={styles.dataInputField}
          placeholder="무대 설명"
          onChangeText={(newStr) => setVideoDescription(newStr)}
          value={videoDescription}
        />
        {songInfo.title ? (
          <Text style={styles.dataInputLabel}>노래</Text>
        ) : null}
        <CommonTextInput
          accessibilityRole="text"
          textContentType="none"
          style={styles.dataInputField}
          placeholder="노래"
          onChangeText={(newStr) => setSongInfo({ title: newStr })}
          value={songInfo.title}
        />
        {placeInfo.name ? (
          <Text style={styles.dataInputLabel}>장소</Text>
        ) : null}
        <CommonTextInput
          accessibilityRole="text"
          textContentType="none"
          style={styles.dataInputField}
          placeholder="장소"
          onChangeText={(newStr) => setPlaceInfo({ name: newStr })}
          value={placeInfo.name}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default InputDataScreen;

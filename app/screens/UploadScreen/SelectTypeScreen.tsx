import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import screens from "../../styles/screens";
import { uploadScreenStyle } from "./UploadScreen.style";

/**
 * 영상 업로드 화면
 */
function SelectTypeScreen() {
  return (
    <SafeAreaView style={screens.defaultScreenLayout}>
      <View style={uploadScreenStyle.largeButtonsContainer}>
        <TouchableOpacity style={[uploadScreenStyle.largeButton]}>
          <MaterialIcons
            style={uploadScreenStyle.largeButtonIcon}
            name="video-call"
          ></MaterialIcons>
          <Text style={uploadScreenStyle.largeButtonText}>새 영상 촬영</Text>
        </TouchableOpacity>
        <View style={uploadScreenStyle.seperation} />
        <TouchableOpacity style={uploadScreenStyle.largeButton}>
          <MaterialIcons
            style={uploadScreenStyle.largeButtonIcon}
            name="file-upload"
          />
          <Text style={uploadScreenStyle.largeButtonText}>파일 업로드</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default SelectTypeScreen;

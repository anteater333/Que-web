import { useCallback, useContext, useEffect, useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import CommonTextInput from "../../../components/inputs/CommonTextInput";
import screens from "../../../styles/screens";
import { SignUpContext } from "./SignUpContext";
import { signUpScreenStyle } from "./SignUpScreen.style";
import { MaterialIcons } from "@expo/vector-icons";
import { validateNickname } from "../../../utils/validator";

import * as ImagePicker from "expo-image-picker";
import { Toast } from "native-base";
import { useAuth } from "../../../hooks/useAuth";

const styles = signUpScreenStyle;

const SIZE_LIMIT = 1024;

/**
 * 3. 사용자 프로필 설정 화면
 * @returns
 */
export default function SetUserProfileScreen() {
  // TBD 뒤로가기 버튼 캐치해서 메인 화면으로 보내기
  // 이전 단게에서 사용자 로그인은 됐다는 것을 상정하고.

  /** 사용자가 업로드한 프로필 사진 정보 */
  const [profileURL, setProfileURL] = useState<string>("");
  /** 사용자가 입력한 이름 */
  const [userNickname, setUserNickname] = useState<string>("");
  /** 이름 유효성 검사 */
  const [isValidName, setIsValidName] = useState<boolean>(false);

  /** OAuth Provider 통한 계정 생성 시 미리 설정된 닉네임 불러오기 용도 */
  const { user } = useAuth();

  /** SignUp context */
  const {
    buttonAction,
    setButtonAction,
    buttonEnabled,
    setButtonEnabled,
    signUpNavigator,
    setHideButton,
    setNewUserProfile,
  } = useContext(SignUpContext);

  /** 프로필 업로드를 위한 이미지 픽커를 실행하는 함수 */
  const openImagePickerAsync = useCallback(async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      if (Platform.OS === "android")
        ToastAndroid.show("권한이 필요합니다.", ToastAndroid.SHORT);
      else {
        alert("권한이 필요합니다.");
      }
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
    });

    if (!pickerResult.cancelled) {
      if (pickerResult.height > SIZE_LIMIT || pickerResult.width > SIZE_LIMIT) {
        Toast.show({
          description: `사진이 너무 큽니다! (크기 제한 : ${SIZE_LIMIT}*${SIZE_LIMIT})`,
        });
        return;
      }

      setProfileURL(pickerResult.uri);
    }
  }, []);

  /** 사용자가 입력한 프로필 정보를 컨텍스트에 저장하는 함수 */
  const saveUserProfile = useCallback(() => {
    if (!profileURL) {
      // TBD 프로필 없이 할건지 물어보기 (Yes or No 입력 받아서 진행 or 진행안함)
      alert("TBD 프로필 사진 없이 진행 하시겠습니까?");
    }

    // 회원가입 컨텍스트에 임시로 등록
    setNewUserProfile((prevState) => {
      return {
        profilePictureUrl: profileURL,
        nickname: userNickname,
        description: prevState.description,
      };
    });

    signUpNavigator!.navigate("SetUserDescription");
  }, [profileURL, userNickname]);

  /** 화면 초기화 */
  useEffect(() => {
    setHideButton(false);
    setUserNickname("");
    setProfileURL("");
  }, []);

  /** Provider를 통한 신규 계정 생성 시 미리 닉네임 설정 */
  useEffect(() => {
    if (user.nickname) {
      setUserNickname(user.nickname);
    }
  }, [user.nickname]);

  /** 닉네임 유효성 검증 */
  useEffect(() => {
    const valid = userNickname.length != 0 && validateNickname(userNickname);
    setIsValidName(valid);
  }, [userNickname]);

  /** 다음 버튼 활성화 및 액션 등록 */
  useEffect(() => {
    setButtonEnabled(isValidName);

    if (isValidName) {
      setButtonAction({ action: saveUserProfile });
    }
  }, [isValidName, profileURL, userNickname]);

  return (
    <SafeAreaView style={screens.defaultScreenLayout}>
      <View style={styles.titleContainer}>
        <Pressable
          style={[
            styles.uploadButtonContainer,
            profileURL ? styles.withImage : {},
          ]}
          onPress={openImagePickerAsync}
        >
          {profileURL ? (
            <Image
              style={styles.uploadedImage}
              source={{ uri: profileURL }}
            ></Image>
          ) : (
            <View style={styles.profileUploadButtonInside}>
              <MaterialIcons
                selectable={false}
                name="add"
                style={styles.uploadButtonIcon}
              />
              <Text
                selectable={false}
                style={[styles.uploadButtonMessage, styles.textAlignCenter]}
              >
                {`${SIZE_LIMIT}*${SIZE_LIMIT}px`}
              </Text>
            </View>
          )}
        </Pressable>
      </View>
      <View style={styles.bottomContainer}>
        <CommonTextInput
          style={[styles.textInputNickname]}
          autoFocus
          selectTextOnFocus
          placeholder="당신의 이름은?"
          textContentType="name"
          accessibilityRole="text"
          invalid={!(isValidName || userNickname.length == 0)}
          onChangeText={(newStr) => setUserNickname(newStr)}
          value={userNickname}
          onKeyPress={(event) => {
            if (event.nativeEvent.key == "Enter" && buttonEnabled) {
              buttonAction.action();
            } else {
              // do nothing
            }
          }}
        />
        <Text style={[styles.messageText, styles.textAlignCenter]}>
          {`다른 사람들에게 보여질 이름입니다.\n한글, 영문자, 숫자를 사용할 수 있으며,\n이름의 길이는 2~12글자 사이여야 합니다.`}
        </Text>
      </View>
    </SafeAreaView>
  );
}

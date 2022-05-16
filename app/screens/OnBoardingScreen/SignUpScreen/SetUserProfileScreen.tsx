import { useCallback, useContext, useEffect, useState } from "react";
import {
  Alert,
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
import { useIsFocused } from "@react-navigation/native";
import UserType from "../../../types/User";
import QueResourceClient from "../../../api/QueResourceUtils";
import { useConfirm } from "../../../hooks/useConfirm";

const styles = signUpScreenStyle;

const SIZE_LIMIT = 180;

/**
 * 3. 사용자 프로필 설정 화면
 * @returns
 */
export default function SetUserProfileScreen() {
  // TBD 뒤로가기 버튼 캐치해서 메인 화면으로 보내기
  // 이전 단게에서 사용자 로그인은 됐다는 것을 상정하고.

  /** 사용자가 업로드한 프로필 사진 정보 */
  const [profileLocalURL, setProfileLocalURL] = useState<string>("");
  /** 사용자가 입력한 이름 */
  const [userNickname, setUserNickname] = useState<string>("");
  /** 이름 유효성 검사 */
  const [isValidName, setIsValidName] = useState<boolean>(false);

  /** OAuth Provider 통한 계정 생성 시 미리 설정된 닉네임 불러오기 용도 */
  const { user } = useAuth();

  /** 화면 포커스 여부 */
  const isFocused = useIsFocused();

  /** 대기 가능 alert창 사용 */
  const asyncAlert = useConfirm();

  /** SignUp context */
  const {
    buttonAction,
    setButtonAction,
    buttonEnabled,
    setButtonEnabled,
    signUpNavigator,
    setHideButton,
    setNewUserProfile,
    setIsLoading,
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

      setProfileLocalURL(pickerResult.uri);
    }
  }, []);

  /** 사용자가 입력한 프로필 정보를 컨텍스트에 저장하는 함수 */
  const saveUserProfile = useCallback(async () => {
    setIsLoading(true);
    if (
      !profileLocalURL &&
      !(await asyncAlert(
        "프로필 사진 없이 진행하시겠습니까?",
        "프로필 변경 기능은 개발 중입니다."
      ))
    ) {
      setIsLoading(false);
      return;
    }

    /** TBD profileURL 기반 storage에 업로드 후 storage URL 가져오기 */

    const updateData = {
      profilePictureUrl: profileLocalURL,
      nickname: userNickname,
    };

    // 프로필 사진과 닉네임 등록하기
    const result = await QueResourceClient.updateUserProfile(updateData);

    setNewUserProfile(updateData);

    setIsLoading(false);

    if (result.success) signUpNavigator!.navigate("SetUserDescription");
    else {
      alert(`프로필 정보 업데이트 중 문제가 생겼습니다.\n${result.errorType}`);
    }
  }, [profileLocalURL, userNickname]);

  /** 화면 초기화 */
  useEffect(() => {
    setHideButton(false);
    setUserNickname("");
    setProfileLocalURL("");
  }, []);

  /** 화면 포커스 될 때 유저 정보 불러와서 입력 폼 미리 설정 */
  useEffect(() => {
    const getUser = async () => {
      const saved = await QueResourceClient.getUserProfileData(user.userId!);
      if (!saved.errorType) {
        setUserNickname(saved.user.nickname ? saved.user.nickname : "");
      }
    };
    if (isFocused) {
      getUser();
    }
  }, [isFocused]);

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
  }, [isValidName, profileLocalURL, userNickname]);

  return (
    <SafeAreaView style={screens.defaultScreenLayout}>
      <View style={styles.titleContainer}>
        <Pressable
          style={[
            styles.uploadButtonContainer,
            profileLocalURL ? styles.withImage : {},
          ]}
          onPress={openImagePickerAsync}
        >
          {profileLocalURL ? (
            <Image
              style={styles.uploadedImage}
              source={{ uri: profileLocalURL }}
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

import { useAssets } from "expo-asset";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import CommonTextInput from "../../../components/inputs/CommonTextInput";
import screens from "../../../styles/screens";
import { validateEmail } from "../../../utils/validator";
import { SignUpContext } from "./SignUpContext";
import { signUpScreenStyle } from "./SignUpScreen.style";

/**
 * Step 1. 이메일 확인
 * @returns
 */
export default function VerifyMailScreen() {
  /** 사용자가 입력한 email 주소 */
  const [userEmail, setUserEmail] = useState<string>("");
  /** 메일 주소 검증, 메일 전송 실패 시 시각적 표시 용도 */
  const [isMailInvalid, setIsMailInvalid] = useState<boolean>(false);
  /** 인증 코드 입력 데이터 */
  const [verifyingCode, setVerifyingCode] = useState<string>("");
  /** 인증 코드 검증 성공 여부, 실패 시 시각적 표시 용도 */
  const [isCodeMatching, setIsCodeMatching] = useState<boolean>(true);
  /** 메일 발송 여부 */
  const [sentMail, setSentMail] = useState<boolean>(false);
  /** 인증 가능 잔여 시간 표시 */
  const [timer, setTimer] = useState<number>(0);

  /** 로고 표시용 에셋 접근 */
  const [assets, error] = useAssets([
    require("../../../assets/custom/logo-big.png"),
  ]);

  /** SignUp 컨텍스트 사용 */
  const {
    buttonEnabled,
    setButtonEnabled,
    buttonAction,
    setButtonAction,
    signUpNavigator,
  } = useContext(SignUpContext);

  /** TBD: In RN w/ typescript, using ref for custom functional component. To autofocus on second textinput */
  // const textInputEmail = useRef();
  // const textInputCode = useRef();
  /** 메일을 전송하고 전송 여부에 따라 인증 코드 입력 UI를 활성화합니다. */
  const sendVerificationMail = useCallback(() => {
    // TBD : 인증 메일 전송 API 호출
    const mailOk = true;

    if (!mailOk) {
      // TBD : 메일 전송 과정에서 오류 발생 시 텍스트 인풋 컴포넌트 오류 표시하기
      // setIsMailInavlid(true) // 유효하지 않은 메일 주소
      setIsMailInvalid(true);
    } else {
      // 메일 전송 결과에 따라 다음 UI 활성화
      setSentMail(true);
      setVerifyingCode("");
      setButtonEnabled(false);
      setTimer(300);
    }
  }, [userEmail]);

  /** 사용자가 입력한 코드를 검증한 다음 결과에 따라 다음 단계로 넘어갑니다. */
  const verifyWithCode = useCallback(() => {
    // 임시 코드
    const tmpKey = "111111";
    // TBD : 코드 검증 API 호출
    const succeeded = verifyingCode == tmpKey;

    if (succeeded) {
      setIsCodeMatching(true);
      // 다음 화면 이동
      signUpNavigator!.navigate("SetPassword");
    } else {
      // 에러 표시
      setIsCodeMatching(false);
    }
  }, [verifyingCode]);

  /** 진행 여부에 따라 navbar 버튼 활성화 로직 지정 */
  useEffect(() => {
    if (!sentMail) setButtonEnabled(validateEmail(userEmail));
    if (sentMail && verifyingCode.length >= 6) setButtonEnabled(true);
  }, [userEmail, verifyingCode, sentMail]);

  /** 인증 가능 시간 타이머 설정 */
  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else if (timer === 0) {
        clearInterval(countdown); // 타이머 종료
      }
    }, 1000);

    return () => clearInterval(countdown); // useEffect 콜백의 return은 컴포넌트가 unmount 될 때의 동작을 의미
  }, [timer]);

  /**  진행 여부에 따라 navbar button의 onPress 행동 결정 */
  useEffect(() => {
    if (sentMail) {
      setButtonAction({ action: verifyWithCode });
    } else {
      setButtonAction({ action: sendVerificationMail });
    }
  }, [sentMail, userEmail, verifyingCode]); // Warning, 할당하려는 함수의 dependency도 고려해야함

  return (
    <SafeAreaView style={screens.defaultScreenLayout}>
      <View
        style={signUpScreenStyle.titleContainer}
        testID="signUpTitleContainer"
      >
        {assets ? (
          <Image
            style={signUpScreenStyle.titleLogo}
            source={assets[0] as ImageSourcePropType}
          />
        ) : null}
        <Text style={signUpScreenStyle.titleText}>회원가입</Text>
      </View>

      <View style={signUpScreenStyle.bottomContainer}>
        <View>
          <CommonTextInput
            style={signUpScreenStyle.textInput}
            autoFocus
            invalid={isMailInvalid}
            accessibilityRole="text"
            textContentType="emailAddress"
            placeholder="이메일 주소를 입력해주세요."
            onChangeText={(newStr) => setUserEmail(newStr)}
            value={userEmail}
            onKeyPress={(event) => {
              if (event.nativeEvent.key == "Enter" && buttonEnabled) {
                if (!sentMail) {
                  buttonAction.action();
                }
              } else {
                // do nothing
              }
            }}
          />
        </View>
        {isMailInvalid ? (
          <View>
            <Text
              style={[
                signUpScreenStyle.messageText,
                signUpScreenStyle.errorMessageText,
              ]}
            >
              {`인증 메일을 전송하는 과정에서 오류가 발생했습니다.\n메일 주소를 다시 확인해주세요.`}
            </Text>
          </View>
        ) : null}
        {sentMail ? (
          <View>
            <CommonTextInput
              style={signUpScreenStyle.textInput}
              autoFocus
              invalid={!isCodeMatching}
              textContentType="oneTimeCode"
              accessibilityRole="text"
              placeholder="인증번호"
              onChangeText={(newStr) => setVerifyingCode(newStr)}
              value={verifyingCode}
              onKeyPress={(event) => {
                if (event.nativeEvent.key == "Enter" && buttonEnabled) {
                  if (sentMail) {
                    buttonAction.action();
                  }
                } else {
                  // do nothing
                }
              }}
            />
            {isCodeMatching ? null : (
              <Text
                style={[
                  signUpScreenStyle.messageText,
                  signUpScreenStyle.errorMessageText,
                ]}
              >
                {`잘못된 인증번호입니다. 다시 입력해주세요.`}
              </Text>
            )}
            <Text style={signUpScreenStyle.messageText}>
              {`입력하신 이메일로 인증번호를 전송했습니다.\n인증번호는 ${timer}초 이후 만료됩니다.`}
              <Text
                style={signUpScreenStyle.messageTextButton}
                onPress={sendVerificationMail}
                accessibilityRole="button"
              >
                {` 재전송 `}
              </Text>
            </Text>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

import { useToast } from "react-native-toast-notifications";
import * as Google from "expo-auth-session/providers/google";
import React, { SetStateAction, useCallback } from "react";
import QueAuthClient from "../api/QueAuthUtils";
import { QueAuthResponse } from "../api/interfaces";
import { useAppDispatch } from "./store";
import { setCredential } from "../reducers/authReducer";

// TBD 로그인 인터페이스에서 타입 지정, 그 리턴 타입을 키로써 가지도록 강제하기.
/** 로그인 과정에서의 에러 메세지 */
const signInErrorMessages: {
  [key in QueAuthResponse | "default"]?: string;
} = {
  "403": `비밀번호를 다시 확인해주세요.`,
  "404": `이메일을 다시 확인해주세요.`,
  "409": `다른 방식으로 로그인해주세요.`,
  "410": `정지된 계정입니다. 문의 부탁드립니다.`,
  "400": `유효하지 않은 이메일입니다.`,
  default: `로그인 과정에서 오류가 발생했습니다.`,
};

const googleClientId =
  "944223797321-3fc5f5sn2l4vl3k3feuf61ckb7mirheb.apps.googleusercontent.com";

/**
 * Google Auth를 통한 계정 인증
 * 이미 등록된 Google 계정이 있으면 로그인 진행 후 main 화면으로
 * 등록된 Google 계정이 없으면 회원 가입 화면으로
 */
export const useSignWithGoogle = (
  setIsLoading: React.Dispatch<SetStateAction<boolean>>
) => {
  const toast = useToast();
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: googleClientId,
    selectAccount: true,
  });

  const dispatch = useAppDispatch();

  return useCallback(async () => {
    setIsLoading(true);
    const result = await promptAsync();

    if (result.type === "success") {
      const accessToken = result.authentication?.accessToken!;

      try {
        const loginResult = await QueAuthClient.signInWithGoogle(accessToken);

        /** 에러 발생 시 토스트에 표시할 메세지 */
        let errMsg: string | undefined;

        switch (loginResult.status) {
          case QueAuthResponse.OK: {
            // TBD 온보딩 화면 첫 화면으로 넘긴 뒤 로그인 여부 파악 후 메인 화면으로 보내기
            //    onBoardingNavigator.navigate("CatchPhrase");
            toast.show("로그인했습니다."); // 임시

            // 로그인 정보 설정
            dispatch(
              setCredential({
                user: loginResult.user,
                token: loginResult.token,
              })
            );

            break;
          }
          case QueAuthResponse.Created: {
            // TBD google 계정으로 새 계정으로 생성된 경우
            toast.show("새 계정을 생성합니다."); // 임시

            // 로그인 정보 설정
            dispatch(
              setCredential({
                user: loginResult.user,
                token: loginResult.token,
              })
            );

            break;
          }
          default: {
            errMsg = signInErrorMessages[loginResult.status];
            break;
          }
        }

        if (errMsg) {
          toast.show(errMsg, { type: "danger" });
        }
      } catch (error) {
        const errorMessage = signInErrorMessages.default + `\n${error}`;
        toast.show(errorMessage, {
          type: "danger",
        });
      }
    } else {
      // 오류 처리
    }

    // if (result) {
    //   // 로그인 성공함
    //   // navigate to signup screen with google user info
    //   onBoardingNavigator.navigate("SignUp", {
    //     someGoogleTokenShit: { userName: "삼식이" },
    //   });
    // }
    setIsLoading(false);
  }, [response, request]);
};

/**
 * 외부 OAuth Provider 사용 없이 이메일과 비밀번호를 통해 로그인합니다.
 */
export const useSignInWithQue = (
  userEmail: string,
  password: string,
  setIsLoading: React.Dispatch<SetStateAction<boolean>>
) => {
  const toast = useToast();
  const dispatch = useAppDispatch();

  return useCallback(async () => {
    setIsLoading(true);
    try {
      const loginResult = await QueAuthClient.signInWithQueSelfManaged(
        userEmail,
        password
      );

      /** 에러 발생 시 토스트에 표시할 메세지 */
      let errMsg: string | undefined;

      switch (loginResult.status) {
        case QueAuthResponse.OK: {
          // TBD 온보딩 화면 첫 화면으로 넘긴 뒤 로그인 여부 파악 후 메인 화면으로 보내기
          //    onBoardingNavigator.navigate("CatchPhrase");
          toast.show("로그인했습니다."); // 임시

          // 로그인 정보 설정
          dispatch(
            setCredential({
              user: loginResult.user,
              token: loginResult.token,
            })
          );

          break;
        }
        default: {
          errMsg = signInErrorMessages[loginResult.status];
          break;
        }
      }

      if (errMsg) {
        toast.show(errMsg, { type: "danger" });
      }
    } catch (error) {
      const errorMessage = signInErrorMessages.default + `\n${error}`;
      toast.show(errorMessage, {
        type: "danger",
      });
    }

    setIsLoading(false);
  }, [userEmail, password]);
};

import { useNavigation } from "@react-navigation/native";
import { createContext, Dispatch, SetStateAction } from "react";
import { SignUpStackNavigationProp } from "../../../navigators/OnBoardingNavigator";

type SignUpContextType = {
  signUpNavigator: SignUpStackNavigationProp | undefined;
  buttonEnabled: boolean;
  setButtonEnabled: Dispatch<SetStateAction<boolean>>;
  buttonAction: { action: () => void }; // function을 바로 쓰지 않고 객체로 wrapping 해야 변경 가능합니다.
  setButtonAction: Dispatch<SetStateAction<{ action: () => void }>>;
  hideSkipButton: boolean;
  setHideSkipButton: Dispatch<SetStateAction<boolean>>;
};
const defaultSignUpContext: SignUpContextType = {
  signUpNavigator: undefined,
  buttonEnabled: false,
  setButtonEnabled: function (): void {
    throw new Error("Function not implemented.");
  },
  buttonAction: {
    action: function (): void {
      throw new Error("Function not implemented.");
    },
  },
  setButtonAction: function (): void {
    throw new Error("Function not implemented.");
  },
  hideSkipButton: true,
  setHideSkipButton: function (value: SetStateAction<boolean>): void {
    throw new Error("Function not implemented.");
  },
};

/**
 * 회원가입 흐름에 한정되어 사용할 Context
 */
export const SignUpContext =
  createContext<SignUpContextType>(defaultSignUpContext);

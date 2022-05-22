import { createContext, Dispatch, SetStateAction } from "react";

type UploadContextType = {
  buttonEnabled: boolean;
  setButtonEnabled: Dispatch<SetStateAction<boolean>>;
  buttonHidden: boolean;
  setButtonHidden: Dispatch<SetStateAction<boolean>>;
};
const defaultUploadContext: UploadContextType = {
  buttonEnabled: false,
  setButtonEnabled: function (value: SetStateAction<boolean>): void {
    throw new Error("Function not implemented.");
  },
  buttonHidden: false,
  setButtonHidden: function (value: SetStateAction<boolean>): void {
    throw new Error("Function not implemented.");
  },
};

/**
 * 비디오 업로드 흐름에 한정되어 사용할 Context
 */
export const UploadContext =
  createContext<UploadContextType>(defaultUploadContext);

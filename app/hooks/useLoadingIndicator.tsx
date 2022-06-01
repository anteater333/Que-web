import React, {
  ContextType,
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ScreenCoverLoadingSpinner from "../components/common/ScreenCoverLoadingIndicator";
import { selectIsSigned, selectCurrentUser } from "../reducers/authReducer";

type LoadingIndicatorContextType = {
  /** 로딩 표시 */
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  /** 로딩 중 메세지 */
  loadingMessage: string;
  setLoadingMessage: Dispatch<SetStateAction<string>>;
};

const LoadingIndicatorContext = createContext<LoadingIndicatorContextType>({
  isLoading: false,
  setIsLoading: () => {
    throw new Error("Function not implemented.");
  },
  loadingMessage: "",
  setLoadingMessage: function (value: SetStateAction<string>): void {
    throw new Error("Function not implemented.");
  },
});

export function LoadingIndicatorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("");

  return (
    <LoadingIndicatorContext.Provider
      value={{ isLoading, setIsLoading, loadingMessage, setLoadingMessage }}
    >
      {children}
      {isLoading ? (
        <ScreenCoverLoadingSpinner message={loadingMessage} />
      ) : null}
    </LoadingIndicatorContext.Provider>
  );
}

/**
 * 화면 전체를 덮는 로딩 표시를 사용합니다.
 * @returns
 */
export const useLoadingIndicator = (message?: string) => {
  const { setIsLoading, setLoadingMessage } = useContext(
    LoadingIndicatorContext
  );

  useEffect(() => {
    if (message) setLoadingMessage(message);
  }, []);

  const showLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  /** 로딩 표시를 숨깁니다. */
  const hideLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return {
    /** 로딩 표시 아래에 출력할 메세지를 설정합니다. */
    setLoadingMessage,
    /** 로딩을 표시를 나타냅니다. */
    showLoading,
    /** 로딩 표시를 숨깁니다. */
    hideLoading,
  };
};

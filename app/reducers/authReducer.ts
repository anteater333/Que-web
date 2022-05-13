import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import UserType from "../types/User";

/** 현재 로그인 한 사용자 상태 */
export type AuthState = {
  /** 사용자 프로필 정보 */
  user: UserType;
  /** 사용자 로그인 여부 */
  isSigned: boolean;
};

/** 최초 상태 */
const initialState: AuthState = {
  user: {},
  isSigned: false,
};

// Ducks 패턴
/** Auth 관련 상태 저장소 생성 */
const { actions, reducer: authReducer } = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    /** 로그인한 사용자의 정보를 저장합니다. */
    setCredential: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      state.isSigned = true;
    },
    /** 사용자 정보를 상태에서 제거합니다. */
    clearCredential: (state) => {
      state.user = {};
      state.isSigned = false;
    },
  },
  extraReducers: {},
});

export const { setCredential, clearCredential } = actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsSigned = (state: RootState) => state.auth.isSigned;

export default authReducer;

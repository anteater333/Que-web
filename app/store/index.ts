// store.ts
/**
 * @module store
 * 어플리케이션 전역적으로 사용될 상태의 저장소
 */

import { configureStore } from "@reduxjs/toolkit";
import reducers from "../reducers";

/**
 * Globalized app store
 */
const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

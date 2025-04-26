"use client";

import { configureStore } from "@reduxjs/toolkit";
import faceReducer from "./faceSlice";
import { Provider } from "react-redux";
import React from "react";

export const store = configureStore({
  reducer: {
    face: faceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

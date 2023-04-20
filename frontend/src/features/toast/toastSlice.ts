import { RootState } from "@/app/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ReactNode } from "react";

interface ToastState {
  isShow: boolean;
  title?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
}

const slice = createSlice({
  name: "toast",
  initialState: { isShow: false } as ToastState,
  reducers: {
    openToast: (
      state,
      {
        payload: { title, body, footer },
      }: PayloadAction<Omit<ToastState, "isShow">>
    ) => {
      state.isShow = true;
      state.title = title;
      state.body = body;
      state.footer = footer;
    },
    closeToast: (state) => {
      state.isShow = false;
    },
  },
});

const toastReducer = slice.reducer;

const selectToast = (state: RootState) => state.toast;

export const { openToast, closeToast } = slice.actions;
export { selectToast };
export default toastReducer;

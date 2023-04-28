import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleState {
  left: boolean;
  right: boolean;
}

const slice = createSlice({
  name: "toggle",
  initialState: { left: false, right: false } as ToggleState,
  reducers: {
    setLeftHeaderToggle: (
      state,
      { payload: value }: PayloadAction<boolean>
    ) => {
      state.left = value;
    },
    setRightHeaderToggle: (
      state,
      { payload: value }: PayloadAction<boolean>
    ) => {
      state.right = value;
    },
    toggleLeftHeader: (state) => {
      state.left = !state.left;
    },
    toggleRightHeader: (state) => {
      state.right = !state.right;
    },
  },
});

const headerReducer = slice.reducer;

const selectLeftHeaderToggle = (state: RootState) => state.header.left;
const selectRightHeaderToggle = (state: RootState) => state.header.right;

export const {
  setLeftHeaderToggle,
  setRightHeaderToggle,
  toggleLeftHeader,
  toggleRightHeader,
} = slice.actions;
export { selectLeftHeaderToggle, selectRightHeaderToggle };
export default headerReducer;

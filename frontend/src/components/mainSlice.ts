import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface IMainState {
  appData: null | any;
}

const initialState: IMainState = {
  appData: {},
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setAppData: (state, action: PayloadAction<any>) => {
      state.appData = action.payload;
    },
  },
});

export const { setAppData } = mainSlice.actions;

export const main = (state: RootState) => state.main;

export default mainSlice.reducer;

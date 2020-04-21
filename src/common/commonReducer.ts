import {createSlice} from "@reduxjs/toolkit";

export interface State {
  message: string;
}

export const initialState: State = {
  message: "My message"
};

const common = createSlice({
  name: "common",
  initialState,
  reducers: {}
});

export default common.reducer;

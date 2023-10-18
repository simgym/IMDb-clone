import { configureStore, createSlice } from "@reduxjs/toolkit";

const IDInitialState = { ID: "" };

const IDSlice = createSlice({
  name: "IDStorgae",
  initialState: IDInitialState,
  reducers: {
    IDData(state, action) {
      state.ID = action.payload;
    },
  },
});

const IDReducer = IDSlice.reducer;

export const IDAction = IDSlice.actions;

export default IDReducer;

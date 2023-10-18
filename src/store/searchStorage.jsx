import { createSlice, configureStore } from "@reduxjs/toolkit";

const searchInitialState = { searchItems: "" };

const SearchSlice = createSlice({
  name: "search",
  initialState: searchInitialState,
  reducers: {
    search(state, action) {
      state.searchItems = action.payload;
    },
  },
});

const searchReducer = SearchSlice.reducer;

export const searchAction = SearchSlice.actions;

export default searchReducer;

import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchStorage";
import IDReducer from "./IDStorage";

const store = configureStore({
  reducer: { searchReducer: searchReducer, IDReducer: IDReducer },
});

export default store;

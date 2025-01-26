import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./navSlice";
import searchSlice from "./searchSlice";
import chatSlice from "./LiveCommentSlice";
import searchResultReducer from "./searchResultSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    search: searchSlice,
    chat: chatSlice,
    searchResult: searchResultReducer,
  },
});

export default store;

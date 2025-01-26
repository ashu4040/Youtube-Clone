import { createSlice } from "@reduxjs/toolkit";

const searchResultSlice = createSlice({
  name: "searchResult",
  initialState: {
    query: "",
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { setSearchQuery } = searchResultSlice.actions;
export default searchResultSlice.reducer;

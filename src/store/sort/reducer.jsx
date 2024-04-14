import { createSlice } from "@reduxjs/toolkit";


const initialState = { sortType: "POPULAR" };

const SortBySlice = createSlice({
  name: "sortBy",
  initialState,
  reducers: {
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

export const { setSortType } = SortBySlice.actions;

export default SortBySlice.reducer;

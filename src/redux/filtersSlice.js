import { createSlice } from "@reduxjs/toolkit";

const initialFilter = { filterValue: " " };

const filtersSlice = createSlice({
  name: "filter",
  initialState: initialFilter,
  reducers: {
    setFilterValue: (state, action) => {
      state.filterValue = action.payload;
    },
  },
});
export const filterReducer = filtersSlice.reducer;
export const { setFilterValue } = filtersSlice.actions;

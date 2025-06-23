import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: ["TEST DATA"],
  isLoading: false,
  error: null,
};

export const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {},
});

export const {} = filmsSlice.actions;

export default filmsSlice.reducer;

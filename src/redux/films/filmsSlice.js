import { createSlice } from "@reduxjs/toolkit";
import { fetchFilms } from "./operations";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const filmsSlice = createSlice({
  name: "films",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilms.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default filmsSlice.reducer;

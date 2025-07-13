import { createSlice } from "@reduxjs/toolkit";
import { fetchFilms, fetchGenres, fetchFilmByGenre } from "./operations";

const initialState = {
  items: [],
  genres: [],
  filmsByGenres: [],
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
      })
      .addCase(fetchGenres.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.genres = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchFilmByGenre.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchFilmByGenre.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.filmsByGenres = action.payload;
      })
      .addCase(fetchFilmByGenre.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default filmsSlice.reducer;

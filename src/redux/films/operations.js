import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_API_KEY,
  },
};

axios.defaults.baseURL = "https://api.themoviedb.org/3";

export const fetchFilms = createAsyncThunk(
  "films/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc",
        options
      );

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchGenres = createAsyncThunk(
  "films/fetchAllGenres",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "/genre/movie/list?language=en",
        options
      );
      return response.data.genres;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchFilmByGenre = createAsyncThunk(
  "films/fetchFilmByGenre",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `/discover/movie?with_genres=${id}&language=en-US`,
        options
      );
      console.log("FIlms", response);

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

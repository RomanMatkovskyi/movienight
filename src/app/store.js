import { configureStore } from "@reduxjs/toolkit";
import filmsReducer from "../redux/films/filmsSlice";

export const store = configureStore({ reducer: { films: filmsReducer } });

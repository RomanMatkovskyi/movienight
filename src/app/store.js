import { configureStore } from "@reduxjs/toolkit";
import filmsReducer from "../features/films/filmsSlice";

export const store = configureStore({ reducer: { films: filmsReducer } });

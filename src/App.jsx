import "./App.css";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import TvShowsPage from "./pages/TvShowsPage";
import MoviePage from "./pages/MoviePage";
import MoviesPage from "./pages/MoviesPage";
import ErrorPage from "./pages/ErrorPage";
import SharedLayout from "./pages/SharedLayout";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="tv" element={<TvShowsPage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="movies/:id" element={<MoviePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

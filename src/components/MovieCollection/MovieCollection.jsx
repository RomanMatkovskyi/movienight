import { useEffect, useState } from "react";
import axios from "axios";
import {
  GalleryWrapper,
  MovieItemTitle,
  LoadMoreBtn,
} from "./MovieCollection.styled";

import Filter from "../Filter/Filter";

const MovieCollection = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  console.log("movies", movies);

  function buildDiscoverUrl(selectedGenres = [], options = {}) {
    const baseUrl = "https://api.themoviedb.org/3/discover/movie";

    const params = new URLSearchParams({
      language: options.language || "en-US",
      sort_by: options.sortBy || "popularity.desc",
      page: options.page?.toString() || "1",
    });

    if (selectedGenres.length > 0) {
      params.append("with_genres", selectedGenres.join(","));
    }

    if (options.year) {
      params.append("primary_release_year", options.year.toString());
    }

    if (options.minRating) {
      params.append("vote_average.gte", options.minRating.toString());
    }

    return `${baseUrl}?${params.toString()}`;
  }

  // `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`

  useEffect(() => {
    const fetchMovies = () => {
      setIsLoading(true);
      axios
        .get(buildDiscoverUrl(selectedGenres, { page: currentPage }), {
          headers: {
            Authorization: import.meta.env.VITE_API_KEY,
            accept: "application/json",
          },
        })
        .then((response) => {
          setMovies((prevState) => [...prevState, ...response.data.results]);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchMovies();
  }, [selectedGenres, currentPage]);

  return (
    <div>
      <Filter
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
      <GalleryWrapper>
        {movies.map((movie) => {
          if (!movie.poster_path || !movie.original_title) return null;
          return (
            <div key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                alt={movie.original_title}
              />
              <MovieItemTitle>{movie.original_title}</MovieItemTitle>
            </div>
          );
        })}
      </GalleryWrapper>
      <LoadMoreBtn
        type="button"
        onClick={() => {
          setCurrentPage((prevState) => prevState + 1);
        }}
      >
        Load more
      </LoadMoreBtn>
    </div>
  );
};

export default MovieCollection;

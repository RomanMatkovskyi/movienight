import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  GalleryWrapper,
  MovieItemTitle,
  LoadMoreBtn,
} from "./MovieCollection.styled";

import Filter from "../MovieFilter/MovieFilter";

const MovieCollection = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);

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
          setMovies((prevState) => {
            if (currentPage === 1) {
              return response.data.results;
            } else {
              return [...prevState, ...response.data.results];
            }
          });
        })
        .catch((error) => {
          navigate("/error", { state: { error: error.message } });
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchMovies();
  }, [selectedGenres, currentPage]);

  const uniqueMovies = movies.filter(
    (value, index, self) => index === self.findIndex((m) => m.id === value.id)
  );

  return (
    <div>
      <Filter
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        setCurrentPage={setCurrentPage}
        setMovies={setMovies}
      />
      <GalleryWrapper>
        {uniqueMovies.map((movie) => {
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

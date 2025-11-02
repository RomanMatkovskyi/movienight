import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router";
import axios from "axios";
import {
  GalleryWrapper,
  StyledLink,
  MovieItemTitle,
  LoadMoreBtn,
  NoMovieTitle,
} from "./MovieCollection.styled";

import MovieFilter from "../MovieFilter/MovieFilter";

const MovieCollection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let mainPageSelectedGenre = location.state?.selectedGenre
    ? [location.state.selectedGenre]
    : [];

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState(mainPageSelectedGenre);

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
      <MovieFilter
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        setCurrentPage={setCurrentPage}
        setMovies={setMovies}
      />
      {movies.length === 0 && !isLoading && (
        <NoMovieTitle>No movies found ... </NoMovieTitle>
      )}
      <GalleryWrapper>
        {uniqueMovies.map((movie) => {
          if (!movie.poster_path || !movie.original_title) return null;
          return (
            <StyledLink to={`${movie.id}`} key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                alt={movie.original_title}
              />
              <MovieItemTitle>{movie.original_title}</MovieItemTitle>
            </StyledLink>
          );
        })}
      </GalleryWrapper>
      {!isLoading && movies.length >= 20 && (
        <LoadMoreBtn
          type="button"
          onClick={() => {
            setCurrentPage((prevState) => prevState + 1);
          }}
        >
          Load more
        </LoadMoreBtn>
      )}
    </div>
  );
};

export default MovieCollection;

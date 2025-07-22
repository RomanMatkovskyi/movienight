import { useState, useEffect } from "react";
import axios from "axios";
import { GenresContainer, GenresItemTitle } from "./TvShowFilter.styled";

const TvShowFilter = ({ shows, setShows, currentPage, setCurrentPage }) => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);

  function buildDiscoverUrl(selectedGenres = [], options = {}) {
    const baseUrl = "https://api.themoviedb.org/3/discover/tv";

    const params = new URLSearchParams({
      language: options.language || "en-US",
      sort_by: options.sortBy || "popularity.desc",
      page: options.page?.toString() || "1",
      include_adult: options.adults || true,
      include_null_first_air_dates: options.firstAir || false,
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

  // fetch Genre
  useEffect(() => {
    const fetchGenre = () => {
      setIsLoading(true);
      axios
        .get("https://api.themoviedb.org/3/genre/tv/list?language=en", {
          headers: {
            Authorization: import.meta.env.VITE_API_KEY,
            accept: "application/json",
          },
        })
        .then((response) => {
          setGenres(response.data.genres);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchGenre();
  }, []);

  // fetch Tv Shows
  useEffect(() => {
    const fetchShows = () => {
      setIsLoading(true);
      axios
        .get(buildDiscoverUrl(selectedGenres, { page: currentPage }), {
          headers: {
            Authorization: import.meta.env.VITE_API_KEY,
            accept: "application/json",
          },
        })
        .then((response) => {
          setShows((prevState) => {
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

    fetchShows();
  }, [currentPage, selectedGenres]);

  return (
    <div>
      <GenresContainer>
        <h2>Filter by genre</h2>
        {genres.map((genre) => {
          return (
            <GenresItemTitle
              key={genre.id}
              type="button"
              onClick={() => {
                setCurrentPage(1);
                setSelectedGenres((prevState) => {
                  if (prevState.includes(genre.id)) {
                    return prevState.filter((id) => id !== genre.id);
                  }
                  return [...prevState, genre.id];
                });
              }}
              className={
                Array.isArray(selectedGenres) &&
                selectedGenres.length > 0 &&
                selectedGenres.includes(genre.id)
                  ? "active"
                  : ""
              }
            >
              {genre.name}
            </GenresItemTitle>
          );
        })}
      </GenresContainer>
      {shows.length === 0 && <p>No TV shows found ... </p>}
    </div>
  );
};

export default TvShowFilter;

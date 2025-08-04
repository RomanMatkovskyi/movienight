import { useState, useEffect, useRef } from "react";
import axios from "axios";

import {
  SectionTitleWrapper,
  GenresContainer,
  GenresItemTitle,
  FormLabel,
} from "./MovieFilter.styled";

const Filter = ({
  selectedGenres,
  setSelectedGenres,
  setCurrentPage,
  setMovies,
}) => {
  const firstRender = useRef(false);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setSelectedGenres([]);
    setMovies([]);
    setQuery(e.target.elements.query.value);
  };

  // fetch Genre
  useEffect(() => {
    const fetchGenre = () => {
      setIsLoading(true);
      axios
        .get("https://api.themoviedb.org/3/genre/movie/list?language=en", {
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

  // find search movie
  useEffect(() => {
    if (!firstRender.current) {
      firstRender.current = true;
      return;
    }

    const fetchSearchMovie = (q) => {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?query=${q}&include_adult=false&language=en-US&page=1`,
          {
            headers: {
              Authorization: import.meta.env.VITE_API_KEY,
              accept: "application/json",
            },
          }
        )
        .then((response) => {
          setMovies(response.data.results);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {});
    };

    fetchSearchMovie(query);
  }, [query]);

  return (
    <div>
      <SectionTitleWrapper>
        <h2>Filter by genre</h2>
        <GenresContainer>
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
      </SectionTitleWrapper>

      <div>
        <form onSubmit={onSubmit}>
          <FormLabel htmlFor="query" style={{ color: "white" }}>
            Search Movie
          </FormLabel>
          <input type="text" id="query" name="query" />
        </form>
      </div>
    </div>
  );
};

export default Filter;

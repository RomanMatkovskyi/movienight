import { useState, useEffect } from "react";
import axios from "axios";

import { GenresTitle, GenresContainer, GenresItemTitle } from "./Filter.styled";

const Filter = ({ selectedGenres, setSelectedGenres }) => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
  return (
    <div>
      <h2>Filter by</h2>
      <div>
        <GenresTitle>Genres</GenresTitle>
        <GenresContainer>
          {genres.map((genre) => {
            return (
              <GenresItemTitle
                key={genre.id}
                type="button"
                onClick={() => {
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
      </div>
    </div>
  );
};

export default Filter;

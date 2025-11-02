import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useNavigate } from "react-router";

import {
  SectionWrapper,
  MovieImage,
  MovieTitle,
  GenreWrapper,
  GenreLink,
  MovieDescription,
  MovieTagLine,
} from "./MoviePage.styled";

const MoviePage = () => {
  const params = useParams();
  const movieId = params.id;
  const navigate = useNavigate;
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchMovie = () => {
      //   setIsLoading(true);
      axios
        .get(`https://api.themoviedb.org/3/movie/${movieId}?&language=en-US`, {
          headers: {
            Authorization: import.meta.env.VITE_API_KEY,
            accept: "application/json",
          },
        })
        .then((response) => {
          console.log(response.data);
          setMovie([response.data]);
        })
        .catch((error) => {
          navigate("/error", { state: { error: error.message } });
        })
        .finally(() => {
          //   setIsLoading(false);
        });
    };

    fetchMovie();
  }, []);

  // src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}

  return (
    <div>
      {movie &&
        movie.map((data) => {
          return (
            <SectionWrapper
              key={data.id}
              $bg={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
            >
              <MovieImage
                src={`https://image.tmdb.org/t/p/w342${data.poster_path}`}
                alt={data.original_title}
              />
              <div>
                <MovieTitle>{data.original_title}</MovieTitle>
                <GenreWrapper>
                  {data.genres.map((genre) => {
                    return (
                      <GenreLink
                        key={genre.id}
                        to={"/movies"}
                        state={{ selectedGenre: genre.id }}
                      >
                        {genre.name}
                      </GenreLink>
                    );
                  })}
                </GenreWrapper>
                <MovieDescription>{data.overview}</MovieDescription>
                <MovieTagLine>{data.tagline}</MovieTagLine>
              </div>
            </SectionWrapper>
          );
        })}
    </div>
  );
};

export default MoviePage;

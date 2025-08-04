import { useState, useEffect } from "react";
import axios from "axios";
import {
  Wrapper,
  CategoryTitle,
  MovieImg,
  MovieTitle,
} from "./TopRatedMovies.styled";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: { breakpoint: { max: 1440, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const TopRatedMovies = () => {
  const [topRatedMovies, setTopRated] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopRated = () => {
      setIsLoading(true);
      axios
        .get(
          "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
          {
            headers: {
              Authorization: import.meta.env.VITE_API_KEY,
              accept: "application/json",
            },
          }
        )
        .then((response) => {
          setTopRated(response.data.results);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchTopRated();
  }, []);

  return (
    <Wrapper>
      <CategoryTitle>Top Rated Movies</CategoryTitle>
      <Carousel
        responsive={responsive}
        arrows={true}
        showDots={false}
        infinite={true}
        keyBoardControl={true}
        slidesToSlide={1}
        itemClass="carousel-item-spacing"
        autoPlay // To add AutoPlay
        autoPlaySpeed={2000}
      >
        {topRatedMovies.map((film) => {
          return (
            <div key={film.id}>
              <MovieImg
                src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}
                alt={film.original_title}
              />
              <MovieTitle>{film.original_title}</MovieTitle>
            </div>
          );
        })}
      </Carousel>
    </Wrapper>
  );
};

export default TopRatedMovies;

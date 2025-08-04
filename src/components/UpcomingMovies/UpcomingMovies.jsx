import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";

import {
  Wrapper,
  CategoryTitle,
  MovieTitle,
  ItemWrapper,
} from "./UpcomingMovies.styled";

const responsive = {
  desktop: { breakpoint: { max: 1440, min: 1024 }, items: 7 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const UpcomingMovies = () => {
  const [upcomingMovies, setUpcoming] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpcoming = () => {
      setIsLoading(true);
      axios
        .get(
          "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
          {
            headers: {
              Authorization: import.meta.env.VITE_API_KEY,
              accept: "application/json",
            },
          }
        )
        .then((response) => {
          setUpcoming(response.data.results);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchUpcoming();
  }, []);

  return (
    <Wrapper>
      <CategoryTitle>Upcoming movies</CategoryTitle>
      {isLoading && <p>Data is loading ...</p>}
      <Carousel
        responsive={responsive}
        arrows={true}
        showDots={false}
        infinite={true}
        keyBoardControl={true}
        slidesToSlide={7}
      >
        {upcomingMovies.map((film) => {
          return (
            <ItemWrapper>
              <div key={film.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w154${film.poster_path}`}
                  alt={film.original_title}
                />
                <MovieTitle>{film.original_title}</MovieTitle>
              </div>
            </ItemWrapper>
          );
        })}
      </Carousel>
    </Wrapper>
  );
};

export default UpcomingMovies;

import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";

import {
  Wrapper,
  CategoryTitle,
  MovieTitle,
  ItemWrapper,
} from "./HomePageMovies.styled";

const responsive = {
  desktop: { breakpoint: { max: 1440, min: 1024 }, items: 7 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const HomePageMovies = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNowPlaying = () => {
      setIsLoading(true);
      axios
        .get(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
          {
            headers: {
              Authorization: import.meta.env.VITE_API_KEY,
              accept: "application/json",
            },
          }
        )
        .then((response) => {
          setNowPlayingMovies(response.data.results);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchNowPlaying();
  }, []);

  return (
    <Wrapper>
      <div>
        <CategoryTitle>Now Playing</CategoryTitle>
        {isLoading && <p>Data is loading ...</p>}
        <Carousel
          responsive={responsive}
          arrows={true}
          showDots={false}
          infinite={true}
          keyBoardControl={true}
          slidesToSlide={6}
          itemClass="carousel-item-spacing"
        >
          {nowPlayingMovies.map((film) => {
            return (
              <ItemWrapper>
                <div key={film.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w154${film.poster_path}`}
                    alt=""
                  />
                  <MovieTitle>{film.original_title}</MovieTitle>
                </div>
              </ItemWrapper>
            );
          })}
        </Carousel>
      </div>
    </Wrapper>
  );
};

export default HomePageMovies;

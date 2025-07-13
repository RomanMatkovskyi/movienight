import { useSelector } from "react-redux";
import { Wrapper, MovieTitle } from "./HomePageMovies.styled";
import { useState, useEffect } from "react";
import axios from "axios";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
        <MovieTitle>Now Playing</MovieTitle>
        {isLoading && <p>Data is loading ...</p>}
        <Carousel
          responsive={responsive}
          arrows={true}
          showDots={false}
          infinite={true}
          keyBoardControl={true}
          slidesToSlide={6}
          // centerMode={true}
          itemClass="carousel-item-spacing"
          // autoPlay // To add AutoPlay
          // autoPlaySpeed={2000}
        >
          {/* {Array.isArray(data?.results) &&
            data.results.length > 0 &&
            data.results.map((film) => { */}
          {nowPlayingMovies.map((film) => {
            return (
              <div key={film.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w154${film.poster_path}`}
                  alt=""
                />
                <MovieTitle>{film.original_title}</MovieTitle>
              </div>
            );
          })}
        </Carousel>
      </div>
    </Wrapper>
  );
};

export default HomePageMovies;

import { useState, useEffect } from "react";
import axios from "axios";

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
    <div>
      <h2>Top Rated Movies</h2>
      <Carousel
        responsive={responsive}
        arrows={true}
        showDots={false}
        infinite={true}
        keyBoardControl={true}
        slidesToSlide={1}
        itemClass="carousel-item-spacing"
        // autoPlay // To add AutoPlay
        // autoPlaySpeed={2000}
      >
        {topRatedMovies.map((film) => {
          return (
            <div key={film.id}>
              <img
                src={`https://image.tmdb.org/t/p/w1280${film.backdrop_path}`}
                alt={film.original_title}
              />
              <h3>{film.original_title}</h3>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default TopRatedMovies;

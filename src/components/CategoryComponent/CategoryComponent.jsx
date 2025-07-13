import { useSelector } from "react-redux";
import { GenreTitle } from "./CategoryComponent.styled";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState, useEffect } from "react";
import axios from "axios";

const responsive = {
  desktop: { breakpoint: { max: 1440, min: 1024 }, items: 5 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const CategoryComponent = () => {
  const genres = useSelector((state) => state.films.genres);
  const [selectedId, setSelectedId] = useState(35);
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const fetchNowPlaying = () => {
      setIsLoading(true);
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${selectedId}&language=en-US`,
          {
            headers: {
              Authorization: import.meta.env.VITE_API_KEY,
              accept: "application/json",
            },
          }
        )
        .then((response) => {
          setFilms(response.data.results);
        })
        .catch((error) => {
          setIsError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchNowPlaying();
  }, [selectedId]);

  return (
    <div>
      <h2>Category component</h2>
      <ul>
        {Array.isArray(genres) &&
          genres.length > 0 &&
          genres.slice(0, 10).map((genre) => {
            return (
              <li key={genre.id}>
                <GenreTitle
                  type="button"
                  onClick={() => {
                    setSelectedId(genre.id);
                  }}
                >
                  {genre.name}
                </GenreTitle>
              </li>
            );
          })}
      </ul>
      <div>
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
          {Array.isArray(films) &&
            films.length > 0 &&
            films.map((film) => {
              return (
                <div key={film.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w154${film.poster_path}`}
                    alt={film.original_title}
                  />
                  <h3>{film.original_title}</h3>
                </div>
              );
            })}
        </Carousel>
      </div>
    </div>
  );
};

export default CategoryComponent;

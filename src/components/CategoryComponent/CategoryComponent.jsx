import { useSelector } from "react-redux";
import { Wrapper, GenreTitle, ItemWrapper } from "./CategoryComponent.styled";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState, useEffect } from "react";
import axios from "axios";

const responsive = {
  desktop: { breakpoint: { max: 1440, min: 1024 }, items: 7 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const CategoryComponent = () => {
  const genres = useSelector((state) => state.films.genres);
  const [selectedGenre, setSelectedGenre] = useState(28);
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const fetchGenre = () => {
      setIsLoading(true);
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${selectedGenre}&language=en-US`,
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

    fetchGenre();
  }, [selectedGenre]);

  return (
    <div>
      <h2>Category component</h2>
      <Wrapper>
        {Array.isArray(genres) &&
          genres.length > 0 &&
          genres.slice(0, 10).map((genre) => {
            return (
              <li key={genre.id}>
                <GenreTitle
                  type="button"
                  className={selectedGenre === genre.id ? "choosen_genre" : ""}
                  onClick={() => {
                    setSelectedGenre(genre.id);
                  }}
                >
                  {genre.name}
                </GenreTitle>
              </li>
            );
          })}
      </Wrapper>
      <div>
        <Carousel
          responsive={responsive}
          arrows={true}
          showDots={false}
          infinite={true}
          keyBoardControl={true}
          slidesToSlide={6}
          itemClass="carousel-item-spacing"
        >
          {Array.isArray(films) &&
            films.length > 0 &&
            films.map((film) => {
              return (
                <ItemWrapper key={film.id}>
                  <div>
                    <img
                      src={`https://image.tmdb.org/t/p/w154${film.poster_path}`}
                      alt={film.original_title}
                    />
                    <h3>{film.original_title}</h3>
                  </div>
                </ItemWrapper>
              );
            })}
        </Carousel>
      </div>
    </div>
  );
};

export default CategoryComponent;

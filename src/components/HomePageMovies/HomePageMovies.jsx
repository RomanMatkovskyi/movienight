import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Wrapper } from "./HomePageMovies.styled";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: { breakpoint: { max: 1440, min: 1024 }, items: 7 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const HomePageMovies = () => {
  const [films, setFilms] = useState([]);
  const data = useSelector((state) => state.films.items);
  console.log("Films", data);

  return (
    <Wrapper>
      <div>
        <Carousel
          responsive={responsive}
          arrows={true}
          showDots={false}
          infinite={true}
          keyBoardControl={true}
          slidesToSlide={6}
          centerMode={true}
          itemClass="carousel-item-spacing"
          // autoPlay // To add AutoPlay
          // autoPlaySpeed={2000}
        >
          {Array.isArray(data?.results) &&
            data.results.length > 0 &&
            data.results.map((film) => {
              return (
                <div key={film.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w154${film.poster_path}`}
                    alt=""
                  />
                  <h2>{film.original_title}</h2>
                </div>
              );
            })}
        </Carousel>
      </div>
    </Wrapper>
  );
};

export default HomePageMovies;

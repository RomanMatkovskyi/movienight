import { useTopRated } from "../../hooks/useTopRated";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: { breakpoint: { max: 1440, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const TopRatedMovies = () => {
  const { topRatedMovies, topRatedLoading, topRatedError } = useTopRated();
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

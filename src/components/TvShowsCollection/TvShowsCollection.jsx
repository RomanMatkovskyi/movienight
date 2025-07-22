import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import TvShowFilter from "../TvShowFilter/TvShowFilter";
import { GalleryWrapper, ShowItemTitle } from "./TvShowsCollection.styled";

const TvShowsCollection = () => {
  const navigate = useNavigate();
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const uniqueShows = shows.filter(
    (value, index, self) => index === self.findIndex((v) => v.id === value.id)
  );
  return (
    <div>
      <TvShowFilter
        shows={shows}
        setShows={setShows}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <GalleryWrapper>
        {uniqueShows.map((show) => {
          if (!show.poster_path || !show.original_name) return null;
          if (shows.includes(show.id)) {
            return null;
          }
          return (
            <div key={show.id}>
              <img
                src={`https://image.tmdb.org/t/p/w185${show.poster_path}`}
                alt={show.original_name}
              />
              <ShowItemTitle>{show.original_name}</ShowItemTitle>
            </div>
          );
        })}
      </GalleryWrapper>
      <button
        type="button"
        onClick={() => {
          setCurrentPage((prevState) => prevState + 1);
        }}
      >
        Load more
      </button>
    </div>
  );
};

export default TvShowsCollection;

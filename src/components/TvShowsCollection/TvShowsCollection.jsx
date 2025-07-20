import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import { GalleryWrapper, ShowItemTitle } from "./TvShowsCollection.styled";

const TvShowsCollection = () => {
  const navigate = useNavigate();
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  function buildDiscoverUrl(selectedGenres = [], options = {}) {
    const baseUrl = "https://api.themoviedb.org/3/discover/tv";

    const params = new URLSearchParams({
      language: options.language || "en-US",
      sort_by: options.sortBy || "popularity.desc",
      page: options.page?.toString() || "1",
      include_adult: options.adults || true,
      include_null_first_air_dates: options.firstAir || false,
    });

    // if (selectedGenres.length > 0) {
    //   params.append("with_genres", selectedGenres.join(","));
    // }

    if (options.year) {
      params.append("primary_release_year", options.year.toString());
    }

    if (options.minRating) {
      params.append("vote_average.gte", options.minRating.toString());
    }

    return `${baseUrl}?${params.toString()}`;
  }

  useEffect(() => {
    const fetchShows = () => {
      setIsLoading(true);
      axios
        .get(buildDiscoverUrl(), {
          headers: {
            Authorization: import.meta.env.VITE_API_KEY,
            accept: "application/json",
          },
        })
        .then((response) => {
          setShows((prevState) => {
            if (currentPage === 1) {
              return response.data.results;
            } else {
              return [...prevState, ...response.data.results];
            }
          });
        })
        .catch((error) => {
          navigate("/error", { state: { error: error.message } });
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchShows();
  }, [currentPage]);

  return (
    <div>
      <GalleryWrapper>
        {shows.map((show) => {
          if (!show.poster_path || !show.original_name) return null;
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

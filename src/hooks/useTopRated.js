import { useState, useEffect } from "react";
import axios from "axios";

export function useTopRated() {
  const [topRatedMovies, setTopRated] = useState([]);
  const [topRatedLoading, setTopRatedLoading] = useState(false);
  const [topRatedError, setTopRatedError] = useState(null);

  useEffect(() => {
    const fetchTopRated = async () => {
      setTopRatedLoading(true);
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
          {
            headers: {
              Authorization: import.meta.env.VITE_API_KEY,
              accept: "application/json",
            },
          }
        );
        setTopRated(response.data.results);
      } catch (err) {
        setTopRatedError(err.message);
      } finally {
        setTopRatedLoading(false);
      }
    };

    fetchTopRated();
  }, []);

  return { topRatedMovies, topRatedLoading, topRatedError };
}

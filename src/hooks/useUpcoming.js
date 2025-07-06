import { useState, useEffect } from "react";
import axios from "axios";

export function useUpcoming() {
  const [upcomingMovies, setUpcoming] = useState([]);
  const [upcomingLoading, setUpcomingLoading] = useState(false);
  const [upcomingError, setUpcomingError] = useState(null);

  useEffect(() => {
    const fetchUpcoming = async () => {
      setUpcomingLoading(true);
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
          {
            headers: {
              Authorization: import.meta.env.VITE_API_KEY,
              accept: "application/json",
            },
          }
        );
        setUpcoming(response.data.results);
      } catch (err) {
        setUpcomingError(err.message);
      } finally {
        setUpcomingLoading(false);
      }
    };

    fetchUpcoming();
  }, []);

  return { upcomingMovies, upcomingLoading, upcomingError };
}

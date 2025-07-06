import { useState, useEffect } from "react";
import axios from "axios";

export function useNowPlaying() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [nowPlayingLoading, setNowPlayingLoading] = useState(false);
  const [nowPlayingError, setNowPlayingError] = useState(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      setNowPlayingLoading(true);
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
          {
            headers: {
              Authorization: import.meta.env.VITE_API_KEY,
              accept: "application/json",
            },
          }
        );
        setNowPlayingMovies(response.data.results);
      } catch (err) {
        setNowPlayingError(err.message);
      } finally {
        setNowPlayingLoading(false);
      }
    };

    fetchNowPlaying();
  }, []);

  return { nowPlayingMovies, nowPlayingLoading, nowPlayingError };
}

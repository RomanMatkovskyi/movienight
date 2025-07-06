import { useDispatch } from "react-redux";
import { fetchGenres } from "../redux/films/operations";
import { useEffect } from "react";

import HomePageMovies from "../components/HomePageMovies/HomePageMovies";
import TopRatedMovies from "../components/TopRatedMovies/TopRatedMovies";
import UpcomingMovies from "../components/UpcomingMovies/UpcomingMovies";
import CategoryComponent from "../components/CategoryComponent/CategoryComponent";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);
  return (
    <div>
      <HomePageMovies />
      <TopRatedMovies />
      <UpcomingMovies />
      <CategoryComponent />
    </div>
  );
};

export default HomePage;

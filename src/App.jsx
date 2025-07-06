import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchFilms } from "./redux/films/operations";
import HomePageMovies from "./components/HomePageMovies/HomePageMovies";

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.films);

  useEffect(() => {
    dispatch(fetchFilms());
  }, [dispatch]);

  return (
    <div className="container">
      <HomePageMovies />
    </div>
  );
}

export default App;

import { useSelector } from "react-redux";

const CategoryComponent = () => {
  const genres = useSelector((state) => state.films.genres);
  console.log("genres", genres);

  return (
    <div>
      <h2>Category component</h2>
      <ul>
        {Array.isArray(genres) &&
          genres.length > 0 &&
          genres.map((genre) => {
            return (
              <li key={genre.id}>
                <p>{genre.name}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default CategoryComponent;

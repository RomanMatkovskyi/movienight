import "./App.css";
import { useSelector } from "react-redux";

function App() {
  const data = useSelector((state) => state.films);
  console.log("Redux_data", data);

  return <>Movie_Nigth</>;
}

export default App;

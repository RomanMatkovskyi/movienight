import { Outlet } from "react-router";
import NavBar from "../components/NavBar/NavBar";
const SharedLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default SharedLayout;

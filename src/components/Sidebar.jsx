import Navbar from "./Navbar";
import Main from "./task/Main";
import { Outlet } from "react-router-dom";
const Sidebar = () => {
  return (
    <>
      <div className="sidebar-container">
        <Navbar />
        <Main />
        <Outlet/>
      </div>
    </>
  );
};

export default Sidebar;

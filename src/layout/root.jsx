import Navbar from "./navbar";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <Navbar />
      <Footer />
      <Outlet />
    </>
  );
}

export default Root;

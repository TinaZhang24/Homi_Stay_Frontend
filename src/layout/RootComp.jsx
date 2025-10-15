import Navbar from "./NavbarComp";
import Footer from "./FooterComp";
import { Outlet } from "react-router-dom";

function RootComp() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default RootComp;

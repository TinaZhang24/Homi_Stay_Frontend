import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";
// import AuthForm from "../features/auth/AuthForm";

const App = () => {
  //   const [token, setToken] = useState(null);

  return (
    <>
      <div>
        <Navbar />
        <Footer />
      </div>
    </>
  );
};

export default App;

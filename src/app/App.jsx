import { useState } from "react";
import { useSelector } from "react-redux";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "../layout/navbar";
import Footer from "../layout/footer";
import RoomList from "../features/rooms/RoomList";
// import AuthForm from "../features/auth/AuthForm";

const App = () => {
  //   const [token, setToken] = useState(null);

  return (
    <>
      <Provider store={store}>
        <Navbar />
        <RoomList />
        <Footer />
      </Provider>
    </>
  );
};

export default App;

import { useState } from "react";
import { useSelector } from "react-redux";
// import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { RouterProvider } from "react-router-dom";
import router from "../router";
import AuthForm from "../features/auth/AuthForm";

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
};

export default App;

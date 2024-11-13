import { useState } from "react";
// import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { RouterProvider } from "react-router-dom";
import router from "../router";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
};

export default App;

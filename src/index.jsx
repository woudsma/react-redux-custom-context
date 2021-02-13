import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import store from "./redux/globalStore";

import App from "./components/App";

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import 'mdb-react-ui-kit/dist/css/mdb.min.css'
//import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import "./constant/constant.css";
import "./pages/pages.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

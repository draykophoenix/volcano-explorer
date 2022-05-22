import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import "./constant/constant.css";
import "./pages/pages.css";

export const API_URL = `http://sefdb02.qut.edu.au:3001`;

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

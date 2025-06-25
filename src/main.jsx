import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ResetStyle } from "./styles/ResetStyle.js";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ResetStyle />
    <App />
  </React.StrictMode>
);

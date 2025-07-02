import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ResetStyle } from "./styles/ResetStyle.js";
import "./i18n";
import { AuthProvider } from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ResetStyle />
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

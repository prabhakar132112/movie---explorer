import "./styles/animations.css";
import "./styles/tokens.css";
import "./styles/globals.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { MovieProvider } from "./context/MovieContext";
import { ThemeProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <MovieProvider><App /></MovieProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);

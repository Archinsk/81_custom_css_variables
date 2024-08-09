import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import "./default-styles.scss";
import "./neumorphism-theme.scss";
import "./glassmorphism-theme.scss";
import "./claymorphism-theme.scss";
import "./retrofuturism-theme.scss";
import "./hitech-theme.scss";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

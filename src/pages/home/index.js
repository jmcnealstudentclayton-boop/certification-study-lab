import { StrictMode, createElement } from "react";
import { createRoot } from "react-dom/client";
import App from "../../app/App.jsx";
import "../../styles/index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("The home page requires a root element.");
}

createRoot(rootElement).render(
  createElement(StrictMode, null, createElement(App)),
);

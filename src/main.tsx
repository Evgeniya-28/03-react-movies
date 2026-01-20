import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App/App";
import "modern-normalize/modern-normalize.css";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>,
);

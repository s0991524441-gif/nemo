/** Design reminder: "مدار سماوي" — a calm, high-trust Arabic SaaS experience using white space, ink black, and cyan progress signals. */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { Providers } from "./providers.tsx";

const root = document.querySelector("#root");

root &&
  createRoot(root).render(
    <React.StrictMode>
      <Providers />
    </React.StrictMode>
  );

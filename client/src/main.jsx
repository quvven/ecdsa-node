import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import StoreProvider from "./store";
import { BrowserRouter } from "react-router-dom";

const Root = ReactDOM.createRoot(document.getElementById("root"))

Root.render(
  <React.StrictMode>
        <StoreProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StoreProvider>
  </React.StrictMode>
);
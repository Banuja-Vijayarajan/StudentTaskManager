import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { SnackbarProvider } from "notistack";

import { ThemeContextProvider } from "./context/ThemeContext";

import App from "./App";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>

    <ThemeContextProvider>

      <SnackbarProvider

        maxSnack={3}

        autoHideDuration={2500}

        anchorOrigin={{

          vertical: "top",

          horizontal: "right"

        }}

      >

        <BrowserRouter>

          <App />

        </BrowserRouter>

      </SnackbarProvider>

    </ThemeContextProvider>

  </React.StrictMode>

);
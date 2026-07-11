import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { SnackbarProvider } from "notistack";

import theme from "./theme";
import App from "./App";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>

    <ThemeProvider theme={theme}>

      <CssBaseline />

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

    </ThemeProvider>

  </React.StrictMode>

);
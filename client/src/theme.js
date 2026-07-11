import { createTheme } from "@mui/material/styles";

const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,

      primary: {
        main: "#6C63FF",
      },

      secondary: {
        main: "#FF6584",
      },

      background:
        mode === "light"
          ? {
              default: "#F5F7FB",
              paper: "#FFFFFF",
            }
          : {
              default: "#121212",
              paper: "#1E1E1E",
            },
    },

    typography: {
      fontFamily: "'Poppins', sans-serif",

      h4: {
        fontWeight: 700,
      },

      h5: {
        fontWeight: 600,
      },

      h6: {
        fontWeight: 600,
      },

      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },

    shape: {
      borderRadius: 16,
    },

    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: "10px 20px",
          },
        },
      },
    },
  });

export default getTheme;
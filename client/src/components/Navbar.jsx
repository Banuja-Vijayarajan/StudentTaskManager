import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Box,
  IconButton,
  Tooltip
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useNavigate } from "react-router-dom";

import { logoutUser } from "../services/auth";
import { useThemeContext } from "../context/ThemeContext";

import { auth } from "../firebaseConfig";

function Navbar() {

  const navigate = useNavigate();

  const { mode, toggleTheme } = useThemeContext();

  const currentUser = auth.currentUser;

  async function handleLogout() {

    try {

      await logoutUser();

      navigate("/");

    }

    catch (error) {

      console.error(error);

    }

  }

  return (

    <AppBar

      position="sticky"

      elevation={4}

      sx={{

        background:

          mode==="light"

          ? "#6C63FF"

          : "#1f1f1f"

      }}

    >

      <Toolbar

        sx={{

          display:"flex",

          justifyContent:"space-between"

        }}

      >

        <Typography

          variant="h5"

          fontWeight="bold"

        >

          🚀 TaskFlow Pro

        </Typography>

        <Box

          display="flex"

          alignItems="center"

          gap={2}

        >

          <Tooltip title="Toggle Theme">

            <IconButton

              color="inherit"

              onClick={toggleTheme}

            >

              {

                mode==="light"

                ?

                <DarkModeIcon/>

                :

                <LightModeIcon/>

              }

            </IconButton>

          </Tooltip>

          <Box

            textAlign="right"

          >

            <Typography

              fontWeight="bold"

            >

              {

                currentUser?.email

                ?.split("@")[0]

              }

            </Typography>

            <Typography

              variant="caption"

            >

              {

                currentUser?.email

              }

            </Typography>

          </Box>

          <Avatar>

            {

              currentUser?.email

              ?.charAt(0)

              .toUpperCase()

            }

          </Avatar>

          <Button

            color="inherit"

            startIcon={<LogoutIcon/>}

            onClick={handleLogout}

          >

            Logout

          </Button>

        </Box>

      </Toolbar>

    </AppBar>

  );

}

export default Navbar;
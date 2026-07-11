import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Box
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/auth";
import { auth } from "../firebaseConfig";

function Navbar() {

  const navigate = useNavigate();

  const currentUser = auth.currentUser;

  async function handleLogout() {

    try {

      await logoutUser();

      navigate("/");

    } catch (error) {

      console.error(error);

      alert("Logout failed.");

    }

  }

  return (

    <AppBar
      position="static"
      elevation={3}
      sx={{
        background:"#5B4BDB",
        borderRadius:"0 0 20px 20px"
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

          <Box textAlign="right">

            <Typography
              variant="body2"
              fontWeight="bold"
            >

              {currentUser?.email?.split("@")[0]}

            </Typography>

            <Typography variant="caption">

              {currentUser?.email}

            </Typography>

          </Box>

          <Avatar
            sx={{
              bgcolor:"#FF9800"
            }}
          >

            {currentUser?.email?.charAt(0).toUpperCase()}

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
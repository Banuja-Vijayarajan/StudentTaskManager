import { createTheme } from "@mui/material/styles";

const theme = createTheme({

  palette:{

    primary:{
      main:"#6C63FF"
    },

    secondary:{
      main:"#9C27B0"
    },

    success:{
      main:"#4CAF50"
    },

    warning:{
      main:"#FB8C00"
    },

    error:{
      main:"#E53935"
    },

    background:{
      default:"#F5F7FB",
      paper:"#FFFFFF"
    }

  },

  typography:{

    fontFamily:"Poppins",

    h4:{
      fontWeight:700
    },

    h5:{
      fontWeight:600
    },

    button:{
      textTransform:"none",
      fontWeight:600
    }

  },

  shape:{
    borderRadius:15
  }

});

export default theme;
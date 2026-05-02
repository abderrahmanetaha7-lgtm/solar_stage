import { createTheme } from "@mui/material/styles";
 
  export const getTheme = (mode, language) =>
  createTheme({
    typography: {  
        fontFamily: ["ELMISSIRI"],
        h1: { fontWeight: 700 },
        h5: { fontWeight: 600 },
        button: { textTransform: "none" },
      },
    direction: language === "ar" ? "rtl" : "ltr",

    palette: {
      mode,

      primary: {
        main: "#FFC107",
      },

      secondary: {
        main: "#2ECC71",
      },

      background: {
        default: mode === "dark" ? "#0D1B2A" : "#f5f5f5",
        paper: mode === "dark" ? "#1B263B" : "#ffffff",
      },

      text: {
        primary: mode === "dark" ? "#FFFFFF" : "#111111",
        secondary: "#B0BEC5",
      },

      
    },
  });

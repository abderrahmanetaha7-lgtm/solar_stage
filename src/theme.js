import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#FFC107",
    },

    secondary: {
      main: "#2ECC71",
    },

    background: {
      default: "#0D1B2A",
      paper: "#1B263B",
    },

    text: {
      primary: "#FFFFFF",
      secondary: "#B0BEC5",
    },
  },
});

export default theme;
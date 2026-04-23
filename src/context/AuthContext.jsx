import { createContext, useState, useMemo, useContext } from "react";
import { getTheme } from "../theme";
import { ThemeProvider } from "@mui/material";

const ThemeContext = createContext();

export default function ThemeContextProvider({ children }) {
  const [mode, setMode] = useState("dark");

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => useContext(ThemeContext);
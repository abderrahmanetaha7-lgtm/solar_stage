import { ThemeProvider, CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import { useMemo } from "react";

import { getTheme } from "../theme";
import { useLanguage } from "./LanguageContext";

export default function AppThemeProvider({ children }) {
  const mode = useSelector((state) => state.theme.mode);

  const { lang } = useLanguage();

  const theme = useMemo(() => getTheme(mode, lang), [mode, lang]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
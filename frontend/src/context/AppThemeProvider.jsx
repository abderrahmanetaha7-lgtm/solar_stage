import { ThemeProvider, CssBaseline } from "@mui/material";

import { CacheProvider } from "@emotion/react";

import { useSelector } from "react-redux";

import { useMemo } from "react";

import { getTheme } from "../theme";

import { useLanguage } from "./LanguageContext";
 
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

export default function AppThemeProvider({ children }) {
  const mode = useSelector((state) => state.theme.mode);

  const { lang, isRTL } = useLanguage();

  const theme = useMemo(() => getTheme(mode, lang), [mode, lang]);


  const rtlCache = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const ltrCache = createCache({
  key: "muiltr",
});

  return (
    <CacheProvider value={isRTL ? rtlCache : ltrCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}

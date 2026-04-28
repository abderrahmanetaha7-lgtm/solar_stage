import { createContext, useState, useMemo, useContext, useEffect } from "react";
import { getTheme } from "../theme";
import { ThemeProvider } from "@mui/material";
import i18n from "../i18n";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

const ThemeContext = createContext();

export default function ThemeContextProvider({ children }) {
  const [mode, setMode] = useState("dark");

  const [lang, setLang] = useState(i18n.language);

  useEffect(() => {
    const handleChange = (lng) => setLang(lng);
    i18n.on("languageChanged", handleChange);

    return () => i18n.off("languageChanged", handleChange);
  }, []);

  const isRTL = lang === "ar";

  const theme = useMemo(
    () => getTheme(mode, i18n.language, [mode, i18n.language]),
    [mode, i18n.language],
  );

  const cacheRtl = useMemo(
    () =>
      createCache({
        key: "muirtl",
        stylisPlugins: [prefixer, rtlPlugin],
      }),
    [],
  );

  const cacheLtr = useMemo(
    () =>
      createCache({
        key: "mui",
      }),
    [],
  );

  const toggleTheme = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <CacheProvider value={isRTL ? cacheRtl : cacheLtr}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </CacheProvider>
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => useContext(ThemeContext);

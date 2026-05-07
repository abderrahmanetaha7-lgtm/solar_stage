import { createContext, useContext, useEffect, useState } from "react";
import i18n from "../i18n";

const LanguageContext = createContext();

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem("lang") || i18n.language
  );

  // change language + save
  useEffect(() => {
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
  }, [lang]);

  // sync with i18n external changes
  useEffect(() => {
    const handleChange = (lng) => setLang(lng);

    i18n.on("languageChanged", handleChange);
    return () => i18n.off("languageChanged", handleChange);
  }, []);

  const toggleLang = () => {
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        isRTL: lang === "ar",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

/* ================= HOOK ================= */
// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext);
import { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { translations } from "./translations";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("vyz-lang");
      if (stored === "es" || stored === "en") return stored;
    }
    return "es";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("vyz-lang", lang);
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const toggle = useCallback((next) => {
    setLang(next);
  }, []);

  const t = useMemo(() => translations[lang], [lang]);

  const value = useMemo(() => ({ lang, setLang: toggle, t }), [lang, toggle, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};

// src/context/LanguageContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

type Lang = "bn" | "en";

interface LangContextProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextProps>({
  lang: "en",
  setLang: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
  const userLang = navigator.language; // "en-US", "bn-BD", etc.
  if (userLang.startsWith("bn")) setLang("bn");
  else setLang("en");
}, []);


  useEffect(() => {
    document.body.className = lang === "bn" ? "lang-bn" : "lang-en";
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
};

export const useLanguage = () => useContext(LangContext);

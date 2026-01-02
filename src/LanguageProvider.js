import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import translations from "./translations";

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const savedLanguage = Cookies.get("language") || "en"; // Default: English
  const [language, setLanguage] = useState(savedLanguage);

  const t = (key) => {
    return key.split(".").reduce((obj, k) => (obj && obj[k] ? obj[k] : key), translations[language]);
  };

  const changeLanguage = (lng) => {
    setLanguage(lng);
    Cookies.set("language", lng, { expires: 30 }); // Language saved for 30 days
  };

  // Sync language state if cookies change
  useEffect(() => {
    const cookieLanguage = Cookies.get("language");
    if (cookieLanguage && cookieLanguage !== language) {
      setLanguage(cookieLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

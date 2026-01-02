import React, { createContext, useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const LanguageContext = createContext()

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider = ({ children }) => {
  // Try to get the language from cookies on initial load
  const storedLanguage = Cookies.get('language') || 'en'

  const [language, setLanguage] = useState(storedLanguage)

  useEffect(() => {
    // When the language changes, store it in the cookie
    Cookies.set('language', language, { expires: 365 })
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

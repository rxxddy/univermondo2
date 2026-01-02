import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language, setLanguage } = useLanguage();
  const currentTranslations = translations[language];

  useEffect(() => {
    const cookieConsent = Cookies.get('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('cookieConsent', 'true', { expires: 31 });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <section className="fixed max-w-md p-4 mx-auto bg-white border border-gray-200 left-4 bottom-16 rounded-2xl z-50">
      <h2 className="font-semibold text-gray-800">🍪 {currentTranslations.Cookies1}</h2>
      <p className="mt-4 text-sm text-gray-600">
        {currentTranslations.Cookies2}{' '}
        <a href="#" className="text-blue-500 hover:underline">
          {currentTranslations.Cookies3}
        </a>.
      </p>
      <div className="flex items-center justify-start mt-4 gap-x-4 shrink-0">
        <button onClick={() => window.location.href = '/About'} className="text-xs text-gray-800 underline transition-colors duration-300 hover:text-gray-600 focus:outline-none">
          {currentTranslations.Cookies4}
        </button>
        <button
          onClick={handleAccept}
          className="text-xs bg-gray-900 font-medium rounded-lg hover:bg-gray-700 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none"
        >
          {currentTranslations.Cookies5}
        </button>
      </div>
    </section>
  );
};

export default CookieConsent;
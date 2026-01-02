import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const UserAgreement = () => {
  const [activeSection, setActiveSection] = useState('userAgreement');
  const { language } = useLanguage()
  const currentTranslations = translations[language]

  const renderContent = () => {
    switch (activeSection) {
      case 'userAgreement':
        return (
          <p className="text-base md:text-lg leading-relaxed text-justify">
            {currentTranslations.Info5}
          </p>
        );
      case 'privacyPolicy':
        return (
          <p className="text-base md:text-lg leading-relaxed text-justify">
            {currentTranslations.Info6}
          </p>
        );
      case 'cookiesPolicy':
        return (
          <p className="text-base md:text-lg leading-relaxed text-justify">
            {currentTranslations.Info7}
          </p>
        );
      case 'termsAndConditions':
        return (
          <p className="text-base md:text-lg leading-relaxed text-justify">
            {currentTranslations.Info8}
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 pt-[3em] md:pt-[0em]">
      <div className="max-w-screen-xl w-full px-4 py-16">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
          <button
            onClick={() => setActiveSection('userAgreement')}
            className={`px-4 py-2 rounded ${activeSection === 'userAgreement' ? 'bg-[#1C3D33] text-white' : 'bg-gray-200 text-black'} transition w-full md:w-auto`}
          >
            {currentTranslations.Info1}
          </button>
          <button
            onClick={() => setActiveSection('privacyPolicy')}
            className={`px-4 py-2 rounded ${activeSection === 'privacyPolicy' ? 'bg-[#1C3D33] text-white' : 'bg-gray-200 text-black'} transition w-full md:w-auto`}
          >
            {currentTranslations.Info2}
          </button>
          <button
            onClick={() => setActiveSection('cookiesPolicy')}
            className={`px-4 py-2 rounded ${activeSection === 'cookiesPolicy' ? 'bg-[#1C3D33] text-white' : 'bg-gray-200 text-black'} transition w-full md:w-auto`}
          >
            {currentTranslations.Info3}
          </button>
          <button
            onClick={() => setActiveSection('termsAndConditions')}
            className={`px-4 py-2 rounded ${activeSection === 'termsAndConditions' ? 'bg-[#1C3D33] text-white' : 'bg-gray-200 text-black'} transition w-full md:w-auto`}
          >
            {currentTranslations.Info4}
          </button>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          {activeSection === 'userAgreement' && 'User Agreement'}
          {activeSection === 'privacyPolicy' && 'Privacy Policy'}
          {activeSection === 'cookiesPolicy' && 'Cookies Policy'}
          {activeSection === 'termsAndConditions' && 'Terms and Conditions'}
        </h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default UserAgreement;
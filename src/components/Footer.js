import React from 'react';
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-black text-white py-28 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight">UniverMondo</h2>
          <p className="text-sm text-gray-400 max-w-md">{t.Footer2[0]}</p>
          <div className="flex gap-4 mt-6">
            <a
              href="https://www.instagram.com/univermondo/profilecard/?igsh=c3JlNGdyb2J5b2Jo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#A8D9BB] transition"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://t.me/univermondo_eu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#A8D9BB] transition"
            >
              <FaTelegramPlane size={24} />
            </a>
            <a
              href="https://wa.me/393513554047"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#A8D9BB] transition"
            >
              <FaWhatsapp size={24} />
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">{t.Footer3[0]}</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>univermondo@gmail.com</li>
            <li>{t.Footer5[0]}</li>
            <li>{t.Footer6[0]}</li>
            <li>{t.Footer8[0]}</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">{t.Footer9[0]}</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="/Admission" className="hover:text-white">
                {t.Footer11[0]}
              </a>
            </li>
            <li>
              <a href="/Contacts" className="hover:text-white">
                {t.Footer12[0]}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center text-base font-semibold text-white">
        {t.Footer7[0]}
      </div>

      <div className="mt-6 border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
        {t.Footer15[0].replace('{year}', new Date().getFullYear())}
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import Footer from '../components/Footer';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

export default function Visa() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="bg-white text-gray-800 min-h-screen pt-24 flex flex-col">
      {/* Hero */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <button
            onClick={() => window.history.back()}
            className="absolute left-6 top-6 text-gray-600 hover:text-black flex items-center gap-2 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            <span>{t.Back}</span>
          </button>

          <h1 className="text-4xl md:text-6xl font-extrabold text-[#12372A] leading-tight mb-8">
            {t.Visa1}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {t.Visa2}
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-[#12372A] mb-4">
              {t.Visa3}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t.Visa4}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[1, 2, 3].map((n, i) => (
              <div
                key={n}
                className="bg-white rounded-3xl p-10 border border-gray-200 shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="w-14 h-14 flex items-center justify-center bg-[#12372A] text-white text-xl font-bold rounded-full mb-6">
                  {n}
                </div>
                <h3 className="text-xl font-semibold text-[#12372A] mb-4">
                  {t[`Visa${5 + i * 2}`]}
                </h3>
                <p className="text-gray-600 text-base">
                  {t[`Visa${6 + i * 2}`]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#12372A] text-white text-center py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
            {t.Visa11}
          </h2>
          <p className="text-lg md:text-xl mb-10">{t.Visa12}</p>
          <a
            href="/Contacts"
            className="inline-block bg-white text-[#12372A] px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition"
          >
            {t.Visa13}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import React from 'react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const { language } = useLanguage();
  const t = translations[language];

  const faqData = Object.keys(t)
    .filter((key) => key.startsWith('faq'))
    .map((key) => t[key]);

  const [openIndex, setOpenIndex] = React.useState(0);

  return (
    <section className="bg-white py-24 px-6 border-t border-gray-200">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#12372A] font-serif tracking-tight mb-14">
          {t.que2}
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`rounded-xl overflow-hidden transition-all duration-300 border-2 relative shadow-md ${openIndex === index ? 'border-[#12372A] bg-white' : 'border-gray-200 bg-gray-50'}`}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left text-[#12372A] font-semibold text-lg hover:bg-[#f2f2f2] transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <span>{item.question.join(' ')}</span>
                <span className="ml-4">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </span>
              </button>
              <div
                className={`px-6 pb-6 pt-1 text-gray-800 text-base leading-relaxed whitespace-pre-line transition-all duration-300 ease-in-out ${openIndex === index ? 'block' : 'hidden'}`}
              >
                {item.answer.join('\n')}
              </div>
              <div className={`absolute top-0 left-0 w-1.5 h-full bg-[#12372A] transition-opacity duration-300 ${openIndex === index ? 'opacity-100' : 'opacity-0'}`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
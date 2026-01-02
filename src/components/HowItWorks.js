import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import {
  Pencil,
  PhoneCall,
  GraduationCap,
  FileText,
  Rocket,
} from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

export default function HowItWorks() {
  const { language } = useLanguage();
  const currentTranslations = translations[language];
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const handleScroll = () => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      setScrollProgress((container.scrollLeft / maxScrollLeft) * 100);
    };

    if (container) container.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    {
      icon: <Pencil size={28} />,
      title: currentTranslations.HowItWorks2,
      description: currentTranslations.HowItWorks3,
    },
    {
      icon: <PhoneCall size={28} />,
      title: currentTranslations.HowItWorks4,
      description: currentTranslations.HowItWorks5,
    },
    {
      icon: <GraduationCap size={28} />,
      title: currentTranslations.HowItWorks6,
      description: currentTranslations.HowItWorks7,
    },
    {
      icon: <FileText size={28} />,
      title: currentTranslations.HowItWorks8,
      description: currentTranslations.HowItWorks9,
    },
    {
      icon: <Rocket size={28} />,
      title: currentTranslations.HowItWorks10,
      description: currentTranslations.HowItWorks11,
    },
  ];

  return (
    <section className="bg-white py-24 px-4 border-t border-black/10">
      <div className="max-w-screen-xl mx-auto text-center">
        <div className="mb-16">
          <div className="w-12 h-[3px] bg-[#12372A] mx-auto mb-4" />
          <h2 className="text-4xl font-black text-black tracking-[0.15em] uppercase font-mono">
            {currentTranslations.HowItWorks1}
          </h2>
        </div>

        <div
          ref={containerRef}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth px-2 pb-4 -mx-4 sm:mx-0"
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="snap-center min-w-[90vw] sm:min-w-[70vw] md:min-w-0 bg-white border-[2px] border-black p-6 rounded-2xl text-left flex flex-col gap-4 shadow-[4px_4px_0_#12372A] hover:shadow-[6px_6px_0_#12372A] transition-all duration-200"
            >
              <div className="bg-[#12372A] text-white p-3 w-fit rounded-md border border-black shadow-inner">
                {step.icon}
              </div>

              <div className="text-gray-300 text-5xl font-black absolute top-4 right-6 opacity-10 pointer-events-none select-none hidden md:block">
                0{index + 1}
              </div>

              <h3 className="text-xl font-bold text-black uppercase tracking-wide font-mono">
                {step.title}
              </h3>
              <p className="text-sm text-gray-700 font-mono leading-snug">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 w-full md:hidden relative h-[3px] bg-gray-200 overflow-hidden rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-[#12372A] transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </section>
  );
}

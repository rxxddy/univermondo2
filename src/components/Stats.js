import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const formatNumber = (number) => {
  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M+`;
  }
  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}k+`;
  }
  return number;
};

const AnimatedNumber = ({ targetNumber, duration = 1000 }) => {
  const [number, setNumber] = useState(0);
  const [isInView, setIsInView] = useState(false); // Track if the number is in view
  const ref = useRef(null);

  useEffect(() => {
    // Set up the IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current); // Clean up observer
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return; // Don't start the animation until it's in view

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < duration) {
        setNumber(Math.floor(Math.random() * targetNumber));
      } else {
        setNumber(targetNumber);
        clearInterval(interval);
      }
    }, 50); // Update every 50ms
  }, [targetNumber, duration, isInView]);

  return (
    <span ref={ref}>{formatNumber(number)}</span>
  );
};


export default function Stats() {
  const { language, setLanguage } = useLanguage()
  const currentTranslations = translations[language]

  return (
    <div className="bg-white py-24 sm:py-32 border-t-2 border-grey-500">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          
            <div  className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base/7 text-gray-600">{currentTranslations.Stats1}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                <AnimatedNumber targetNumber={5} /><a>+</a>
              </dd>
            </div>

            <div  className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base/7 text-gray-600">{currentTranslations.Stats2}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                <AnimatedNumber targetNumber={430} /><a>+</a>
              </dd>
            </div>
          
            <div  className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base/7 text-gray-600">{currentTranslations.Stats3}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                <AnimatedNumber targetNumber={50} /><a>+</a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
  )
}

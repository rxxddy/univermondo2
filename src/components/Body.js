
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import InfiniteLooper from "./InfiniteLooper";
import Pricing from "./Pricing";
import Services from "./Services";
import Stats from "./Stats";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import Reviews from "./Reviews";
import Footer from "./Footer";
import FAQ from "./FAQ";

export default function Body() {
    const universities = [
      `${process.env.PUBLIC_URL}/images/uniLogos/uniMilano.png`,
      `${process.env.PUBLIC_URL}/images/uniLogos/uniFlorence.png`,
      `${process.env.PUBLIC_URL}/images/uniLogos/uniPavia.png`,
      `${process.env.PUBLIC_URL}/images/uniLogos/uniBologna.png`,
      `${process.env.PUBLIC_URL}/images/uniLogos/uniBocconi.png`,
      `${process.env.PUBLIC_URL}/images/uniLogos/uniCatania.png`,
      `${process.env.PUBLIC_URL}/images/uniLogos/uniFlorence.png`,
      `${process.env.PUBLIC_URL}/images/uniLogos/uniPadua.png`,
      `${process.env.PUBLIC_URL}/images/uniLogos/uniPerugia.png`,
      `${process.env.PUBLIC_URL}/images/uniLogos/uniPisa.png`,
      `${process.env.PUBLIC_URL}/images/uniLogos/uniSapienza.png`,
      `${process.env.PUBLIC_URL}/images/uniLogos/uniTurin.png`,
      `${process.env.PUBLIC_URL}/images/uniLogos/uniVenice.png`,
      `${process.env.PUBLIC_URL}/images/uniLogos/uniELLCI.png`,
    ];
  
    const { language, setLanguage } = useLanguage()

    const currentTranslations = translations[language]

    const location = useLocation();
    const reviewsRef = useRef(null);
  
    useEffect(() => {
      const scrollToReviews = () => {
        if (reviewsRef.current) {
          reviewsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      };
  
      // Checks if the location hash matches the reviews ID
      if (location.hash === '#reviews-section') {
        // Waits until the Reviews component is fully loaded
        if (reviewsRef.current) {
          scrollToReviews();
        } else {
          // Polls until the ref becomes available
          const intervalId = setInterval(() => {
            if (reviewsRef.current) {
              scrollToReviews();
              clearInterval(intervalId); // Stops checking once the element found
            }
          }, 100);
        }
      }
    }, [location]);

    const faqRef = useRef(null);
  
    useEffect(() => {
      const scrollToReviews = () => {
        if (faqRef.current) {
          faqRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      };
  
      // Checks if the location hash matches the reviews ID
      if (location.hash === '#faq-section') {
        // Waits until the Reviews component is fully loaded
        if (faqRef.current) {
          scrollToReviews();
        } else {
          // Polls until the ref becomes available
          const intervalId = setInterval(() => {
            if (faqRef.current) {
              scrollToReviews();
              clearInterval(intervalId); // Stops checking once the element found
            }
          }, 100);
        }
      }
    }, [location]);

    const spinnerRef = useRef(null);
  
    useEffect(() => {
      const scrollToSectionById = (sectionId) => {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offset = -100;
          const offsetPosition = window.scrollY + elementPosition + offset;
  
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      };
  
      if (location.hash === '#spinner-section') {
        scrollToSectionById('spinner-section');
      }
    }, [location]);
    
  
    return (
        <div className="">
        <HeroSection />
        <div className="w-full h-[60em] bg-white">
        <div className="relative isolate bg-white">
            <div className="relative bg-white">
              <Services />
            </div>
          </div>
          <div className="" >
            <div className="mt-[4em] pb-20" >
              <InfiniteLooper speed={50} direction="left" >
                {universities.map((src, index) => (
                  <div key={index} className="imageWrapper" ref={spinnerRef} id="spinner-section">
                    <img src={src} alt={`University ${index}`} className="universityImage" />
                  </div>
                ))}
              </InfiniteLooper>
            </div>
            <HowItWorks />
            <div className="relative bg-gradient-to-r from-[#1A302B] via-[#213E36] to-[#1C3D33] px-8 py-16 lg:py-24 lg:px-20 text-white shadow-xl">
              <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="lg:max-w-lg text-center lg:text-left">
                  <h2 className="text-4xl font-extrabold leading-tight text-[#E8DCC8] sm:text-5xl">
                    {currentTranslations.Body1}
                  </h2>
                  <p className="mt-6 text-lg text-gray-300">
                    {currentTranslations.Body2}
                  </p>
                </div>

                <div className="relative w-full lg:w-1/2">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/florence.png`}
                    alt="University campuses"
                    className="w-full rounded-xl shadow-lg object-cover"
                  />
                </div>
              </div>

              <div className="mt-12 text-center">
                <button
                  onClick={() => (window.location.href = '/Unis')}
                  className="bg-[#E8DCC8] text-[#1C3D33] text-lg font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-[#D6C8AC] hover:shadow-lg transition"
                >
                  {currentTranslations.Body3}
                </button>
              </div>
            </div>
            <Pricing textColor="text-black"/>
            <Stats />
            <div className='w-full' ref={faqRef} id="faq-section" >
            <FAQ />
            </div>
            <div className='w-full cursor-pointer' ref={reviewsRef} id="reviews-section" >
              <Reviews/>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    )
}
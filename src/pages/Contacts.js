import React, { useRef, useState, useEffect } from 'react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { FaWhatsapp, FaTelegram } from 'react-icons/fa';
import Footer from '../components/Footer';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import { useLocation } from 'react-router-dom';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { DEFAULT_CURRENCY } from '../constants/payments';

const Contacts = () => {
  const { language } = useLanguage();
  const currentTranslations = translations[language];

  const contactRef = useRef(null);
  const formRef = useRef(null);
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: '',
    message: '',
    additionalMessage: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getUTM = () => {
    const params = new URLSearchParams(window.location.search);
    const pick = (k) => params.get(k) || null;
    return {
      source: pick('utm_source'),
      medium: pick('utm_medium'),
      campaign: pick('utm_campaign'),
      term: pick('utm_term'),
      content: pick('utm_content'),
    };
  };

  useEffect(() => {
    const scrollToContact = () => {
      if (contactRef.current) {
        const top = contactRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top - 50, behavior: 'smooth' });
      }
    };
    if (location.hash === '#contacts-section') {
      if (contactRef.current) scrollToContact();
      else {
        const id = setInterval(() => {
          if (contactRef.current) {
            scrollToContact();
            clearInterval(id);
          }
        }, 100);
      }
    }
  }, [location]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() &&
      !formData.message.trim() &&
      !formData.additionalMessage.trim()
    ) {
      alert('Пожалуйста, заполните хотя бы одно поле.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'contactRequests'), {
        // User data
        name: formData.name?.trim() || null,
        message: formData.message?.trim() || null,
        additionalMessage: formData.additionalMessage?.trim() || null,

        // System data
        language,
        page: window.location.href,
        referrer: document.referrer || null,
        utm: getUTM(),
        userAgent: navigator.userAgent,
        createdAt: serverTimestamp(),

        // Default fields for processing
        status: 'new', // Status
        engaged: false, // Not in process by default
        package: {
          key: null,
        }, // No package selected
        payment: {
          amount: null,
          currency: DEFAULT_CURRENCY, // 'EUR'
          status: 'unpaid',
          updatedAt: serverTimestamp(),
        },
      });

      setFormSubmitted(true);
      setFormData({ name: '', message: '', additionalMessage: '' });
    } catch (err) {
      console.error('Firestore write error:', err);
      alert('Error submitting the form. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReturnToForm = () => setFormSubmitted(false);

  return (
    <div className="pt-[8em] md:pt-[10em] bg-white">
      <div className="max-w-7xl mx-auto pb-6">
        <div className="relative w-full md:max-w-screen-xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-gray-800 hover:text-gray-600 font-medium transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              <span>{currentTranslations.Back}</span>
            </button>
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden shadow-lg m-4 sm:m-0">
          <img
            src={`${process.env.PUBLIC_URL}/images/florence.png`}
            alt="Contact Us"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <h1 className="text-5xl font-bold text-white tracking-wide">
              {currentTranslations.Contacts1}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16" ref={contactRef} id="contacts-section">
          {/* Form */}
          <div className="bg-white p-10 rounded-lg shadow-md min-h-[600px] flex items-center justify-center">
            {formSubmitted ? (
              <div className="text-center w-full">
                <p className="text-2xl font-bold text-[#1C3D33] mb-4">
                  {currentTranslations.Contacts8}
                </p>
                <button
                  onClick={handleReturnToForm}
                  className="mt-4 bg-[#1C3D33] text-[#E8DCC8] py-2 px-6 rounded-lg hover:bg-[#E8DCC8] hover:text-[#1C3D33] transition font-bold"
                >
                  {currentTranslations.Contacts9}
                </button>
              </div>
            ) : (
              <div className="w-full">
                <h2 className="text-4xl font-bold text-[#1C3D33] mb-8">
                  {currentTranslations.Contacts10}
                </h2>

                <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-8">
                  <div>
                    <label htmlFor="name" className="block text-lg text-[#1C3D33] mb-2">
                      {currentTranslations.Contacts11}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder={currentTranslations.Circle4}
                      className="w-full p-4 border border-[#E8DCC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C3D33]"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-lg text-[#1C3D33] mb-2">
                      {currentTranslations.Contacts12[0]}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="1"
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder={currentTranslations.Contacts12[1]}
                      className="w-full p-4 border border-[#E8DCC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C3D33]"
                    />
                  </div>

                  <div>
                    <label htmlFor="additionalMessage" className="block text-lg text-[#1C3D33] mb-2">
                      {currentTranslations.Contacts16}
                    </label>
                    <textarea
                      id="additionalMessage"
                      name="additionalMessage"
                      rows="6"
                      value={formData.additionalMessage}
                      onChange={handleFormChange}
                      placeholder={currentTranslations.Contacts12[2]}
                      className="w-full p-4 border border-[#E8DCC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C3D33]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#1C3D33] text-[#E8DCC8] py-4 rounded-lg hover:bg-[#E8DCC8] hover:text-[#1C3D33] transition font-bold disabled:opacity-70"
                  >
                    {isSubmitting ? currentTranslations.Contacts14 : currentTranslations.Contacts15}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Contacts/Social */}
          <div className="bg-white p-10 rounded-lg shadow-md">
            <h2 className="text-4xl font-bold text-[#1C3D33] mb-8">
              {currentTranslations.Contacts2}
            </h2>

            {/* Social Buttons */}
            <div className="flex my-6 space-x-6">
              <a
                href="https://wa.me/393513554047"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] text-4xl hover:scale-110 transition transform"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://t.me/univermondo_eu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0088cc] text-4xl hover:scale-110 transition transform"
              >
                <FaTelegram />
              </a>
            </div>

            {/* Contacts from footer */}
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-3xl text-[#1C3D33]" />
                <p className="text-lg text-[#1C3D33]">
                  {currentTranslations.Footer3?.[0] || 'Email'}:{' '}
                  <a
                    href="mailto:univermondo@gmail.com"
                    className="underline hover:text-[#1C3D33]"
                  >
                    univermondo@gmail.com
                  </a>
                </p>
              </div>

              {/* Phone */}
              {[currentTranslations.Footer5?.[0], currentTranslations.Footer6?.[0], currentTranslations.Footer8?.[0]]
                .filter(Boolean)
                .map((phone, idx) => (
                  <div key={idx} className="flex items-center space-x-4">
                    <FaPhoneAlt className="text-3xl text-[#1C3D33]" />
                    <a
                      href={`tel:${String(phone).replace(/[^\d+]/g, '')}`}
                      className="text-lg text-[#1C3D33] underline decoration-transparent hover:decoration-inherit"
                    >
                      {phone}
                    </a>
                  </div>
                ))}

              {/* Address */}
              <div className="mt-8">
                <div className="text-center text-base font-semibold text-[#1C3D33] bg-[#E8DCC8]/40 rounded-lg py-4 px-6 border border-[#E8DCC8]">
                  {currentTranslations.Footer7?.[0]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contacts;

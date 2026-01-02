import React, { useState, useEffect } from 'react';
import { FaComments } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { DEFAULT_CURRENCY } from '../constants/payments';

const FloatingCircle = () => {
  const { language } = useLanguage();
  const currentTranslations = translations[language];

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
  });

  const getUTM = () => {
    const p = new URLSearchParams(window.location.search);
    const map = {
      utm_source: 'source',
      utm_medium: 'medium',
      utm_campaign: 'campaign',
      utm_term: 'term',
      utm_content: 'content',
    };
    const utm = {};
    Object.entries(map).forEach(([k, alias]) => {
      const v = p.get(k);
      if (v) utm[alias] = v;
    });
    return Object.keys(utm).length ? utm : null;
  };

  const toggleForm = () => {
    if (!isFormOpen) {
      setHasSubmitted(false);
      setFormData({ name: '', contact: '' });
    }
    setIsFormOpen(!isFormOpen);
  };

  const closeForm = () => setIsFormOpen(false);

  const handleClickOutside = (event) => {
    if (
      isFormOpen &&
      !event.target.closest('.form-container') &&
      !event.target.closest('.floating-circle')
    ) {
      closeForm();
    }
  };

  useEffect(() => {
    if (isFormOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFormOpen]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() && !formData.contact.trim()) {
      alert('Fill at least one field before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'quickRequests'), {
        name: formData.name?.trim() || null,
        contact: formData.contact?.trim() || null,
        language,
        page: window.location.href,
        referrer: document.referrer || null,
        utm: getUTM(),
        userAgent: navigator.userAgent,
        createdAt: serverTimestamp(),
        status: 'new',
        engaged: false,
        source: 'floating-circle',
        package: {
          key: null,
        },
        payment: {
          amount: null,
          currency: DEFAULT_CURRENCY, // 'EUR'
          status: 'unpaid',
          updatedAt: serverTimestamp(),
        },
      });

      setHasSubmitted(true);
      setFormData({ name: '', contact: '' });
    } catch (err) {
      console.error('FloatingCircle write error:', err.code, err.message, err);
      alert('An error occurred while submitting the form. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div
        onClick={toggleForm}
        className="floating-circle fixed bottom-4 right-4 w-16 h-16 bg-white rounded-full shadow-lg z-[9999] flex items-center justify-center animate-pulse-custom cursor-pointer"
      >
        <FaComments className="text-[#1C3D33] text-3xl" />
        <div className="absolute inset-0 w-full h-full rounded-full border-4 border-blue-500 opacity-50 animate-wave"></div>
        <div className="absolute inset-0 w-full h-full rounded-full border-4 border-blue-500 opacity-50 animate-wave delay-100"></div>
      </div>

      {isFormOpen && (
        <div className="form-container fixed bottom-20 right-4 w-96 bg-white p-8 rounded-lg shadow-lg z-[9999] min-h-[420px] border-2 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            {hasSubmitted ? (
              <h3 className="text-xl font-semibold text-[#1C3D33] text-center w-full">
                {currentTranslations.Circle1[0]}
              </h3>
            ) : (
              <h3 className="text-xl font-semibold">{currentTranslations.Circle2[0]}</h3>
            )}
            <button onClick={closeForm} className="text-[#1C3D33] text-3xl">
              <IoClose />
            </button>
          </div>

          {!hasSubmitted && (
            <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
              <div className="flex-grow">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="name">
                    {currentTranslations.Circle3[0]}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={onChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={currentTranslations.Circle4[0]}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="contact">
                    {currentTranslations.Circle5[0]}
                  </label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={onChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={currentTranslations.Circle6[0]}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1C3D33] text-white py-3 rounded-lg hover:bg-[#154028] focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 disabled:opacity-70"
              >
                {isSubmitting ? currentTranslations.Circle7[0] : currentTranslations.Circle8[0]}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default FloatingCircle;

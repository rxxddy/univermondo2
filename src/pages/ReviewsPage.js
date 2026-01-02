import React, { useState, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import { FaInstagram } from 'react-icons/fa';
import Footer from '../components/Footer';

const ReviewsPage = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const videoRefs = useRef([]);
  const [expandedReviews, setExpandedReviews] = useState({});

  const handlePlay = (index) => {
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) video.pause();
    });
  };

  const toggleExpand = (index) => {
    setExpandedReviews((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const truncateText = (text, wordLimit) => {
    if (typeof text !== 'string') return { truncated: '', full: '' };
    const words = text.trim().split(/\s+/);
    return words.length > wordLimit
      ? { truncated: words.slice(0, wordLimit).join(' ') + '...', full: text }
      : { truncated: text, full: text };
  };

  return (
    <div className="bg-white min-h-screen pt-28 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10">
        {/* Back */}
        <div className="mb-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-800 hover:text-gray-600 font-medium transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            <span className="truncate">{t.Back}</span>
          </button>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold text-[#12372A] text-center mb-10 sm:mb-20">
          {t.RTitle}
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
          {t.Reviews.map((review, index) => {
            const { truncated, full } = truncateText(review.review, 38);
            const isExpanded = !!expandedReviews[index];

            return (
              <article
                key={index}
                className="
                  rounded-3xl shadow-lg overflow-hidden border border-[#D6DBD2] bg-white
                  flex flex-col w-full
                  max-w-[280px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[340px]
                  text-[13px] sm:text-[14px]
                "
              >
                {/* Top: Video Preview */}
                <div className="w-full aspect-[9/16] rounded-t-3xl overflow-hidden">
                  {review.video ? (
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      onPlay={() => handlePlay(index)}
                      controls
                      preload="metadata"
                      playsInline
                      className="block w-full h-full object-cover"
                      poster={review.preview}
                    >
                      <source src={review.video} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={review.preview || review.image}
                      alt={review.name}
                      className="block w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Bottom: same layout, everything scaled down proportionally */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-[#12372A] shrink-0">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="block w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = '/assets/avatar-placeholder.png'; }}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-gray-900 font-medium">
                        <FaInstagram className="text-[#12372A] shrink-0" />
                        <span className="truncate">{review.Rinsta}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        {review.name}, {review.location}
                      </p>
                    </div>
                  </div>

                  <p className="italic text-gray-700 leading-relaxed mb-3 break-words">
                    {isExpanded ? full : truncated}
                  </p>

                  {full !== truncated && (
                    <button
                      onClick={() => toggleExpand(index)}
                      className="text-[#12372A] text-sm font-semibold underline hover:text-[#0f261e]"
                    >
                      {isExpanded ? t.RP1 : t.RP2}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ReviewsPage;

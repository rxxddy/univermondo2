import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Instagram as InstagramIcon } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import { useNavigate } from 'react-router-dom';

export default function Reviews() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const reviews = Array.isArray(t?.Reviews) ? t.Reviews : [];
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState({});

  const cut = (text, maxWords = 35) => {
    if (typeof text !== 'string') return { short: '', full: '' };
    const words = text.trim().split(/\s+/);
    if (words.length <= maxWords) return { short: text, full: text };
    return { short: words.slice(0, maxWords).join(' ') + '…', full: text };
  };

  const normalizeInstagram = (val) => {
    if (!val) return null;
    if (typeof val === 'string') {
      const raw = val.trim();
      if (!raw) return null;
      if (/^https?:\/\//i.test(raw)) return { url: raw, label: raw };
      const handle = raw.replace(/^@+/, '').split(/\s+/)[0];
      if (!handle) return { url: null, label: raw };
      return { url: `https://instagram.com/${handle}`, label: raw };
    }
    if (typeof val === 'object') {
      const url = typeof val.url === 'string' ? val.url : (typeof val.href === 'string' ? val.href : null);
      const handle = typeof val.handle === 'string'
        ? val.handle
        : (typeof val.username === 'string' ? val.username : (typeof val.label === 'string' ? val.label : null));
      if (url) return { url, label: handle || url };
      if (handle) {
        const h = handle.replace(/^@+/, '');
        return { url: `https://instagram.com/${h}`, label: val.label || handle };
      }
    }
    return null;
  };

  const scrollToIndex = (i) => {
    const track = trackRef.current;
    const card = cardRefs.current[i];
    if (!track || !card) return;
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const target = Math.max(0, cardCenter - track.clientWidth / 2);
    track.scrollTo({ left: target, behavior: 'smooth' });
  };

  const next = () => {
    if (!reviews.length) return;
    const i = (active + 1) % reviews.length;
    setActive(i);
    setExpanded({});
    scrollToIndex(i);
  };

  const prev = () => {
    if (!reviews.length) return;
    const i = (active - 1 + reviews.length) % reviews.length;
    setActive(i);
    setExpanded({});
    scrollToIndex(i);
  };

  // Listen to scroll events to update active slide
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = null;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const center = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        cardRefs.current.forEach((el, idx) => {
          if (!el) return;
          const c = el.offsetLeft + el.offsetWidth / 2;
          const d = Math.abs(center - c);
          if (d < bestDist) {
            bestDist = d;
            best = idx;
          }
        });
        setActive(best);
      });
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Reset active and expanded on language change
  useEffect(() => {
    setActive(0);
    setExpanded({});
    const id = setTimeout(() => scrollToIndex(0), 0);
    return () => clearTimeout(id);
  }, [language]);

  const slides = useMemo(() => {
    return reviews.map((r, idx) => {
      const { short, full } = cut(r?.review, 35);
      const isExpanded = !!expanded[idx];
      const insta = normalizeInstagram(r?.Rinsta);

      return (
        <div
          key={idx}
          ref={(el) => (cardRefs.current[idx] = el)}
          className="
            shrink-0 snap-center
            w-[88%] sm:w-[70%] md:w-[46%] lg:w-[32%]
            bg-[#F9FAFB] border border-gray-200 rounded-2xl
            px-6 py-6 md:px-8 md:py-8
            shadow-sm
            transition-transform duration-300
          "
        >
          <div className="flex items-center gap-4 mb-5">
            <img
              src={r?.image || '/assets/avatar-placeholder.png'}
              alt={r?.name || 'Reviewer'}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-[#1C3D33]"
              onError={(e) => { e.currentTarget.src = '/assets/avatar-placeholder.png'; }}
            />
            <div className="min-w-0">
              <p className="font-semibold text-[#1C3D33] truncate">{r?.name || '—'}</p>
              <p className="text-sm text-gray-500 truncate">{r?.location || ''}</p>

              {insta ? (
                <a
                  href={insta.url || undefined}
                  target={insta.url ? '_blank' : undefined}
                  rel={insta.url ? 'noreferrer' : undefined}
                  className={`flex items-center gap-1 text-sm mt-1 ${
                    insta.url ? 'text-[#1C3D33] hover:opacity-80' : 'text-gray-500 cursor-default'
                  }`}
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span className="truncate">{insta.label}</span>
                </a>
              ) : r?.Rinsta ? (
                <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                  <InstagramIcon className="w-4 h-4" />
                  <span className="truncate">{String(r.Rinsta)}</span>
                </div>
              ) : null}
            </div>
          </div>

          <div className="relative">
            <svg aria-hidden viewBox="0 0 24 24" className="absolute -top-2 -left-1 w-6 h-6 opacity-10">
              <path d="M7 17h4V7H5v8a2 2 0 0 0 2 2Zm10 0h4V7h-6v8a2 2 0 0 0 2 2Z" />
            </svg>
            <p className="text-sm leading-relaxed text-[#1C3D33]">{isExpanded ? full : short}</p>
            {short !== full && (
              <button
                onClick={() => navigate('/ReviewsPage')}
                className="mt-3 text-sm font-medium underline underline-offset-4 text-[#1C3D33] hover:text-black"
              >
                {t?.RP2 ?? 'Читать дальше'}
              </button>
            )}
          </div>
        </div>
      );
    });
  }, [reviews, expanded, language]);

  // If no reviews, render nothing
  if (!reviews.length) return null;

  return (
    <section className="bg-white py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-[#1C3D33] mb-10 sm:mb-14 font-serif">
          {t?.ReviewsTitle?.[0] ?? 'Reviews'}
        </h2>

        <div className="relative">
       
          <button
            onClick={prev}
            aria-label="Previous"
            className="hidden md:flex items-center justify-center absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-300 bg-white shadow hover:shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            ref={trackRef}
            className="
              flex gap-4 md:gap-6 lg:gap-8
              overflow-x-auto
              scroll-smooth
              snap-x snap-mandatory
              pb-2 pt-1
              [-ms-overflow-style:none] [scrollbar-width:none]
            "
            style={{ scrollbarWidth: 'none' }}
          >
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
            {slides}
          </div>

          <button
            onClick={next}
            aria-label="Next"
            className="hidden md:flex items-center justify-center absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-300 bg-white shadow hover:shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => {
                setActive(i);
                scrollToIndex(i);
              }}
              className={`h-2.5 rounded-full transition-all ${
                active === i ? 'w-6 bg-[#1C3D33]' : 'w-2.5 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Mobile arrows */}
        <div className="mt-6 flex md:hidden justify-center gap-4">
          <button
            onClick={prev}
            className="px-4 py-2 rounded-full border border-gray-300 bg-white text-[#1C3D33] shadow-sm active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="px-4 py-2 rounded-full border border-gray-300 bg-white text-[#1C3D33] shadow-sm active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

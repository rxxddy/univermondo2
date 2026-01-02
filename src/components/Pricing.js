import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Pricing({ textColor }) {
  const { language } = useLanguage();
  const currentTranslations = translations[language];
  const componentRef = useRef(null);
  const swiperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Show/hide autoplay based on visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (componentRef.current) observer.observe(componentRef.current);
    return () => {
      if (componentRef.current) observer.unobserve(componentRef.current);
    };
  }, []);

  useEffect(() => {
    if (swiperRef.current?.autoplay) {
      isVisible ? swiperRef.current.autoplay.start() : swiperRef.current.autoplay.stop();
    }
  }, [isVisible]);

  return (
    <section
      ref={componentRef}
      className="relative w-full px-6 pt-28 pb-10 sm:pb-56 sm:pt-36 sm:pb-64 bg-[#F8F9F9] border-t border-gray-200 overflow-visible"
    >
      <div className="mx-auto max-w-4xl text-center mb-16">
        <h2 className="text-sm font-bold uppercase text-[#12372A] tracking-widest">
          {currentTranslations.Pricing1}
        </h2>
        <p className={`mt-3 text-5xl font-bold ${textColor} sm:text-6xl`}>
          {currentTranslations.Pricing2}
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto">

        <div className="absolute -left-6 top-1/2 z-20 -translate-y-1/2">
          <button className="custom-swiper-prev bg-white border border-[#12372A] rounded-full p-3 shadow hover:bg-[#12372A] hover:text-white transition text-[#12372A] ml-2">
            ‹
          </button>
        </div>
        <div className="absolute -right-6 top-1/2 z-20 -translate-y-1/2">
          <button className="custom-swiper-next bg-white border border-[#12372A] rounded-full p-3 shadow hover:bg-[#12372A] hover:text-white transition text-[#12372A] mr-2">
            ›
          </button>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          navigation={{
            nextEl: '.custom-swiper-next',
            prevEl: '.custom-swiper-prev',
          }}
          pagination={{
            el: '.swiper-pagination',
            type: 'progressbar',
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
          speed={800}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
            1440: { slidesPerView: 3 },
          }}
          style={{padding: "10px"}}
        >
          {currentTranslations.pricingPlans.map((plan, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 flex min-h-[38rem] flex-col transition hover:scale-[1.015]">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-[#12372A]">{plan.title}</h3>
                  {(plan.title === 'VIP Support' ||
                    plan.title === 'VIP сопровождение' ||
                    plan.title === 'VIP qo‘llab-quvvatlash') && (
                    <span className="text-red-500 line-through text-2xl">5300€</span>
                  )}
                </div>
                <p className="mt-1 text-4xl font-extrabold text-[#12372A]">{plan.price}</p>

                <ul className="mt-8 space-y-3 text-gray-700 text-sm grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-x-3">
                      <span className="text-[#12372A] font-bold">✔</span> {feature}
                    </li>
                  ))}
                </ul>

                <a
                  onClick={() => {
                    window.location.href = `/contacts#contacts-section`;
                  }}
                  className="mt-auto block rounded-full px-5 py-3 text-center text-sm font-semibold bg-[#12372A] text-white hover:bg-[#0f2e22] transition"
                >
                  {plan.buttonLabel}
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

import { useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import { translations } from "../translations";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  const goContacts = () => navigate("/Contacts#contacts-section");
  const scrollToServices = () => {
    const el = document.getElementById("services");
    if (!el) return;
    const HEADER_OFFSET = window.innerWidth < 640 ? 132 : 96;
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const tickerText =
    t?.HeroTicker ||
    "Univermondo • Study Abroad • Scholarships • Visa Assistance • Trusted Since 2024 • ";

  return (
    <section
      aria-label="Hero"
      className="relative w-full overflow-hidden bg-transparent"
    >
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/rome.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 pt-28 sm:pt-32 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 xl:col-span-5">

            <div className="rounded-2xl bg-black/40 p-5 sm:p-6 md:p-7 border-2 border-white">

              <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-medium rounded-full border border-white/20 bg-white/10 px-3 py-1 text-white/90">
                {t?.HeroBadge || t.HeroSection4[0]}
              </div>

              <h1 className="mt-4 text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-[1.1] tracking-tight text-white">
                {t.HeroSection1}
              </h1>

              <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-white/90 max-w-xl">
                {t.HeroSection2[0]}
                <span className="mx-2 inline-block rounded-lg border border-white/70 px-2 py-0.5 font-black">
                  {t.HeroSection2[1]}
                </span>
                {t.HeroSection2[2]}
              </p>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                <button
                  onClick={goContacts}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white text-[#0E3B2E] px-6 py-3 text-sm sm:text-base font-semibold shadow-[0_6px_20px_rgba(0,0,0,0.25)] hover:bg-neutral-100 focus:outline-none focus:ring-4 focus:ring-emerald-200"
                >
                  {t.HeroSection3}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={scrollToServices}
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-white/30 bg-transparent px-6 py-3 text-sm sm:text-base font-semibold text-white hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/30"
                >
                  {t?.HeroSecondary || t.HeroSection5[0]}
                </button>
              </div>

              <ul className="mt-6 hidden sm:flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/85">
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300"/>{t.HeroSection6[0]}</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300"/>{t.HeroSection6[1]}</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300"/>{t.HeroSection6[2]}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-0 right-0 bottom-3 sm:bottom-4 md:bottom-5 z-20">
        <div className="w-full bg-white border-t border-black/10">
          <div className="h-8 sm:h-9 overflow-hidden">
            <div className="marquee whitespace-nowrap text-[#0E3B2E] font-semibold text-[13px] sm:text-[13px] leading-[32px] sm:leading-[36px]">
              <span className="mx-8">{tickerText}</span>
              <span className="mx-8">{tickerText}</span>
              <span className="mx-8">{tickerText}</span>
              <span className="mx-8">{tickerText}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .marquee { display:inline-block; animation: hero_marquee 20s linear infinite; will-change: transform; }
        @keyframes hero_marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
}

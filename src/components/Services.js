import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import { translations } from "../translations";
import {
  GraduationCap,
  FileText,
  Send,
  Plane,
  ShieldCheck,
  Clock3,
  Handshake,
  Globe,
  PhoneCall,
} from "lucide-react";
import { useMemo, useState } from "react";

export default function ServicesV5() {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const go = (to) => {
    if (!to) return;
    if (to.includes("#")) window.location.assign(to);
    else navigate(to);
  };

  // data
  const serviceCards = useMemo(
    () => ({
      core: [
        { title: t.Services3, description: t.Services4, to: "/Admission", Icon: GraduationCap },
        { title: t.Services5, description: t.Services6, to: "/Visa", Icon: FileText },
        { title: t.Services7, description: t.Services8, to: "/Contacts#contacts-section", Icon: Send },
        { title: t.Services9, description: t.Services10, to: "/Visa", Icon: Plane },
      ],
    }),
    [t]
  );

  const reasons = useMemo(
    () => [
      { title: t.Services12, description: t.Services13, Icon: ShieldCheck, action: () => go("/Admission") },
      { title: t.Services14, description: t.Services15, Icon: Clock3, action: () => go("/Admission") },
      { title: t.Services16, description: t.Services17, Icon: Handshake, action: () => go("/Admission") },
      { title: t.Services18, description: t.Services19, Icon: Globe, action: () => scrollTo("spinner-section") },
      { title: t.Services20, description: t.Services21, Icon: PhoneCall, action: () => go("/Contacts#contacts-section") },
    ],
    [t]
  );

  const tabs = [
    { key: "core", label: t.Services23[0] },
    { key: "reasons", label: t.Services24[0] },
  ];
  const [active, setActive] = useState("core");

  return (
    <section className="relative w-full bg-white px-5 sm:px-6 lg:px-16 py-14 lg:py-22" id="services">
      <div className="max-w-screen-xl mx-auto">
        <header className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">{t.Services1}</h2>
          <p className="mt-4 text-sm sm:text-lg text-slate-600 max-w-3xl mx-auto">{t.Services2}</p>
        </header>

        {/* MOBILE: tabs */}
        <div className="md:hidden sticky top-16 z-[5] bg-white/90 backdrop-blur border-y border-slate-200 py-2 -mx-5 px-5">
          <div className="flex gap-2">
            {tabs.map((tb) => (
              <button
                key={tb.key}
                onClick={() => setActive(tb.key)}
                className={`flex-1 rounded-full px-3 py-2 text-sm font-semibold transition border ${
                  active === tb.key
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-900 border-slate-300"
                }`}
              >
                {tb.label}
              </button>
            ))}
          </div>
        </div>

        {/* DESKTOP: grid */}
        <div className="hidden md:block space-y-16">
          <SectionTitle title={tabs[0].label} />
          <Grid>
            {serviceCards.core.map((card) => (
              <ServiceCard key={card.title} {...card} />
            ))}
          </Grid>

          <SectionTitle title={tabs[1].label} />
          <Grid columns="md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r) => (
              <ReasonCard key={r.title} {...r} />
            ))}
          </Grid>
        </div>

        {/* MOBILE: active tab + carousel */}
        <div className="md:hidden mt-6">
          {active === "core" ? (
            <Carousel>
              {serviceCards.core.map((card) => (
                <CarouselItem key={card.title}>
                  <ServiceCard {...card} compact />
                </CarouselItem>
              ))}
            </Carousel>
          ) : (
            <Carousel>
              {reasons.map((r) => (
                <CarouselItem key={r.title}>
                  <ReasonCard {...r} compact />
                </CarouselItem>
              ))}
            </Carousel>
          )}
        </div>
      </div>
    </section>
  );
}

/* Helper components */
function SectionTitle({ title }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="h-[1px] flex-1 bg-slate-200" />
      <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-700">{title}</span>
      <div className="h-[1px] flex-1 bg-slate-200" />
    </div>
  );
}

function Grid({ children, columns = "md:grid-cols-2 lg:grid-cols-4" }) {
  return (
    <div className={`grid grid-cols-1 ${columns} gap-6 lg:gap-8 items-stretch`}>{children}</div>
  );
}

function ServiceCard({ title, description, to, Icon, compact }) {

  const { language } = useLanguage();
  const t = translations[language];

  const content = (
    <div className="group relative rounded-2xl bg-white border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)] transition-all p-5 sm:p-6 flex flex-col h-full">
      <div className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-3">
        <Icon className="w-6 h-6 text-slate-900" />
      </div>
      <h3 className="mt-4 text-lg sm:text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-slate-600 text-sm sm:text-base line-clamp-3">{description}</p>
      <div className="mt-auto pt-5">
        <span className="text-sm font-medium text-slate-900 group-hover:underline">{t.Services22[0]} →</span>
      </div>
      <span className="pointer-events-none absolute left-5 right-5 -bottom-px h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
    </div>
  );

  if (compact) return content;
  return (
    <Link to={to} className="focus:outline-none focus:ring-4 focus:ring-amber-100">
      {content}
    </Link>
  );
}

function ReasonCard({ title, description, Icon, action, compact }) {

  const { language } = useLanguage();
  const t = translations[language];

  const content = (
    <div className="text-left w-full rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)] transition-all p-5 sm:p-6 flex flex-col h-full">
      <div className="flex items-start gap-4">
        <div className="shrink-0 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-3">
          <Icon className="w-6 h-6 text-slate-900" />
        </div>
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-slate-900">{title}</h4>
          <p className="mt-1.5 text-slate-600 text-sm sm:text-base line-clamp-3">{description}</p>
        </div>
      </div>
      <div className="mt-auto pt-4 text-sm font-medium text-slate-900">{t.Services22[0]} →</div>
    </div>
  );

  if (compact) return content;
  return (
    <button type="button" onClick={action} className="focus:outline-none focus:ring-4 focus:ring-amber-100 w-full text-left">
      {content}
    </button>
  );
}

function Carousel({ children }) {
  return (
    <div className="-mx-5 px-5">
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 scrollbar-none" style={{ scrollbarWidth: "none" }}>
        {children}
      </div>
    </div>
  );
}

function CarouselItem({ children }) {
  return <div className="snap-start shrink-0 w-[82%] xxs:w-[78%] sm:w-[70%]">{children}</div>;
}

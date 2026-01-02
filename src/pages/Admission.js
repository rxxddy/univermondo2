import React from "react";
import { useLanguage } from "../LanguageContext";
import { translations } from "../translations";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";
import {
  Send,
  FileText,
  GraduationCap,
  Star,
  ArrowRight,
} from "lucide-react";

export default function Admission() {
  const { language } = useLanguage();
  const t = translations[language];

  const steps = [
    {
      icon: <Send className="w-5 h-5 text-white" />,
      title: t.Admission2,
      description: t.Admission3,
    },
    {
      icon: <FileText className="w-5 h-5 text-white" />,
      title: t.Admission4,
      description: t.Admission5,
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-white" />,
      title: t.Admission6,
      description: t.Admission7,
    },
    {
      icon: <Star className="w-5 h-5 text-white" />,
      title: t.Admission8,
      description: t.Admission9,
    },
  ];

  return (
    <div className="bg-white text-[#12372A] pt-28">
      {/* HERO */}
      <section className="relative bg-[#F5F7F6] py-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12 relative z-10">
          <div>
            <h1 className="text-5xl font-serif font-extrabold leading-tight mb-6">
              {t.About1}
            </h1>
            <p className="text-lg text-gray-700">{t.Admission11}</p>
          </div>
          <img
            src={`${process.env.PUBLIC_URL}/images/florence.png`}
            alt="Florence"
            className="w-full h-auto max-h-[360px] object-cover rounded-xl shadow-md"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />
      </section>

      {/* STEPS */}
      <section className="max-w-6xl mx-auto py-24 px-6">
        <h2 className="text-3xl font-bold text-center mb-16">
          {t.HeroSection1}
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-[#F0F4F1] rounded-xl p-6 shadow-sm flex items-start gap-5"
            >
              <div className="bg-[#12372A] p-3 rounded-full shrink-0">
                {step.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-[#FAFBFA] py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">{t.Admission10}</h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              <li>{t.Admission13}</li>
              <li>{t.Admission14}</li>
              <li>{t.Admission15}</li>
              <li>{t.Admission16}</li>
              <li>{t.Admission17}</li>
              <li>{t.Admission18}</li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold mb-4">{t.Admission12}</h3>
            <p className="text-gray-700">{t.Admission19}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-28 px-6">
        <h2 className="text-4xl md:text-5xl font-serif font-extrabold mb-10">
          {t.HeroSection1}
        </h2>
        <a
          href="/Contacts"
          className="inline-flex items-center gap-3 bg-[#12372A] text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-[#0F2E22] transition"
        >
          {t.HeroSection3} <ArrowRight className="w-5 h-5" />
        </a>
      </section>

      <Pricing textColor="text-[#12372A]" />
      <Footer />
    </div>
  );
}

import React from "react";
import { useLanguage } from "../LanguageContext";
import { translations } from "../translations";
import Footer from "../components/Footer";
import { GraduationCap, Globe, PlaneTakeoff } from "lucide-react";

export default function AboutUs() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="bg-[#FAFAFA] text-gray-900">
      {/* Hero Statement */}
      <section className="px-6 pt-40 pb-32 bg-white border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto text-center">
          <p className="uppercase text-sm tracking-widest text-[#12372A] mb-4">UniverMondo</p>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            {t.About1}
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            {t.About2}
          </p>
        </div>
      </section>

      {/* 3-Column Explainers with icons */}
      <section className="px-6 py-28 bg-[#F1F3F2]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <Card icon={<GraduationCap />} title={t.About5} desc={t.About6} />
          <Card icon={<Globe />} title={t.About7} desc={t.About8} />
          <Card icon={<PlaneTakeoff />} title={t.About9} desc={t.About10} />
        </div>
      </section>

      {/* Team Preview Section */}
      <section className="py-32 bg-white px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#12372A]">{t.OurTeam}</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">{t.TeamDescription}</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-10">
            {t.Stuff.map((person, i) => (
              <div key={i} className="bg-[#F9FAFA] rounded-xl shadow-md p-6 text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#12372A] mx-auto mb-4">
                  <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{person.name}</h3>
                <p className="text-sm text-[#12372A] font-medium mb-2">{person.job}</p>
                <p className="text-sm text-gray-500">{person.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Soft Tone Section */}
      <section className="bg-[#F0F4F1] py-28 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-[#12372A]">{t.About11}</h2>
          <p className="text-lg text-gray-700 mb-10">{t.About12}</p>
          <a
            href="/Contacts"
            className="inline-block bg-[#12372A] text-white px-10 py-4 text-lg font-semibold rounded-full hover:bg-[#0F2E22] transition"
          >
            {t.About13}
          </a>
          <p className="text-sm text-gray-500 mt-4">{t.About14}</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Card({ icon, title, desc }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-lg transition text-center">
      <div className="mb-4 flex justify-center text-[#12372A]">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

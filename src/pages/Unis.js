import { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { UniTranslation } from '../UniTranslation';
import Footer from "../components/Footer";

export default function Unis() {
  const { language } = useLanguage();
  const currentTranslations = UniTranslation[language];
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const closeModal = () => {
    if (typeof document !== 'undefined') document.body.style.overflow = '';
    setSelectedUniversity(null);
  };

  // Country i18n helpers
  const COUNTRY_LABELS = {
    en: {
      IT: 'Italy',
      AT: 'Austria',
      DE: 'Germany',
      PL: 'Poland',
      CZ: 'Czech Republic',
      NL: 'Netherlands',
      // GB: 'United Kingdom',
    },
    ru: {
      IT: 'Италия',
      AT: 'Австрия',
      DE: 'Германия',
      PL: 'Польша',
      CZ: 'Чехия',
      NL: 'Нидерланды',
      // GB: 'Великобритания',
    },
    uz: {
      IT: 'Italiya',
      AT: 'Avstriya',
      DE: 'Germaniya',
      PL: 'Polsha',
      CZ: 'Chexiya',
      NL: 'Niderlandiya',
      // GB: 'Buyuk Britaniya',
    },
    it: {
      IT: 'Italia',
      AT: 'Austria',
      DE: 'Germania',
      PL: 'Polonia',
      CZ: 'Repubblica Ceca',
      NL: 'Paesi Bassi',
      // GB: 'Regno Unito',
    },
  };

  // Mapping country names to ISO codes
  // 1) Adjusted mapping table
  const NAME_TO_CODE = {
    // ITALY
    'italy': 'IT','italia': 'IT','италия': 'IT','italiya': 'IT','italiya': 'IT',
    // AUSTRIA
    'austria': 'AT','австрия': 'AT','avstriya': 'AT',
    // GERMANY
    'germany': 'DE','germania': 'DE','германия': 'DE','germaniya': 'DE','germaniia': 'DE','deutschland': 'DE',
    // POLAND
    'poland': 'PL','polonia': 'PL','польша': 'PL','polsha': 'PL','pol\'sha': 'PL','pol’sha': 'PL','polʼsha': 'PL',
    // CZECH REPUBLIC / CZECHIA
    'czech republic':'CZ','czechia':'CZ','repubblica ceca':'CZ','чехия':'CZ',
    'chexiya':'CZ','chehiya':'CZ','česko':'CZ','cesko':'CZ',
    // NETHERLANDS / HOLLAND
    'netherlands':'NL','paesi bassi':'NL','нидерланды':'NL',
    'niderlandiya':'NL','niderlandiia':'NL','holland':'NL','голландия':'NL','gollandiya':'NL',
    // UNITED KINGDOM — turned off
    // 'united kingdom':'GB', ...
  };

  // 2) Unify and normalize country names to ISO codes
  function normalizeCountryCode(countryStr = '') {
    const raw = String(countryStr).trim();

    // fast path for already correct ISO codes
    const iso = raw.toUpperCase();
    if (['IT','AT','DE','PL','CZ','NL','GB'].includes(iso)) return iso;

    // transform raw name to normalized key
    let key = raw
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Diacritic removal
      .replace(/[\u2018\u2019\u02BC\u02BB\u2032`]/g, "'") // all apostrophes to simple '
      .replace(/\s+/g, ' ') // normalize spaces
      .replace(/[^\p{L}\p{N}\s']/gu, '') // remove symbols except letters, numbers, spaces, apostrophes
      .trim();

    // Options for Cyrillic look-alike letters
    const lookAlikeMap = { 'а':'a','е':'e','о':'o','р':'p','с':'c','у':'y','х':'x','і':'i','ё':'e' };
    key = key.replace(/[\u0430\u0435\u043E\u0440\u0441\u0443\u0445\u0456\u0451]/g, ch => lookAlikeMap[ch] || ch);

    return NAME_TO_CODE[key] || null;
  }

  useEffect(() => {
    if (language === 'uz') {
      const rawSet = new Set(currentTranslations.allUniversities.map(u => String(u.country)));
      console.log('[UZ raw countries]', Array.from(rawSet));
      const mapped = new Set(
        currentTranslations.allUniversities.map(u => normalizeCountryCode(u.country)).filter(Boolean)
      );
      console.log('[UZ mapped codes]', Array.from(mapped));
    }
  }, [language, currentTranslations]);



  function getCountryLabel(code, lang = 'en') {
    return (COUNTRY_LABELS[lang] && COUNTRY_LABELS[lang][code]) || COUNTRY_LABELS.en[code] || code;
  }


  // Whatsapp partner link for UK promo card
  // Change the number and message as needed
  // const WHATSAPP_PARTNER_URL =
  //   "https://wa.me/79172669889?text=Здравствуйте!%20Хочу%20узнать%20про%20учёбу%20в%20Великобритании";

  // const ukLabel =
  //   language === 'ru' ? 'Великобритания'
  //   : language === 'it' ? 'Regno Unito'
  //   : language === 'uz' ? 'Buyuk Britaniya'
  //   : 'United Kingdom';

  // Check if English is selected in filters
  // const isEnglishSelected = typeof filters.language === 'string' &&
  //   ['english','inglese','английский','ingliz','ingliz tili','englisch','inglés','angielski']
  //     .includes(filters.language.toLowerCase());

  // Filtering universities
  let filteredUniversities = currentTranslations.allUniversities.filter((uni) => {
    const examValue = uni.entranceExams === true ? 'required' : 'not_required';
    const code = normalizeCountryCode(uni.country);
    return (
      code !== 'GB' && // [GB-OFF]
      (!filters.type || uni.type === filters.type) &&
      (!filters.language || uni.language?.includes(filters.language)) &&
      (!filters.country || code === filters.country) &&
      (!filters.city || uni.location === filters.city) &&
      (!filters.exam || examValue === filters.exam)
    );
  });

  // Sorting universities
  if (sortBy === 'priceLowHigh') {
    filteredUniversities.sort((a, b) => a.priceRange.length - b.priceRange.length);
  } else if (sortBy === 'priceHighLow') {
    filteredUniversities.sort((a, b) => b.priceRange.length - a.priceRange.length);
  } else if (sortBy === 'nameAZ') {
    filteredUniversities.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'nameZA') {
    filteredUniversities.sort((a, b) => b.name.localeCompare(a.name));
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  const resetFilters = () => setFilters({});

  useEffect(() => {
    const handleWheel = (e) => {
      if (!selectedUniversity) return;

      if (e.deltaY > 0) {
        const currentIndex = filteredUniversities.findIndex((u) => u.name === selectedUniversity.name);
        const nextIndex = (currentIndex + 1) % filteredUniversities.length;
        setSelectedUniversity(filteredUniversities[nextIndex]);
      } else if (e.deltaY < 0) {
        const currentIndex = filteredUniversities.findIndex((u) => u.name === selectedUniversity.name);
        const prevIndex = (currentIndex - 1 + filteredUniversities.length) % filteredUniversities.length;
        setSelectedUniversity(filteredUniversities[prevIndex]);
      }
    };

    if (selectedUniversity) {
      window.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [selectedUniversity, filteredUniversities]);

  // Promotional UK card logic
  // const noCountryCityLang = !filters.country && !filters.city && !filters.language;
  // const showUkPromo = noCountryCityLang || (filters.country === 'GB') || isEnglishSelected;

  // Instead of currentTranslations.allUniversities, we take the union of all locales
  const allUnisMaster = Object.values(UniTranslation)
    .flatMap(t => (t && t.allUniversities) ? t.allUniversities : []);

  // Collect country codes from the master list
  let allCountryCodes = Array.from(
    new Set(
      allUnisMaster
        .map(u => normalizeCountryCode(u.country))
        .filter(Boolean)
    )
  ).filter(code => code !== 'GB'); // GB turned off

  // Localized country options for filters
  const countryOptions = allCountryCodes
    .map(code => ({ value: code, label: getCountryLabel(code, language) }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const cityOptions = [...new Set(currentTranslations.allUniversities.map((u) => u.location))];
  const languageOptions = [...new Set(currentTranslations.allUniversities.flatMap((u) => u.language || []))];

  return (
    <div className="bg-white text-gray-800 min-h-screen font-sans w-full pt-[8em] md:pt-[10em]">
      <div className="max-w-screen-3xl mx-auto px-2 sm:px-6">
        <div className="mb-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 text-gray-800 hover:text-gray-600 font-medium transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span>{currentTranslations.Back}</span>
          </button>
        </div>

        {/* Mobile Filters — only country */}
        <div className="lg:hidden grid grid-cols-1 gap-4 mb-6">
          <div className="relative">
            <details className="group relative w-full">
              <summary
                className="list-none w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm
                          flex items-center justify-between cursor-pointer
                          [&::-webkit-details-marker]:hidden"
              >
                <span className="truncate">
                  {filters.country ? getCountryLabel(filters.country, language) : currentTranslations.UF_Placeholders[0]}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </summary>

              {/* Dropdown menu, attached to container width */}
              <div
                className="absolute left-0 right-0 z-50 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl
                          max-h-[60vh] overflow-auto"
              >
                {/* "All" */}
                <button
                  onClick={(e) => { handleFilterChange('country', ''); e.currentTarget.closest('details')?.removeAttribute('open'); }}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${!filters.country ? 'bg-gray-100 font-medium' : ''}`}
                >
                  {currentTranslations.UF_TypeOptions[0]}
                </button>

                {/* Countries */}
                {countryOptions.map((c) => (
                  <button
                    key={c.value}
                    onClick={(e) => { handleFilterChange('country', c.value); e.currentTarget.closest('details')?.removeAttribute('open'); }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${filters.country === c.value ? 'bg-gray-100 font-medium' : ''}`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </details>
          </div>

          <button
            onClick={() => setFilters({})}
            className="justify-self-start text-sm text-red-600 font-medium hover:underline"
          >
            {currentTranslations.UF_Reset[0]}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 justify-center items-start">
          {/* Filters Desktop — only country, without 'Filters' header */}
          <aside
            className="hidden lg:block sticky top-24 xl:top-[8rem]
                      max-h-[calc(100vh-8rem)] overflow-auto
                      w-full lg:w-80 bg-white p-6 rounded-3xl shadow-2xl shrink-0
                      border border-gray-200 z-10"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  {currentTranslations.UF_Placeholders[0]}
                </label>
                <select
                  onChange={(e) => handleFilterChange('country', e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm"
                  value={filters.country || ''}
                >
                  <option value="">{currentTranslations.UF_TypeOptions[0]}</option>
                  {countryOptions.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setFilters({})}
                className="text-sm text-red-600 font-medium hover:underline"
              >
                {currentTranslations.UF_Reset[0]}
              </button>
            </div>
          </aside>

          {/* Universities grid */}
          <section className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-8 py-12 flex-1 max-w-screen-2xl text-sm">
              {/* Promo UK (doesn't open modal) */}
              {/* {showUkPromo && (
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col border border-gray-200 hover:shadow-2xl transition">
                  <div className="w-full h-[200px] overflow-hidden">
                    <div
                      className="w-full h-full bg-gradient-to-br from-blue-200 via-white to-red-200 relative"
                      style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL}/images/gb.png)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="text-[10px] uppercase px-2 py-[2px] rounded-md font-semibold w-max mb-1 bg-purple-100 text-purple-800">
                      {language === 'ru' ? 'Партнёрская программа' :
                      language === 'it' ? 'Programma partner' :
                      language === 'uz' ? 'Hamkorlik dasturi' :
                      'Partner program'}
                    </div>
                    <h3 className="text-lg font-bold mb-1 text-gray-900">
                      {language === 'ru' ? 'Учёба в Великобритании' :
                      language === 'it' ? 'Studio nel Regno Unito' :
                      language === 'uz' ? 'Buyuk Britaniyada o‘qish' :
                      'Study in the United Kingdom'}
                    </h3>
                    <p className="text-xs text-gray-600 mb-1">📍 {getCountryLabel('GB', language)}</p>
                    <p className="text-xs text-gray-700 italic mb-3">
                      {language === 'ru' ? 'Подбор программ и поступление через наших партнёров.' :
                      language === 'it' ? 'Selezione corsi e ammissione tramite i nostri partner.' :
                      language === 'uz' ? 'Hamkorlarimiz orqali kurs tanlash va qabul.' :
                      'Program matching and admission via our partners.'}
                    </p>
                    <ul className="list-disc pl-4 text-xs text-gray-700 space-y-1 mb-4">
                      <li>{language === 'ru' ? 'Бакалавриат и магистратура' :
                            language === 'it' ? 'Bachelor e Master' :
                            language === 'uz' ? 'Bakalavr va Magistratura' :
                            'Bachelor’s and Master’s'}</li>
                      <li>{language === 'ru' ? 'Поддержка с документами и визой' :
                            language === 'it' ? 'Supporto documenti e visto' :
                            language === 'uz' ? 'Hujjatlar va viza yordam' :
                            'Documents and visa support'}</li>
                      <li>{language === 'ru' ? 'Быстрый старт консультации в WhatsApp' :
                            language === 'it' ? 'Consulenza rapida su WhatsApp' :
                            language === 'uz' ? 'WhatsApp’da tezkor maslahat' :
                            'Quick consult on WhatsApp'}</li>
                    </ul>
                    <a
                      href={WHATSAPP_PARTNER_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition"
                    >
                      {language === 'ru' ? 'Написать в WhatsApp' :
                      language === 'it' ? 'Scrivici su WhatsApp' :
                      language === 'uz' ? 'WhatsApp orqali yozing' :
                      'Chat on WhatsApp'}
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.149-.672.15-.198.297-.768.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.476-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.521.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.074-.149-.672-1.624-.92-2.223-.242-.58-.487-.5-.672-.51-.173-.009-.372-.011-.571-.011-.198 0-.521.074-.793.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.711.226 1.36.194 1.872.118.571-.085 1.758-.718 2.006-1.41.248-.694.248-1.289.173-1.41-.074-.124-.272-.198-.57-.347z"/><path d="M20.52 3.48C18.22 1.18 15.21 0 12 0 5.373 0 0 5.373 0 12c0 2.117.553 4.214 1.6 6.06L0 24l6.06-1.6C7.907 23.447 10.004 24 12.12 24c6.627 0 12-5.373 12-12 0-3.21-1.18-6.22-3.48-8.52zM12.12 21.818c-1.86 0-3.68-.5-5.26-1.442l-.378-.223-3.593.949.958-3.5-.245-.402C2.814 15.33 2.303 13.68 2.303 12c0-5.401 4.396-9.697 9.817-9.697 2.626 0 5.097 1.022 6.951 2.876 1.854 1.854 2.876 4.325 2.876 6.951 0 5.401-4.396 9.688-9.827 9.688z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              )} */}

              {/* Existing universities cards */}
              {filteredUniversities.map((university, index) => {
                const imageSrc = `${process.env.PUBLIC_URL}/images/${university.image}`;
                const typeColor =
                  university.type === 'university'
                    ? 'bg-blue-100 text-blue-800'
                    : university.type === 'foundation'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800';

                return (
                  <div
                    key={index}
                    onClick={() => setSelectedUniversity(university)}
                    className="cursor-pointer bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col border border-gray-200 hover:shadow-2xl transition"
                  >
                    <div className="w-full h-[200px] overflow-hidden">
                      <img
                        src={imageSrc}
                        alt={university.name}
                        className="object-cover w-full h-full"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <div
                        className={`text-[10px] uppercase px-2 py-[2px] rounded-md font-semibold w-max mb-1 ${typeColor}`}
                      >
                        {university.type === 'university'
                          ? currentTranslations.Unis1
                          : university.type === 'foundation'
                          ? currentTranslations.Unis2
                          : currentTranslations.Unis0}
                      </div>
                      <h3 className="text-lg font-bold mb-1 text-gray-900">
                        {university.name}
                      </h3>
                      <p className="text-xs text-gray-600 mb-1">
                        📍 {university.location}, {university.country}
                      </p>
                      <p className="text-xs text-gray-700 italic mb-2">
                        {currentTranslations.Unis3} {university.bestFor.join(', ')}
                      </p>
                      <ul className="list-disc pl-4 text-xs text-gray-700">
                        <li>{university.features[0]}</li>
                      </ul>
                    </div>
                  </div>
                );
              })}
          </section>
        </div>

      </div>

      <section className="bg-gray-100 py-16 text-center rounded-2xl mt-12">
        <div className="max-w-screen-lg mx-auto">
          <h2 className="text-4xl font-bold font-serif text-gray-900 mb-6">
            {currentTranslations.Unis5}
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            {currentTranslations.Unis6}
          </p>
          <a
            href="/Contacts"
            className="inline-block bg-gray-900 text-white px-8 py-4 text-lg font-semibold rounded-full hover:bg-gray-700 transition-colors duration-300"
          >
            {currentTranslations.Unis7}
          </a>
        </div>
      </section>

      <Footer />

      {selectedUniversity && (
        <>
          {typeof document !== 'undefined' && (document.body.style.overflow = 'hidden')}

          <div
            className="fixed inset-0 z-[9999] bg-black bg-opacity-70 flex items-center justify-center px-4 sm:px-8"
            onClick={closeModal}
          >
            <div
              className="relative w-full max-w-screen-md flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ← */}
              <button
                className="absolute left-1 sm:left-[-3rem] top:[45%] -translate-y-1/2 bg-black/60 text-white p-2 sm:p-3 rounded-full shadow-md z-[10000] hover:bg-black/80 transition sm:text-black sm:bg-white sm:border sm:border-gray-300 sm:hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = filteredUniversities.findIndex((u) => u.name === selectedUniversity?.name);
                  const prevIndex = (currentIndex - 1 + filteredUniversities.length) % filteredUniversities.length;
                  setSelectedUniversity(filteredUniversities[prevIndex]);
                }}
              >
                ←
              </button>

              {/* Modal */}
              <div className="bg-white rounded-3xl w-full max-w-screen-md max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="relative">
                  {selectedUniversity?.image && (
                    <img
                      src={`${process.env.PUBLIC_URL}/images/${selectedUniversity.image}`}
                      alt={selectedUniversity.name}
                      className="w-full h-[240px] sm:h-[320px] object-cover rounded-t-3xl"
                    />
                  )}
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 rounded-full p-1 shadow z-[10000]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold">{selectedUniversity.name}</h2>
                  <p className="text-sm text-gray-600">
                    📍 {selectedUniversity.location}, {selectedUniversity.country}
                  </p>
                  <p className="text-sm italic text-gray-700">
                    {currentTranslations.Unis3} {selectedUniversity.bestFor.join(', ')}
                  </p>
                  <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1">
                    {selectedUniversity.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                  {selectedUniversity.description && (
                    <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                      {selectedUniversity.description}
                    </div>
                  )}
                </div>
              </div>

              {/* → */}
              <button
                className="absolute right-1 sm:right-[-3rem] top:[45%] -translate-y-1/2 bg-black/60 text-white p-2 sm:p-3 rounded-full shadow-md z-[10000] hover:bg-black/80 transition sm:text-black sm:bg-white sm:border sm:border-gray-300 sm:hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = filteredUniversities.findIndex((u) => u.name === selectedUniversity?.name);
                  const nextIndex = (currentIndex + 1) % filteredUniversities.length;
                  setSelectedUniversity(filteredUniversities[nextIndex]);
                }}
              >
                →
              </button>
            </div>
          </div>
        </>
      )}
      
    </div>
  );
}

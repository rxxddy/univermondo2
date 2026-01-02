'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import { useNavigate } from 'react-router-dom';

const flagMap = {
  en: `${process.env.PUBLIC_URL}/gb.svg`,
  ru: `${process.env.PUBLIC_URL}/ru.svg`,
  uz: `${process.env.PUBLIC_URL}/uz.svg`,
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value)
  }

  const currentTranslations = translations[language]

  const navigateToSection = (sectionId) => {
    navigate('/');

    setTimeout(() => {
      const targetElement = document.getElementById(sectionId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };
  

  return (
    <header className="bg-white fixed top-0 left-0 w-full z-50 border-b-2 border-grey/70">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex items-center lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5" onClick={() => window.location.href = '/'}>
            <span className="sr-only">UniverMondo</span>
            <img alt="UniverMondo logo" src={`${process.env.PUBLIC_URL}/logo.png`} className="h-8 w-auto" />
          </a>
          <div
            className="hidden lg:flex ml-8 text-xl font-luxury text-gray-900 cursor-pointer"
            onClick={() => window.location.href = '/'}
          >
            UniverMondo
          </div>
        </div>

        {/* Title for Mobile */}
        <div className="flex lg:hidden">
          <div
          className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 flex items-center text-xl font-luxury text-gray-900 text-center cursor-pointer"
            onClick={() => window.location.href = '/'}
          >
            UniverMondo
          </div>
        </div>

        {/* Mobile Menu Button with Flag */}
        <div className="flex items-center lg:hidden space-x-4">
          <div className="flex items-start relative">
            <div className="flex items-start relative">
              <div className="relative">

                {/* Flag Icon */}
                <img
                  src={flagMap[language]}
                  alt={`${language} flag`}
                  className="h-6 w-6 cursor-pointer"
                  onClick={() => setLanguageDropdownOpen((prev) => !prev)}
                />

                {/* Language Dropdown */}
                {languageDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg z-50">
                    <ul className="py-1">
                      <li
                        onClick={() => {
                          setLanguage('en');
                          setLanguageDropdownOpen(false);
                          console.log("Language set to English");
                        }}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        English
                      </li>
                      <li
                        onClick={() => {
                          setLanguage('ru');
                          setLanguageDropdownOpen(false);
                          console.log("Language set to Russian");
                        }}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        Русский
                      </li>
                      <li
                        onClick={() => {
                          setLanguage('uz');
                          setLanguageDropdownOpen(false);
                          console.log("Language set to Uzbek");
                        }}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        Oʻzbekcha
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>


          {/* Hamburger Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-md font-semibold text-gray-900">
              {currentTranslations.services}
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute -left-8 top-full z-50 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="p-4">
                <h2 className="text-xl font-bold cursor-pointer" onClick={() => window.location.href = '/About'}>{currentTranslations.aboutUs}</h2>
                {currentTranslations.products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-md hover:bg-gray-50"
                  >
                    <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-[#336659]" />
                    </div>
                    <div className="flex-auto">
                      <a href={item.href} className="block font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <a onClick={() => window.location.href = '/About'} className="text-md font-semibold text-gray-900 cursor-pointer">
            {currentTranslations.aboutUs}
          </a>
          <a onClick={() => window.location.href = '/Unis'} className="text-md font-semibold text-gray-900 cursor-pointer">
            {currentTranslations.Unis}
          </a>
          <a onClick={() => window.location.href = '/Contacts'} className="text-md font-semibold text-gray-900 cursor-pointer">
            {currentTranslations.contact}
          </a>

          <a
            onClick={() => window.location.href = '/ReviewsPage'}
            className="text-md font-semibold text-gray-900 cursor-pointer"
          >
            {currentTranslations.reviews}
          </a>
          <a
            onClick={() => navigateToSection('faq-section')}
            className="text-md font-semibold text-gray-900 cursor-pointer"
          >
            {currentTranslations.que}
          </a>

        </PopoverGroup>

        {/* Language Selector for Desktop */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="text-sm font-semibold text-gray-900 border rounded-md px-3 py-1"
          >
            <option value="en">English</option>
            <option value="ru">Русский</option>
            <option value="uz">Oʻzbekcha</option>
          </select>
          <div className="flex items-center">
            <img
              src={flagMap[language]}
              alt={`${language} flag`}
              className="w-8 h-8 ml-4"
            />
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">UniverMondo</span>
              <img
                alt="UniverMondo logo"
                src={`${process.env.PUBLIC_URL}/logo.png`}
                className="h-8 w-auto"
              />
            </a>

            <div
            className="flex items-center text-xl font-luxury text-gray-900 text-center cursor-pointer"
              onClick={() => window.location.href = '/'}
            >
              UniverMondo
            </div>

            {/* Close Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-6 py-6">
                <Disclosure as="div" className="space-y-2">
                  <DisclosureButton className="-m-2 group flex w-full items-center justify-between rounded-lg py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    {currentTranslations.services}
                    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-[open]:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {currentTranslations.products.map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>

                  <Disclosure as="div" className="space-y-2 cursor-pointer" onClick={() => window.location.href = '/About'}>
                    <DisclosureButton className="-m-2 block rounded-lg py-2 text-base font-semibold text-gray-900 hover:bg-gray-50" >
                      {currentTranslations.aboutUs}
                    </DisclosureButton>
                  </Disclosure>

                  <Disclosure as="div" className="space-y-2 cursor-pointer" onClick={() => window.location.href = '/Unis'}>
                    <DisclosureButton className="-m-2 block rounded-lg py-2 text-base font-semibold text-gray-900 hover:bg-gray-50" >
                      {currentTranslations.Unis}
                    </DisclosureButton>
                  </Disclosure>


                <Disclosure as="div" className="space-y-2 cursor-pointer" onClick={() => window.location.href = '/Contacts'}>
                  <DisclosureButton className="-m-2 block rounded-lg py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                    {currentTranslations.contact}
                  </DisclosureButton>
                </Disclosure>
              {/* Mobile Navigation */}
              <Disclosure
                as="div"
                className="space-y-2 cursor-pointer"
                onClick={() => {
                  window.location.href = '/ReviewsPage'
                }}
              >
                <DisclosureButton className="-m-2 block rounded-lg py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                  {currentTranslations.reviews}
                </DisclosureButton>
              </Disclosure>
              <Disclosure
                as="div"
                className="space-y-2 cursor-pointer"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateToSection('faq-section');
                }}
              >
                <DisclosureButton className="-m-2 block rounded-lg py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                  {currentTranslations.que}
                </DisclosureButton>
              </Disclosure>



                <div className="space-y-2">
                  <div className="-m-2 block rounded-lg py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 flex">
                    <select
                      value={language}
                      onChange={handleLanguageChange}
                      className="text-sm font-semibold text-gray-900 border rounded-md px-3 py-1"
                    >
                      <option value="en">English</option>
                      <option value="ru">Русский</option>
                      <option value="uz">Oʻzbekcha</option>
                    </select>
                    <div className="flex items-center">
                      <img
                        src={flagMap[language]}
                        alt={`${language} flag`}
                        className="w-8 h-8 ml-4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>

    </header>
  )
}

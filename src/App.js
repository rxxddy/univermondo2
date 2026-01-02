import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import Unis from './pages/Unis';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Admission from './pages/Admission';
import Visa from './pages/Visa';
import CookieConsent from './components/CookieConsent';
import Info from './components/Info';
import ReviewsPage from './pages/ReviewsPage';
import { LanguageProvider } from './LanguageContext';
import FloatingCircle from './components/FloatingCircle';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/Unis" element={<Unis />} />
          <Route path="/About" element={<About />} />
          <Route path="/Unis" element={<Unis />} />
          <Route path="/Contacts" element={<Contacts />} />
          <Route path="/Admission" element={<Admission />} />
          <Route path="/Visa" element={<Visa />} />
          <Route path="/Info" element={<Info />} />
          <Route path="/ReviewsPage" element={<ReviewsPage />} />
        </Routes>
        <FloatingCircle />
      </Router>
    </LanguageProvider>
  );
}

export default App;

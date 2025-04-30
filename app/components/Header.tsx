"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ContactPopup from './ContactPopup';

const Header: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#604D44]/20 backdrop-blur-md shadow-lg' 
          : 'bg-[#604D44]'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-48 py-3 sm:py-4">
        <div className="flex flex-row w-full">
          {/* Left: Inicio */}
          <div className="flex-1 flex justify-start">
            <Link href="/" className="no-underline text-white hover:text-gray-300 transition-colors duration-200 text-sm sm:text-base flex items-center gap-2">
              <i className="fas fa-home block sm:hidden"></i>
              <span className="hidden sm:inline">Inicio</span>
            </Link>
          </div>
          {/* Center: Contacto */}
          <div className="flex-1 flex justify-center">
            <button 
              onClick={() => setIsPopupVisible(true)}
              className="text-white hover:text-gray-300 transition-colors duration-200 text-xl sm:text-base"
              aria-label="Contacto"
            >
              <i className="fas fa-envelope block sm:hidden"></i>
              <span className="hidden sm:inline">Contacto</span>
            </button>
          </div>
          {/* Right: Instagram */}
          <div className="flex-1 flex justify-end">
            <a
              href="https://www.instagram.com/dental.start/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg sm:text-xl text-white no-underline hover:text-gray-300 transition-colors duration-200"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </nav>

      {isPopupVisible && (
        <ContactPopup onClose={() => setIsPopupVisible(false)} />
      )}
    </header>
  );
};

export default Header;
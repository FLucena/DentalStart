"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ContactPopup from './components/ContactPopup';
import { usePopupSession } from './hooks/usePopupSession';

export default function HomePage() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const shouldShowPopup = usePopupSession();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsPopupVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (shouldShowPopup) {
      setIsPopupVisible(true);
    }
  }, [shouldShowPopup]);

  const openPopup = () => {
    setIsPopupVisible(true);
  };

  return (
    <div className="min-h-screen bg-[#D8CEC6]">
      {/* Hero Section */}
      <section className="relative py-28 min-h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D8CEC6] via-[#D8CEC6]/90 to-[#D8CEC6]/80 z-0"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#2D3748] mb-4 md:mb-6 animate-fade-in">
            Dental Start
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-[#4A5568] mb-6 md:mb-8 animate-fade-in-up">
            Tu sonrisa es tu mejor accesorio
          </p>
          <div className="mt-6 md:mt-8 animate-fade-in-up">
            <Image 
              src="/logo-hd.png" 
              alt="Logo" 
              width={600} 
              height={600}
              priority
              className="mx-auto w-[300px] sm:w-[400px] md:w-[600px] transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <button 
            onClick={openPopup}
            className="mt-6 md:mt-8 inline-block px-6 sm:px-8 py-2 sm:py-3 bg-[#2D3748] text-white rounded-xl font-semibold hover:bg-[#1A202C] transition-all duration-300 hover:shadow-lg animate-fade-in-up text-sm sm:text-base"
          >
            Solicitar Consulta
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#2D3748] mb-8 sm:mb-10 md:mb-12">
            Nuestros Servicios
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              { icon: "🦷", title: "ODONTOLOGÍA GENERAL", description: "La odontología general se enfoca en la prevención, diagnóstico y tratamiento de los problemas dentales comunes. Ofrecemos limpiezas, revisiones regulares, empastes y tratamientos para enfermedades de las encías." },
              { icon: "😊", title: "ODONTOLOGÍA ESTÉTICA Y PRÓTESIS", description: "Nos especializamos en mejorar la apariencia de tu sonrisa con tratamientos de odontología estética. Esto incluye blanqueamientos dentales, carillas y prótesis dentales." },
              { icon: "💉", title: "IMPLANTES DENTALES", description: "Los implantes dentales son una solución efectiva para reemplazar dientes perdidos. Utilizamos implantes de titanio para anclar nuevas coronas, proporcionando una apariencia natural." },
              { icon: "👩‍⚕️", title: "CIRUGÍA MAXILOFACIAL", description: "La cirugía maxilofacial abarca una variedad de procedimientos para corregir problemas de la mandíbula, los huesos faciales y los tejidos blandos." },
              { icon: "😄", title: "ORTODONCIA Y ORTOPEDIA", description: "Ofrecemos tratamientos de ortodoncia para alinear dientes y mejorar la mordida. La ortopedia maxilar ayuda a corregir problemas en el desarrollo de los huesos faciales." },
              { icon: "🧑‍⚕️", title: "ENDODONCIA MECANIZADA", description: "La endodoncia mecanizada se encarga de tratar los conductos radiculares de los dientes afectados por infecciones o lesiones." },
              { icon: "😁", title: "PERIODONCIA", description: "La periodoncia se centra en el tratamiento y prevención de enfermedades de las encías. Ofrecemos limpiezas profundas y tratamientos especializados." },
              { icon: "😃", title: "BRUXISMO", description: "El bruxismo es el hábito de rechinar o apretar los dientes. Ofrecemos diagnósticos y tratamientos, incluyendo férulas oclusales." },
              { icon: "☀️", title: "BLANQUEAMIENTO", description: "Ofrecemos tratamientos de blanqueamiento dental para eliminar manchas y mejorar el color de tus dientes de manera segura y efectiva." }
            ].map((service, index) => (
              <div 
                key={index}
                className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{service.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-[#2D3748] mb-2 sm:mb-4">{service.title}</h3>
                <p className="text-sm sm:text-base text-[#4A5568]">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#2D3748] mb-8 sm:mb-10 md:mb-12">
            Nuestra Ubicación
          </h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.954509274732!2d-58.4206711!3d-34.6200161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccbf01a506d3d%3A0x5bb53fae93e05a65!2sAv.%20Boedo%20414%2C%20CABA!5e0!3m2!1ses!2sar!4v1694710365547!5m2!1ses!2sar"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[300px] sm:h-[400px] md:h-[450px]"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              onTouchStart={(e) => e.preventDefault()}
              onTouchMove={(e) => e.preventDefault()}
            ></iframe>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50">
        <a
          href="https://api.whatsapp.com/send?phone=541154670433"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-lg hover:bg-[#128C7E] transition-all duration-300 flex items-center justify-center transform hover:scale-110"
        >
          <i className="fab fa-whatsapp text-white text-2xl sm:text-3xl"></i>
        </a>
      </div>

      {/* Contact Popup */}
      {isPopupVisible && (
        <ContactPopup onClose={() => setIsPopupVisible(false)} />
      )}
    </div>
  );
}
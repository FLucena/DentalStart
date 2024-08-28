"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ContactPopup from './components/ContactPopup';

export default function HomePage() {
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const popupRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E2DBD4] via-[#D9CFC6] to-[#BFAF9E] text-[#725A56]">
      {/* Main Content */}
      <main className="pt-24 text-center">
        <h1 className="text-6xl font-bold">Dental Start</h1>
        <p className="text-2xl mt-4">Tu sonrisa es tu mejor accesorio.</p>

        {/* Centrado del logo */}
        <div className="mt-8 flex justify-center">
          <Image src="/logo-hd.png" alt="Logo" width={600} height={600} />
        </div>

        <Link href="/contacto" className="text-xl mt-4 block text-[#141312] hover:text-[#887867] transition-colors duration-300">
          Ver más...
        </Link>

        {/* Prestaciones */}
        <section className="my-10 p-8 bg-[#e2dbd6] text-center shadow-md rounded-lg">
          <h2 className="text-4xl font-bold mb-6">Prestaciones</h2>
          <ul className="list-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-lg">
            <li className="relative flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
              <div className="text-4xl text-[#725A56] mb-4">🦷</div>
              <h3 className="text-xl font-semibold">ODONTOLOGÍA GENERAL</h3>
              <div className="description max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-in-out py-2">
                La odontología general se enfoca en la prevención, diagnóstico y tratamiento de los problemas dentales comunes. Ofrecemos limpiezas, revisiones regulares, empastes y tratamientos para enfermedades de las encías. Nuestra prioridad es mantener la salud oral y prevenir futuras complicaciones.
              </div>
            </li>
            <li className="relative flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
              <div className="text-4xl text-[#725A56] mb-4">😊</div>
              <h3 className="text-xl font-semibold">ODONTOLOGÍA ESTÉTICA Y PRÓTESIS</h3>
              <div className="description max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-in-out py-2">
                Nos especializamos en mejorar la apariencia de tu sonrisa con tratamientos de odontología estética. Esto incluye blanqueamientos dentales, carillas y prótesis dentales para restaurar dientes dañados o ausentes, mejorando tanto la estética como la funcionalidad.
              </div>
            </li>
            <li className="relative flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
              <div className="text-4xl text-[#725A56] mb-4">💉</div>
              <h3 className="text-xl font-semibold">IMPLANTES DENTALES</h3>
              <div className="description max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-in-out py-2">
                Los implantes dentales son una solución efectiva para reemplazar dientes perdidos. Utilizamos implantes de titanio para anclar nuevas coronas, proporcionando una apariencia natural y una funcionalidad duradera. Es una excelente opción para restaurar la confianza en tu sonrisa.
              </div>
            </li>
            <li className="relative flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
              <div className="text-4xl text-[#725A56] mb-4">👩‍⚕️</div>
              <h3 className="text-xl font-semibold">CIRUGÍA MAXILOFACIAL</h3>
              <div className="description max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-in-out py-2">
                La cirugía maxilofacial abarca una variedad de procedimientos para corregir problemas de la mandíbula, los huesos faciales y los tejidos blandos. Esto incluye la extracción de muelas del juicio, la corrección de malformaciones y tratamientos quirúrgicos para traumatismos faciales.
              </div>
            </li>
            <li className="relative flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
              <div className="text-4xl text-[#725A56] mb-4">😄</div>
              <h3 className="text-xl font-semibold">ORTODONCIA Y ORTOPEDIA DE LOS MAXILARES</h3>
              <div className="description max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-in-out py-2">
                Ofrecemos tratamientos de ortodoncia para alinear dientes y mejorar la mordida. La ortopedia maxilar ayuda a corregir problemas en el desarrollo de los huesos faciales, facilitando una correcta alineación dental y una sonrisa más armoniosa.
              </div>
            </li>
            <li className="relative flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
              <div className="text-4xl text-[#725A56] mb-4">🧑‍⚕️</div>
              <h3 className="text-xl font-semibold">ENDODONCIA MECANIZADA</h3>
              <div className="description max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-in-out py-2">
                La endodoncia mecanizada se encarga de tratar los conductos radiculares de los dientes afectados por infecciones o lesiones. Utilizamos tecnología avanzada para limpiar, desinfectar y sellar el conducto, aliviando el dolor y preservando el diente.
              </div>
            </li>
            <li className="relative flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
              <div className="text-4xl text-[#725A56] mb-4">😁</div>
              <h3 className="text-xl font-semibold">PERIODONCIA</h3>
              <div className="description max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-in-out py-2">
                La periodoncia se centra en el tratamiento y prevención de enfermedades de las encías. Ofrecemos limpiezas profundas, tratamientos para la gingivitis y periodontitis, y educación sobre cuidados para mantener encías saludables.
              </div>
            </li>
            <li className="relative flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
              <div className="text-4xl text-[#725A56] mb-4">😃</div>
              <h3 className="text-xl font-semibold">BRUXISMO</h3>
              <div className="description max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-in-out py-2">
                El bruxismo es el hábito de rechinar o apretar los dientes, que puede causar desgaste dental y dolor mandibular. Ofrecemos diagnósticos y tratamientos, incluyendo férulas oclusales para aliviar los síntomas y proteger los dientes.
              </div>
            </li>
            <li className="relative flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
              <div className="text-4xl text-[#725A56] mb-4">☀️</div>
              <h3 className="text-xl font-semibold">BLANQUEAMIENTO</h3>
              <div className="description max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-in-out py-2">
                Ofrecemos tratamientos de blanqueamiento dental para eliminar manchas y mejorar el color de tus dientes. Utilizamos métodos seguros y efectivos para lograr una sonrisa más brillante y natural.
              </div>
            </li>
          </ul>
        </section>
        
         {/* Popup */}
        {isPopupVisible && (
          <div 
            className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50" 
            onClick={() => setIsPopupVisible(false)}
          >
            <div
              ref={popupRef}
              className="bg-white p-4 rounded-lg shadow-lg max-w-xs w-full max-h-[70vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()} // Evita que el click dentro del popup cierre el popup
            >
              <ContactPopup onClose={() => setIsPopupVisible(false)} />
            </div>
          </div>
        )}

        {/* Mapa */}
        <section className="my-10">
          <h2 className="text-4xl font-bold text-center mb-6">Dónde estamos</h2>
          <address className='mb-6' property="direccion" typeof="direccion">
            <p>
              <span property="direccionCalle">Av. Boedo 414</span>,
              <span property="addressLocality">CABA</span>,
            </p>
            <p>
              <span property="codigoPostal">CP 1212</span>,
              <span property="direccionProvincia">Buenos Aires</span>
              <span property="direccionPais">Argentina</span>
            </p>
          </address>
          <div className="flex justify-center pb-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.471566356928!2d-58.418839049104804!3d-34.61752168036007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccaf802af37a3%3A0x39cbc6406794b48f!2sAv.%20Boedo%20414%2C%20C1212%20CABA!5e0!3m2!1sen!2sar!4v1675047046693!5m2!1sen!2sar"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </main>
    </div>
  );
}
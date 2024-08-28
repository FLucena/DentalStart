"use client";
import React, { useState, useEffect, useRef } from 'react';

interface ContactPopupProps {
  onClose: () => void; // Función que se llama para cerrar el popup
}

const ContactPopup: React.FC<ContactPopupProps> = ({ onClose }) => {
  const [form, setForm] = useState({
    nombre: "",
    celular: "",
    motivo: "",
    dias: [] as string[],
    horarios: [] as string[],
  });
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true); // Para controlar la animación de desvanecimiento

  // Referencia al contenedor del popup
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(true);
    const timer = setTimeout(() => setIsAnimating(false), 300); // Tiempo de animación
    
    // Función para manejar clics fuera del popup
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose(); // Llama a la función de cierre recibida como parámetro
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === "select-multiple") {
      const selectElement = e.target as HTMLSelectElement;
      const values = Array.from(selectElement.selectedOptions).map(option => option.value);
      setForm(prevForm => ({ ...prevForm, [name]: values }));
    } else {
      setForm(prevForm => ({ ...prevForm, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch('./api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form), // Send the form data to the API route
      });
  
      const result = await response.json(); // Get the response from the API route
      console.log(result.message);
      if (result.message === 'Datos guardados con éxito') {
        setMessage('Gracias por tu mensaje. Te contactaremos pronto.');
        setForm({
          nombre: '',
          celular: '',
          motivo: '',
          dias: [],
          horarios: [],
        });
      } else {
        setMessage('Hubo un error al enviar el formulario. Intenta nuevamente y asegúrate de completar todos los campos.');
      }
    } catch (error) {
      console.error('Error al enviar el formulario', error);
      setMessage('Hubo un error al enviar el formulario. Intenta nuevamente.');
    }
  };
  

  return (
    <>
      {isOpen && (
        <div
          ref={popupRef}
          className={`fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full max-h-[60vh] overflow-y-auto relative">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <i className="fa fa-times text-lg"></i>
            </button>
            <h2 className="text-xl font-extrabold mb-4 text-center text-gray-800">Contáctanos</h2>
            <p className="mb-4 text-center text-gray-600">Nos encantaría escucharte! Por favor envíanos un mensaje.</p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
                name="nombre"
                value={form.nombre}
                onChange={handleInputChange}
                placeholder="Nombre"
                maxLength={30}
              />
              <input
                type="text"
                className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
                name="celular"
                value={form.celular}
                onChange={handleInputChange}
                placeholder="Celular"
                maxLength={15}
              />
              <textarea
                name="motivo"
                className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
                value={form.motivo}
                onChange={handleInputChange}
                rows={3}
                placeholder="Motivo de la consulta"
                spellCheck="false"
              />
              <div className="flex justify-center">
                <select
                  name="dias"
                  className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition overflow-y-auto"
                  multiple
                  value={form.dias}
                  onChange={handleInputChange}
                  size={6}
                >
                  <option value="Lunes">Lunes</option>
                  <option value="Martes">Martes</option>
                  <option value="Miércoles">Miércoles</option>
                  <option value="Jueves">Jueves</option>
                  <option value="Viernes">Viernes</option>
                  <option value="Sábado">Sábado</option>
                </select>
              </div>

              <div className="flex justify-center">
                <select
                  name="horarios"
                  className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition overflow-y-auto"
                  multiple
                  value={form.horarios}
                  onChange={handleInputChange}
                  size={3}
                >
                  <option value="Mañana">Mañana</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noche">Noche</option>
                </select>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                Enviar
              </button>
            </form>
            {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default ContactPopup;
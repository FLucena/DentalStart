"use client";
import React, { useState, useEffect, useRef } from 'react';

interface ContactPopupProps {
  onClose: () => void;
  onReady?: () => void;
}

const ContactPopup: React.FC<ContactPopupProps> = ({ onClose, onReady }) => {
  const [form, setForm] = useState({
    nombre: "",
    celular: "",
    motivo: "",
    dias: [] as string[],
    horarios: [] as string[],
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    if (onReady) onReady();
    
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose, onReady]);

  const formatPhoneNumber = (value: string): string => {
    // Remove all non-digit characters
    const numbers = value.replace(/\D/g, '');
    
    // Format the number with proper spacing
    if (numbers.length > 0) {
      return numbers.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    }
    
    return numbers;
  };

  const validatePhoneNumber = (value: string): boolean => {
    // Remove all non-digit characters
    const numbers = value.replace(/\D/g, '');
    
    // Check if the number has at least 10 digits (minimum for a valid phone number)
    const isValid = numbers.length >= 10;
    
    if (!isValid) {
      setPhoneError("Por favor ingresa un número de teléfono válido (mínimo 10 dígitos)");
    } else {
      setPhoneError("");
    }
    
    return isValid;
  };

  const handleCheckboxChange = (group: 'dias' | 'horarios') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setForm(prevForm => {
      const updated = checked
        ? [...prevForm[group], value]
        : prevForm[group].filter((item: string) => item !== value);
      return { ...prevForm, [group]: updated };
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (name === 'celular') {
      const formattedValue = formatPhoneNumber(value);
      setForm(prevForm => ({ ...prevForm, [name]: formattedValue }));
      validatePhoneNumber(formattedValue);
    } else if (type === "select-multiple") {
      const selectElement = e.target as HTMLSelectElement;
      const values = Array.from(selectElement.selectedOptions).map(option => option.value);
      setForm(prevForm => ({ ...prevForm, [name]: values }));
    } else {
      setForm(prevForm => ({ ...prevForm, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Remove all non-digit characters before validation and submission
    const digitsOnlyCelular = form.celular.replace(/\D/g, '');
    if (!validatePhoneNumber(digitsOnlyCelular)) {
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch('./api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...form, celular: digitsOnlyCelular }),
      });

      const result = await response.json();
      if (result.message === 'Datos guardados con éxito') {
        setMessage('Gracias por tu mensaje. Te contactaremos pronto.');
        setForm({
          nombre: '',
          celular: '',
          motivo: '',
          dias: [],
          horarios: [],
        });
        setIsFormSubmitted(true);
      } else {
        setMessage('Hubo un error al enviar el formulario. Intenta nuevamente y asegúrate de completar todos los campos.');
      }
    } catch (error) {
      console.error('Error al enviar el formulario', error);
      setMessage('Hubo un error al enviar el formulario. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Add a loading state for the popup content
  if (!isMounted) {
    return (
      <div className="fixed inset-0 bg-[#D8CEC6]/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#2D3748] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#D8CEC6]/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div 
        ref={popupRef}
        className="bg-white rounded-2xl shadow-xl max-w-sm w-auto mx-4 my-8 scale-100 opacity-100 transform transition-all duration-300 max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#D8CEC6] to-[#2D3748] rounded-t-2xl"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#2D3748] hover:text-[#1A202C] transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#2D3748] mb-2">Contáctanos</h2>
            <p className="text-[#4A5568]">Nos encantaría escucharte! Por favor envíanos un mensaje.</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#2D3748] border-t-transparent"></div>
            </div>
          ) : isFormSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#D8CEC6]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#2D3748]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-[#2D3748] text-lg">{message}</p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-[#D8CEC6] rounded-xl focus:ring-2 focus:ring-[#2D3748] focus:border-transparent outline-none transition-all duration-200"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleInputChange}
                    placeholder=" "
                    maxLength={30}
                    required
                  />
                  <label className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-[#4A5568] transition-all duration-200">
                    Nombre
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2D3748] focus:border-transparent outline-none transition-all duration-200 ${
                      phoneError ? 'border-red-500' : 'border-[#D8CEC6]'
                    }`}
                    name="celular"
                    value={form.celular}
                    onChange={handleInputChange}
                    placeholder=" "
                    maxLength={15}
                    required
                  />
                  <label className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-[#4A5568] transition-all duration-200">
                    Celular
                  </label>
                  {phoneError && (
                    <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                  )}
                </div>

                <div className="relative">
                  <textarea
                    name="motivo"
                    className="w-full px-4 py-3 border border-[#D8CEC6] rounded-xl focus:ring-2 focus:ring-[#2D3748] focus:border-transparent outline-none transition-all duration-200"
                    value={form.motivo}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder=" "
                    spellCheck="false"
                    required
                  />
                  <label className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-[#4A5568] transition-all duration-200">
                    Motivo de la consulta
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-[#2D3748]">Días disponibles</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map((day) => (
                    <label
                      key={day}
                      className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                        form.dias.includes(day)
                          ? 'bg-[#D8CEC6]/20 border-[#2D3748] shadow-sm'
                          : 'bg-white border-[#D8CEC6] hover:border-[#2D3748]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={day}
                        checked={form.dias.includes(day)}
                        onChange={handleCheckboxChange('dias')}
                        className="hidden"
                      />
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors duration-200 ${
                        form.dias.includes(day)
                          ? 'bg-[#2D3748] border-[#2D3748]'
                          : 'border-[#D8CEC6]'
                      }`}>
                        {form.dias.includes(day) && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-[#2D3748]">{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-[#2D3748]">Turnos disponibles</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Mañana', 'Tarde'].map((horario) => (
                    <label
                      key={horario}
                      className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                        form.horarios.includes(horario)
                          ? 'bg-[#D8CEC6]/20 border-[#2D3748] shadow-sm'
                          : 'bg-white border-[#D8CEC6] hover:border-[#2D3748]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={horario}
                        checked={form.horarios.includes(horario)}
                        onChange={handleCheckboxChange('horarios')}
                        className="hidden"
                      />
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors duration-200 ${
                        form.horarios.includes(horario)
                          ? 'bg-[#2D3748] border-[#2D3748]'
                          : 'border-[#D8CEC6]'
                      }`}>
                        {form.horarios.includes(horario) && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-[#2D3748]">{horario}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button 
                className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 ${
                  phoneError || form.dias.length === 0
                    ? 'bg-[#D8CEC6] cursor-not-allowed'
                    : 'bg-[#2D3748] hover:bg-[#1A202C] hover:shadow-lg'
                }`}
                disabled={!!phoneError || form.dias.length === 0}
              >
                Enviar
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;
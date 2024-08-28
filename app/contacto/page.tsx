"use client";
import { useState } from 'react';
import Image from "next/image";

export default function ContactPage() {
  const [form, setForm] = useState({
    nombre: "",
    celular: "",
    motivo: "",
    dias: [] as string[],
    horarios: [] as string[],
  });
  const [message, setMessage] = useState("");

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
        body: JSON.stringify(form), 
      });
  
      const result = await response.json(); 
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
      <div className="pt-[calc(4rem+10vh)] md:pt-[calc(5rem+10vh)] text-center">
        <div className="bg-gray-100 p-8 rounded-lg shadow-md max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">Contáctanos</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              name="nombre"
              value={form.nombre}
              onChange={handleInputChange}
              placeholder="Nombre"
              maxLength={30}
              required
            />
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              name="celular"
              value={form.celular}
              onChange={handleInputChange}
              placeholder="Celular"
              maxLength={15}
              required
            />
            <textarea
              name="motivo"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={form.motivo}
              onChange={handleInputChange}
              rows={3}
              placeholder="Motivo de la consulta"
              required
            />
            <div className="flex flex-col">
              <label className="mb-2">Días Disponibles</label>
              <select
                name="dias"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                multiple
                value={form.dias}
                onChange={handleInputChange}
                required
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
            <div className="flex flex-col">
              <label className="mb-2">Horarios Disponibles</label>
              <select
                name="horarios"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                multiple
                value={form.horarios}
                onChange={handleInputChange}
                required
                size={3}
              >
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
                <option value="Noche">Noche</option>
              </select>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Enviar
            </button>
          </form>
          {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
        </div>
      </div>
    </>
  );
}
"use client";
import Image from "next/image";
import { useState } from "react";

const ContactPage = () => {
  const [form, setForm] = useState({
    nombre: "",
    celular: "",
    motivo: "",
    dias: [],
    horarios: [],
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
  
    if (type === "select-multiple") {
      // Assert the target as an HTMLSelectElement
      const selectElement = e.target as HTMLSelectElement;
      const values = Array.from(selectElement.selectedOptions).map(option => option.value);
      setForm({ ...form, [name]: values });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Google Apps Script Web App URL
    const scriptURL = "YOUR_GOOGLE_APPS_SCRIPT_URL";

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.text();

      if (result === "Success") {
        setMessage("Gracias por tu mensaje. Te contactaremos pronto.");
        setForm({
          nombre: "",
          celular: "",
          motivo: "",
          dias: [],
          horarios: [],
        });
      } else {
        setMessage("Hubo un error al enviar el formulario. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al enviar el formulario", error);
      setMessage("Hubo un error al enviar el formulario. Intenta nuevamente.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen my-20">

      {/* Main Content */}
      <main className="flex-grow bg-gray-50 p-6 flex items-center justify-center">
        <section className="bg-white shadow-md rounded-2xl p-8 max-w-xl w-full">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Contáctanos</h2>
          <p className="mb-6 text-center text-gray-600">Nos encantaría escucharte! Por favor envíanos un mensaje.</p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
              name="nombre"
              value={form.nombre}
              onChange={handleInputChange}
              placeholder="Nombre"
              maxLength={30}
            />
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
              name="celular"
              value={form.celular}
              onChange={handleInputChange}
              placeholder="Celular"
              maxLength={15}
            />
            <textarea
              name="motivo"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
              value={form.motivo}
              onChange={handleInputChange}
              rows={4}
              placeholder="Motivo de la consulta"
              spellCheck="false"
            />
            <select
              name="dias"
              className="w-full h-50 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition overflow-y-auto"
              multiple
              value={form.dias}
              onChange={handleInputChange}
              size={6}
            >
              <option className="p-2 hover:bg-gray-200" value="Lunes">Lunes</option>
              <option className="p-2 hover:bg-gray-200" value="Martes">Martes</option>
              <option className="p-2 hover:bg-gray-200" value="Miércoles">Miércoles</option>
              <option className="p-2 hover:bg-gray-200" value="Jueves">Jueves</option>
              <option className="p-2 hover:bg-gray-200" value="Viernes">Viernes</option>
              <option className="p-2 hover:bg-gray-200" value="Sábado">Sábado</option>
            </select>

            <select
              name="horarios"
              className="w-full h-34 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition overflow-y-auto"
              multiple
              value={form.horarios}
              onChange={handleInputChange}
            >
              <option value="Mañana" className="p-2 hover:bg-gray-200">Mañana</option>
              <option value="Tarde" className="p-2 hover:bg-gray-200">Tarde</option>
              <option value="Noche" className="p-2 hover:bg-gray-200">Noche</option>
            </select>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Enviar
            </button>
          </form>
          {message && <div className="mt-6 text-center text-green-500">{message}</div>}
        </section>
        <div className="px-36 flex items-center justify-center">
          <Image
            className=""
            src="/logo-hd.png"
            alt="logo"
            width={300}
            height={300}
          />
        </div>
      </main>

      {/* WhatsApp Button */}
      <a
        className="fixed bottom-10 right-10 bg-green-500 text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg"
        href="https://api.whatsapp.com/send?phone=54111554670433"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa fa-whatsapp"></i>
      </a>
    </div>
  );
};

export default ContactPage;
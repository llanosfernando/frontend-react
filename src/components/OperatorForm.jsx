import React, { useState } from "react";
import { getOperador } from "../api/reportes"; // usamos la nueva API

const ConsultaOperador = () => {
  const [codigoOperador, setCodigoOperador] = useState("");
  const [datosOperador, setDatosOperador] = useState(null);
  const [error, setError] = useState("");

  // Función para consultar el operador
  const consultarOperador = async () => {
    const codigo = codigoOperador.trim();

    // Validar que el código no esté vacío
    if (!codigo) {
      setError("⚠️ Debes ingresar un código de operador válido.");
      setDatosOperador(null);
      return;
    }

    // Consultar el operador
    try {
      const data = await getOperador(codigo);

      setDatosOperador({
        foto: data.foto,
        nombre: data.nombres,
        apellido: data.apellidos,
        cedula: data.cedula,
        cargo: data.cargo,
      });

    
      setError(""); // Limpia el error si todo sale bien
    } catch (error) {
      setError("❌ No se encontró el operador.");
      setDatosOperador(null);
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Consultar Operador</h2>

      <input
        type="text"
        placeholder="Código del operador"
        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
        value={codigoOperador}
        onChange={(e) => setCodigoOperador(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            consultarOperador();
          }
        }}
      />

      <button
        onClick={consultarOperador}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md"
      >
        Consultar
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {datosOperador && (
        <div className="mt-4 p-3 border rounded-md bg-gray-50">
          <img
            src={datosOperador.foto}
            alt="Foto del operador"
            className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"
          />
          <p><strong>Nombre:</strong> {datosOperador.nombre} {datosOperador.apellido}</p>
          <p><strong>Cédula:</strong> {datosOperador.cedula}</p>
          <p><strong>Cargo:</strong> {datosOperador.cargo}</p>
        </div>
      )}
    </div>
  );
};

export default ConsultaOperador;

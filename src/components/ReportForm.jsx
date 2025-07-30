import { useState } from "react"
import OperatorForm from "./OperatorForm"
import BusForm from "./BusForm"

export default function ReportForm() {
  const [type, setType] = useState("") // "Operador" o "Bus"
  const [subType, setSubType] = useState("") // Si eligió "Bus", se elige aquí si es de operador o solo bus

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 space-y-6 animate-fade-in">
      <h1 className="text-xl font-bold mb-4">Registrar Novedad</h1>

      {/* Desplegable principal */}
      <div>
        <label className="block font-medium mb-1">Tipo de novedad</label>
        <select
          className="w-full border border-gray-300 p-2 rounded"
          value={type}
          onChange={(e) => {
            setType(e.target.value)
            setSubType("")
          }}
        >
          <option value="">Selecciona una opción</option>
          <option value="Operador">Operador</option>
          <option value="Bus">Bus</option>
        </select>
      </div>

      {/* Si eligió "Bus", mostrar subdesplegable */}
      {type === "Bus" && (
        <div>
          <label className="block font-medium mb-1">¿Novedad del operador o del bus?</label>
          <select
            className="w-full border border-gray-300 p-2 rounded"
            value={subType}
            onChange={(e) => setSubType(e.target.value)}
          >
            <option value="">Selecciona una opción</option>
            <option value="Operador">Operador</option>
            <option value="Bus">Bus</option>
          </select>
        </div>
      )}

      {/* Mostrar el formulario correcto según selección */}
      {type === "Operador" && <OperatorForm />}
      {type === "Bus" && subType === "Operador" && <OperatorForm />}
      {type === "Bus" && subType === "Bus" && <BusForm />}
    </div>
  )
}

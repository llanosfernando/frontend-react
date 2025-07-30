import { useState } from "react"
import OperatorForm from "../components/OperatorForm"
import BusForm from "../components/BusForm"

export default function ReportForm() {
  const [tipoNovedad, setTipoNovedad] = useState("") // 'Operador' o 'Bus'
  const [subTipo, setSubTipo] = useState("") // subcategoría: 'Operador' o 'Bus' dentro de 'Bus'

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Reporte de Novedades</h1>

      <div>
        <label className="block font-medium">Tipo de novedad</label>
        <select
          className="w-full border p-2 rounded"
          value={tipoNovedad}
          onChange={(e) => {
            setTipoNovedad(e.target.value)
            setSubTipo("") // limpiar subTipo al cambiar tipoNovedad
          }}
        >
          <option value="">Seleccionar</option>
          <option value="Operador">Operador</option>
          <option value="Bus">Bus</option>
        </select>
      </div>

      {/* Si se elige "Bus", aparece el segundo select */}
      {tipoNovedad === "Bus" && (
        <div>
          <label className="block font-medium">¿La novedad es sobre el bus o un operador relacionado?</label>
          <select
            className="w-full border p-2 rounded"
            value={subTipo}
            onChange={(e) => setSubTipo(e.target.value)}
          >
            <option value="">Seleccionar</option>
            <option value="Bus">Bus</option>
            <option value="Operador">Operador</option>
          </select>
        </div>
      )}

      {/* Mostrar formulario adecuado */}
      {(tipoNovedad === "Operador" || subTipo === "Operador") && (
        <OperatorForm />
      )}

      {subTipo === "Bus" && (
        <BusForm />
      )}
    </div>
  )
}

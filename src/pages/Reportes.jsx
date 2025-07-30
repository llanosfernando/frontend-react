import { useState } from "react"
import OperatorForm from "../components/OperatorForm"

export default function ReportPage() {
  const [tipoPrincipal, setTipoPrincipal] = useState("") // "Operador" o "Bus"
  const [tipoSecundario, setTipoSecundario] = useState("")

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Formulario de Novedades</h1>

      <div>
        <label className="block font-medium">¿La novedad es de?</label>
        <select
          className="w-full border p-2 rounded"
          value={tipoPrincipal}
          onChange={(e) => {
            setTipoPrincipal(e.target.value)
            setTipoSecundario("")
          }}
        >
          <option value="">-- Seleccione --</option>
          <option value="Operador">Operador</option>
          <option value="Bus">Bus</option>
        </select>
      </div>

      {tipoPrincipal === "Bus" && (
        <div>
          <label className="block font-medium">¿A qué se refiere?</label>
          <select
            className="w-full border p-2 rounded"
            value={tipoSecundario}
            onChange={(e) => setTipoSecundario(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            <option value="Operador">Operador</option>
            <option value="Bus">Bus</option>
          </select>
        </div>
      )}

      {((tipoPrincipal === "Operador") || (tipoPrincipal === "Bus" && tipoSecundario === "Operador")) && (
        <OperatorForm />
      )}

      {tipoPrincipal === "Bus" && tipoSecundario === "Bus" && (
        <div className="p-4 border rounded">
          <h2 className="font-semibold">Formulario para reporte de Bus (sin operador)</h2>
          {/* Aquí puedes agregar tu otro formulario para cuando solo se reporta el bus */}
        </div>
      )}
    </div>
  )
}

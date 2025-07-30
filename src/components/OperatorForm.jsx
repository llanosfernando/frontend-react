import { useState } from "react"
import OperatorInfo from "./OperatorInfo"

export default function OperatorForm() {
  const [codigoOperador, setCodigoOperador] = useState("")
  const [codigoBus, setCodigoBus] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [datosOperador, setDatosOperador] = useState(null)

  const consultarOperador = () => {
    // 🔧 Más adelante se conectará al backend
    // Simulación de datos
    setDatosOperador({
      foto: "https://via.placeholder.com/100",
      nombre: "Luis Fernando",
      apellido: "Pérez Llanos",
      cedula: "123456789",
      cargo: "Conductor"
    })
  }

  const enviarNovedad = () => {
    // Acá más adelante conectas con el backend para guardar la novedad
    console.log("🚀 Novedad enviada:")
    console.log({
      codigoOperador,
      codigoBus,
      descripcion
    })
    alert("✅ Novedad registrada exitosamente")
    setCodigoOperador("")
    setCodigoBus("")
    setDescripcion("")
    setDatosOperador(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block font-medium">Código del operador</label>
        <div className="flex space-x-2">
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={codigoOperador}
            onChange={(e) => setCodigoOperador(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={consultarOperador}
          >
            Consultar
          </button>
        </div>
      </div>

      {datosOperador && (
        <>
          <OperatorInfo datos={datosOperador} />

          <div>
            <label className="block font-medium">Código del bus</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={codigoBus}
              onChange={(e) => setCodigoBus(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium">Descripción de la novedad</label>
            <textarea
              className="w-full border p-2 rounded"
              rows={4}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>
          </div>

          <button
            className="bg-green-600 text-white px-6 py-2 rounded mt-2"
            onClick={enviarNovedad}
          >
            Registrar Novedad
          </button>
        </>
      )}
    </div>
  )
}

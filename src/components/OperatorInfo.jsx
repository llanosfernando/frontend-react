export default function OperatorInfo({ datos }) {
  return (
    <div className="border rounded p-4 shadow bg-white space-y-2">
      <h3 className="text-lg font-semibold text-gray-700">Información del Operador</h3>
      <div className="flex items-center space-x-4">
        <img src={datos.foto} alt="Foto del operador" className="w-24 h-24 rounded-full border" />
        <div className="space-y-1">
          <p><strong>Nombre:</strong> {datos.nombre} {datos.apellido}</p>
          <p><strong>Cédula:</strong> {datos.cedula}</p>
          <p><strong>Cargo:</strong> {datos.cargo}</p>
        </div>
      </div>
    </div>
  )
}

export default function OperatorInfo({ datos }) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
      <div className="flex items-center space-x-4">
        <img
          src={datos.foto}
          alt="Foto del operador"
          className="w-24 h-24 object-cover rounded-full border border-gray-400"
        />
        <div>
          <p><strong>Nombre:</strong> {datos.nombre} {datos.apellido}</p>
          <p><strong>Cédula:</strong> {datos.cedula}</p>
          <p><strong>Cargo:</strong> {datos.cargo}</p>
        </div>
      </div>
    </div>
  )
}

import React from "react";



export default function OperadorTable({ data, loading, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            {Object.keys(data[0] || { nombre: "" }).map((key) => (
              <th key={key} className="p-3 border-b text-left font-semibold">
                {key}
              </th>
            ))}
            <th className="p-3 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {Object.keys(data[0] || { nombre: "" }).map((key) => (
                <td key={key}>{item[key]}</td>
              ))}
              <td>
                <button
                  onClick={() => onEdit(item)}
                  disabled={loading}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  disabled={loading}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {data.length === 0 && !loading && (
            <tr>
              <td colSpan="100%" className="p-4 text-center text-gray-500">
                No hay registros
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

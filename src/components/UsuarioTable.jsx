import React from "react";

export default function UsuarioTable({ data, loading, onEdit, onDelete, onShowPasswordForm, onChangeRol, view }) {
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
              {Object.keys(data[0] || { nombre: "", rol: "" }).map((key) => {
                if (key === 'rol' && view === 'usuarios') {
                  return (
                    <td key={key}>
                      <select
                        value={item.rol}
                        onChange={e => onChangeRol(item.id, e.target.value)}
                        disabled={loading}
                        className="px-2 py-1 rounded border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
                      >
                        <option value="usuario">Usuario</option>
                        <option value="admin">Admin</option>
                        <option value="superusuario">Superusuario</option>
                      </select>
                    </td>
                  );
                } else {
                  return <td key={key}>{item[key]}</td>;
                }
              })}
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
                {view === "usuarios" && (
                  <button
                    onClick={() => onShowPasswordForm(item.id)}
                    disabled={loading}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded"
                  >
                    Actualizar contraseña
                  </button>
                )}
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

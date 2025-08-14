import React, { useState } from "react";

export default function UsuarioTable({ data, loading, onEdit, onDelete, onShowPasswordForm, onChangeRol, onSave, view }) {
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleEditClick = (item) => {
    setEditingRow(item.id);
    setEditedData(item);
  };

  const handleInputChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  const handleSaveClick = () => {
    onSave(editedData);
    setEditingRow(null);
  };

  const handleCancelClick = () => {
    setEditingRow(null);
    setEditedData({});
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border-b text-left font-semibold">Nombre</th>
            <th className="p-3 border-b text-left font-semibold">Email</th>
            <th className="p-3 border-b text-left font-semibold">Rol</th>
            <th className="p-3 border-b text-left font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="p-3 border-b">
                {editingRow === item.id ? (
                  <input
                    type="text"
                    value={editedData.nombre || ""}
                    onChange={(e) => handleInputChange(e, "nombre")}
                    className="border p-2 rounded-lg w-full"
                  />
                ) : (
                  item.nombre
                )}
              </td>
              <td className="p-3 border-b">
                {editingRow === item.id ? (
                  <input
                    type="email"
                    value={editedData.email || ""}
                    onChange={(e) => handleInputChange(e, "email")}
                    className="border p-2 rounded-lg w-full"
                  />
                ) : (
                  item.email
                )}
              </td>
              <td className="p-3 border-b">
                {editingRow === item.id ? (
                  <select
                    value={editedData.rol || ""}
                    onChange={(e) => handleInputChange(e, "rol")}
                    className="border p-2 rounded-lg w-full"
                  >
                    <option value="usuario">Usuario</option>
                    <option value="admin">Admin</option>
                    <option value="superusuario">Superusuario</option>
                  </select>
                ) : (
                  item.rol
                )}
              </td>
              <td className="p-3 border-b">
                {editingRow === item.id ? (
                  <>
                    <button
                      onClick={handleSaveClick}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={handleCancelClick}
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(item)}
                      disabled={loading}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      disabled={loading}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
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
                  </>
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

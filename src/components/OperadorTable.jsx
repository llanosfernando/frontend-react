import React, { useState } from "react";

export default function OperadorTable({ data, loading, onEdit, onDelete, onSave }) {
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleEditClick = (item) => {
    setEditingRow(item.codigo);
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
            <th className="p-3 border-b text-left font-semibold">Código</th>
            <th className="p-3 border-b text-left font-semibold">Nombres</th>
            <th className="p-3 border-b text-left font-semibold">Apellidos</th>
            <th className="p-3 border-b text-left font-semibold">Cédula</th>
            <th className="p-3 border-b text-left font-semibold">Cargo</th>
            <th className="p-3 border-b text-left font-semibold">Foto</th>
            <th className="p-3 border-b text-left font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.codigo}>
              <td className="p-3 border-b">{item.codigo}</td>
              <td className="p-3 border-b">
                {editingRow === item.codigo ? (
                  <input
                    type="text"
                    value={editedData.nombres || ""}
                    onChange={(e) => handleInputChange(e, "nombres")}
                    className="border p-2 rounded-lg w-full"
                  />
                ) : (
                  item.nombres
                )}
              </td>
              <td className="p-3 border-b">
                {editingRow === item.codigo ? (
                  <input
                    type="text"
                    value={editedData.apellidos || ""}
                    onChange={(e) => handleInputChange(e, "apellidos")}
                    className="border p-2 rounded-lg w-full"
                  />
                ) : (
                  item.apellidos
                )}
              </td>
              <td className="p-3 border-b">
                {editingRow === item.codigo ? (
                  <input
                    type="text"
                    value={editedData.cedula || ""}
                    onChange={(e) => handleInputChange(e, "cedula")}
                    className="border p-2 rounded-lg w-full"
                  />
                ) : (
                  item.cedula
                )}
              </td>
              <td className="p-3 border-b">
                {editingRow === item.codigo ? (
                  <input
                    type="text"
                    value={editedData.cargo || ""}
                    onChange={(e) => handleInputChange(e, "cargo")}
                    className="border p-2 rounded-lg w-full"
                  />
                ) : (
                  item.cargo
                )}
              </td>
              <td className="p-3 border-b">
                {editingRow === item.codigo ? (
                  <input
                    type="text"
                    value={editedData.foto || ""}
                    onChange={(e) => handleInputChange(e, "foto")}
                    className="border p-2 rounded-lg w-full"
                  />
                ) : (
                  item.foto
                )}
              </td>
              <td className="p-3 border-b">
                {editingRow === item.codigo ? (
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
                      onClick={() => onDelete(item.codigo)}
                      disabled={loading}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Eliminar
                    </button>
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

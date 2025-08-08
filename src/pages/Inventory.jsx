import { useEffect, useState } from "react";
import { getInventario, createItem, updateItem, deleteItem } from "../api/Inventory";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ nombre: "", cantidad: "" });
  const [editId, setEditId] = useState(null);

  // Cargar inventario al montar
  useEffect(() => {
    cargarInventario();
  }, []);

  const cargarInventario = async () => {
    const data = await getInventario();
    setItems(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateItem(editId, formData);
    } else {
      await createItem(formData);
    }
    setFormData({ nombre: "", cantidad: "" });
    setEditId(null);
    cargarInventario();
  };

  const handleEdit = (item) => {
    setFormData({ nombre: item.nombre, cantidad: item.cantidad });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    cargarInventario();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventario</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          className="border p-2 rounded w-1/3"
          required
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={formData.cantidad}
          onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
          className="border p-2 rounded w-1/3"
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {editId ? "Actualizar" : "Agregar"}
        </button>
      </form>

      {/* Tabla */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Cantidad</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.id}</td>
                <td className="border p-2">{item.nombre}</td>
                <td className="border p-2">{item.cantidad}</td>
                <td className="border p-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-400 px-2 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-2">
                No hay items
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

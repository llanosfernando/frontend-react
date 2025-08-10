// src/pages/Inventory.jsx
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  getOperadores,
  createOperador,
  updateOperador,
  deleteOperador,
} from "../api/Inventory";

export default function Inventory() {
  const [view, setView] = useState("usuarios");
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchData();
  }, [view]);

  const fetchData = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      setData(view === "usuarios" ? await getUsuarios() : await getOperadores());
    } catch (err) {
      setErrorMsg("Error cargando datos");
      toast.error("Error cargando datos");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || form.nombre.trim() === "") {
      toast.error("El nombre es obligatorio");
      return;
    }
    setLoading(true);
    try {
      if (view === "usuarios") {
        editingId ? await updateUsuario(editingId, form) : await createUsuario(form);
        toast.success(editingId ? "Usuario actualizado" : "Usuario creado");
      } else {
        editingId ? await updateOperador(editingId, form) : await createOperador(form);
        toast.success(editingId ? "Operador actualizado" : "Operador creado");
      }
      setForm({});
      setEditingId(null);
      fetchData();
    } catch (err) {
      toast.error(err.message || "Error guardando");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este registro?")) return;
    setLoading(true);
    try {
      view === "usuarios" ? await deleteUsuario(id) : await deleteOperador(id);
      toast.success("Registro eliminado");
      fetchData();
    } catch (err) {
      toast.error(err.message || "Error eliminando");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">📦 Inventory Manager</h1>

      {/* Botones de vista */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setView("usuarios")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            view === "usuarios" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Usuarios
        </button>
        <button
          onClick={() => setView("operadores")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            view === "operadores" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Operadores
        </button>
      </div>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-4 rounded-lg mb-6 flex flex-wrap gap-4"
      >
        {Object.keys(data[0] || { nombre: "" })
          .filter((key) => key !== "id")
          .map((key) => (
            <input
              key={key}
              placeholder={key}
              value={form[key] || ""}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="border p-2 rounded-lg flex-1 min-w-[200px]"
            />
          ))}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
        >
          {editingId ? "Actualizar" : "Crear"}
        </button>
      </form>

      {/* Tabla */}
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
              <tr key={item.id} className="hover:bg-gray-50">
                {Object.keys(item).map((key) => (
                  <td key={key} className="p-3 border-b">
                    {item[key]}
                  </td>
                ))}
                <td className="p-3 border-b flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-400 px-3 py-1 rounded-lg text-white hover:bg-yellow-500"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 px-3 py-1 rounded-lg text-white hover:bg-red-600"
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
    </div>
  );
}

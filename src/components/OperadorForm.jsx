// Formulario para crear/editar operadores
// Props:
// - initialForm: objeto con los valores iniciales del operador
// - onSubmit: función que se ejecuta al enviar el formulario
// - loading: estado de carga externo
// - editingId: id del operador que se está editando (si aplica)
import React from "react";
import useUsuarioForm from "../hooks/useUsuarioForm";

export default function OperadorForm({ initialForm, onSubmit, loading: parentLoading, editingId }) {
  // Usamos el hook personalizado
  const { form, setForm, loading, error, handleSubmit } = useUsuarioForm({ initialForm, onSubmit });

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow p-4 rounded-lg mb-6 flex flex-wrap gap-4"
    >
      {Object.keys(form)
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
        disabled={loading || parentLoading}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
      >
        {editingId ? "Actualizar" : "Crear"}
      </button>
      {error && <div className="w-full text-red-500 mt-2">{error}</div>}
    </form>
  );
}

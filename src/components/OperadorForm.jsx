// Formulario para crear/editar operadores
// Props:
// - initialForm: objeto con los valores iniciales del operador
// - onSubmit: función que se ejecuta al enviar el formulario
// - loading: estado de carga externo
// - editingId: id del operador que se está editando (si aplica)
import React from "react";
import useOperadorForm from "../hooks/useOperadorForm";

export default function OperadorForm({ initialForm, onSubmit, loading: parentLoading, editingId }) {
  // Usamos el hook personalizado
  const { form, setForm, loading, error, handleSubmit } = useOperadorForm({ initialForm, onSubmit });
 

  // Handler para el envío del formulario
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow p-4 rounded-lg mb-6 flex flex-wrap gap-4"
    >
      <input
        type="text"
        placeholder="Nombres"
        value={form.nombres || ""}
        onChange={(e) => {
          console.log("Valor actualizado de nombres:", e.target.value);
          setForm({ ...form, nombres: e.target.value });
        }}
        className="border p-2 rounded-lg flex-1 min-w-[200px]"
        required
      />
      <input
        type="text"
        placeholder="Apellidos"
        value={form.apellidos || ""}
        onChange={(e) => setForm({ ...form, apellidos: e.target.value })}
        className="border p-2 rounded-lg flex-1 min-w-[200px]"
        required
      />
      <input
        type="text"
        placeholder="Cédula"
        value={form.cedula || ""}
        onChange={(e) => setForm({ ...form, cedula: e.target.value })}
        className="border p-2 rounded-lg flex-1 min-w-[200px]"
        required
      />
      <input
        type="text"
        placeholder="Cargo"
        value={form.cargo || ""}
        onChange={(e) => setForm({ ...form, cargo: e.target.value })}
        className="border p-2 rounded-lg flex-1 min-w-[200px]"
        required
      />
      <input
        type="text"
        placeholder="Foto (opcional)"
        value={form.foto || ""}
        onChange={(e) => setForm({ ...form, foto: e.target.value })}
        className="border p-2 rounded-lg flex-1 min-w-[200px]"
      />
      <input
        type="text"
        placeholder="Código"
        value={form.codigo || ""}
        onChange={(e) => setForm({ ...form, codigo: e.target.value })}
        className="border p-2 rounded-lg flex-1 min-w-[200px]"
        required
      />
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

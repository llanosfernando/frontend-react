import React from "react";

export default function PasswordForm({ onSubmit, onCancel, value, onChange }) {
  return (
    <form onSubmit={onSubmit} className="bg-white shadow p-4 rounded-lg mb-6">
      <h3 className="text-xl font-semibold mb-4">Actualizar contraseña</h3>
      <input
        type="password"
        placeholder="Nueva contraseña"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="border p-2 rounded-lg flex-1 min-w-[200px] mb-4"
        required
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Actualizar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

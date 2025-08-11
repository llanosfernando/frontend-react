import React from "react";
import { ChevronDown } from "lucide-react";

export default function ViewSelector({ value, onChange }) {
  return (
    <div className="mb-6 relative w-64">
      <select
        value={value}
        onChange={onChange}
        className="w-full appearance-none px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
      >
        <option value="usuarios">👤 Usuarios</option>
        <option value="operadores">⚙️ Operadores</option>
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
    </div>
  );
}

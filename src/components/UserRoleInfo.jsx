import React from "react";

export default function UserRoleInfo({ role }) {
  if (!role) return null;
  return (
    <div className="mb-4 font-bold text-gray-700">
      Rol: {role}
    </div>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { logout, getToken } from "../api/auth";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Usa la función del módulo auth
    navigate("/"); // Redirigimos al login
  };

  // Obtenemos datos del usuario de manera segura
  let userData = null;
  try {
    const token = getToken();
    if (token) {
      userData = jwtDecode(token); // Usa jwt-decode consistentemente
    }
  } catch (err) {
    console.error("Error al decodificar token:", err);
    logout(); // Limpia token corrupto
  }

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="text-xl font-bold">
        Sistema de Novedades
      </div>

      <div className="flex space-x-4 items-center">
        <Link to="/home" className="hover:text-yellow-300">Inicio</Link>
        <Link to="/report" className="hover:text-yellow-300">Reportes</Link>
        <Link to="/inventory" className="hover:text-yellow-300">Inventario</Link>

        {userData && (
          <span className="mx-2 text-sm text-gray-300">
            {userData.email} ({userData.rol})
          </span>
        )}

        <button
          onClick={handleLogout}
          className="hover:text-yellow-300 focus:outline-none"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

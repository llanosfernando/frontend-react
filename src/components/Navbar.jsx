// src/components/Navbar.jsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="text-xl font-bold">Sistema de Novedades</div>
      <div className="flex space-x-4">
        <Link to="/home" className="hover:text-yellow-300">Inicio</Link>
        <Link to="/report" className="hover:text-yellow-300">Reportes</Link>
        <Link to="/inventory" className="hover:text-yellow-300">Inventario</Link>
        <Link to="/" className="hover:text-yellow-300">Salir</Link>
      </div>
    </nav>
  );
}

export default Navbar;

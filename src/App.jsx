import { Routes, Route, useLocation } from 'react-router-dom'// Asegúrate de tener react-router-dom instalado
import Login from './pages/Login.jsx'// Asegúrate de tener estas páginas
import Register from './pages/Register.jsx'// Asegúrate de tener estas páginas
import Home from './pages/Home.jsx'// Asegúrate de tener estas páginas
import Report from './pages/Reportes.jsx'// Asegúrate de tener estas páginas
import Inventory from './pages/Inventory.jsx' // Asegúrate de tener estas páginas
import Navbar from './components/Navbar.jsx'// Asegúrate de tener tu componente Navbar
import PrivateRoute from './routes/PrivateRoute.jsx'// Importa tu componente de rutas privadas

function App() {
  const location = useLocation()
  const hideNavbar = location.pathname === '/' || location.pathname === '/register'

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* ✅ Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/inventory" element={<Inventory />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

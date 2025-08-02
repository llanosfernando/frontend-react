import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import Report from './pages/Reportes.jsx'
import Inventory from './pages/Inventory.jsx'
import Navbar from './components/Navbar.jsx'
import PrivateRoute from './routes/PrivateRoute.jsx'

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

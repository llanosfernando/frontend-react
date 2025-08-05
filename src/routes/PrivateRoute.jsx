import { Navigate, Outlet } from 'react-router-dom'// Asegúrate de que react-router-dom esté instalado
import { jwtDecode } from 'jwt-decode'// Asegúrate de que jwt-decode esté instalado
import { getToken, clearToken } from '../api/auth' // Asegúrate de que estas funciones estén definidas en tu archivo auth.js

const PrivateRoute = () => {
  const token = getToken()

  if (!token) return <Navigate to="/" />

  try {
    const decoded = jwtDecode(token)
    const currentTime = Date.now() / 1000 // tiempo actual en segundos

    // Si el token está vencido, lo eliminamos y redirigimos
    if (decoded.exp < currentTime) {
      localStorage.removeItem('token')
      return <Navigate to="/" />
    }

    return <Outlet />
  } catch (error) {
    // Si el token está corrupto, también lo borramos
    localStorage.removeItem('token')
    return <Navigate to="/" />
  }
}

export default PrivateRoute

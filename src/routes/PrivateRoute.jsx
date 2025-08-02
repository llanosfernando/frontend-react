import { Navigate, Outlet } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { getToken, clearToken } from '../utils/auth' // Asegúrate de tener estas funciones

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

import { Navigate, Outlet } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { getToken, clearToken } from '../api/auth'

const PrivateRoute = () => {
  const token = getToken()

  if (!token) return <Navigate to="/" />

  try {
    const decoded = jwtDecode(token)
    const currentTime = Date.now() / 1000

    // Si el token está vencido, lo eliminamos y redirigimos
    if (decoded.exp < currentTime) {
      clearToken() // Usa la función del módulo auth
      return <Navigate to="/" />
    }

    return <Outlet />
  } catch (error) {
    // Si el token está corrupto, también lo borramos
    clearToken() // Usa la función del módulo auth
    return <Navigate to="/" />
  }
}

export default PrivateRoute

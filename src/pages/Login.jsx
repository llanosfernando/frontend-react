// Importamos funciones necesarias de React Router y React
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { login } from '../api/auth' // Importa la función login desde el API    

function Login() {
  // Hook para redireccionar después del login
  const navigate = useNavigate()

  // Estados para guardar el correo y la contraseña que el usuario escribe
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Esta función se ejecuta cuando el usuario envía el formulario
  const handleSubmit = async (e) => {
    e.preventDefault() // Previene que la página se recargue

    const { ok, data, error } = await login(email, password)

    if (ok) {
      alert('Inicio de sesión exitoso')
      navigate('/home', { replace: true }) // Redireccionamos a la página de inicio
    } else {
      alert(error || 'Error al iniciar sesión')
    }
  }

  // JSX que renderiza el formulario de login
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
        
        {/* Formulario con evento onSubmit que ejecuta handleSubmit */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          
          {/* Campo para el correo */}
          <div>
            <label className="block text-sm font-medium">Correo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Actualiza el estado "email"
              className="w-full mt-1 p-2 border rounded"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          {/* Campo para la contraseña */}
          <div>
            <label className="block text-sm font-medium">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Actualiza el estado "password"
              className="w-full mt-1 p-2 border rounded"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Botón para enviar el formulario */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Iniciar sesión
          </button>
        </form>

        {/* Enlace hacia el registro por si no tiene cuenta */}
        <div className="text-center mt-4">
          <p className="text-sm">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

// Exportamos el componente para poder usarlo en otras partes
export default Login

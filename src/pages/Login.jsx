// Importamos funciones necesarias de React Router y React
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Login() {
  // Hook para redireccionar después del login
  const navigate = useNavigate()

  // Estados para guardar el correo y la contraseña que el usuario escribe
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Esta función se ejecuta cuando el usuario envía el formulario
  const handleSubmit = async (e) => {
    e.preventDefault() // Previene que la página se recargue

    try {
      // Hacemos la petición POST al backend con los datos que el usuario escribió
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST', // Método HTTP
        headers: {
          'Content-Type': 'application/json' // Tipo de contenido enviado
        },
        // Enviamos un JSON con las claves que espera el backend:
        // correo y contraseña (aunque acá usamos email y password en el frontend)
        body: JSON.stringify({ correo: email, contraseña: password })
      })

      // Convertimos la respuesta del backend en JSON
      const data = await response.json()

      // Si la respuesta fue exitosa (status 200), mostramos mensaje y redireccionamos
      if (response.ok) {
        localStorage.setItem('token', data.token) // Guardamos el token en localStorage
        alert('Inicio de sesión exitoso')
      
        navigate('/home', { replace: true }) // Redireccionamos a la página de inicio
      } else {
        // Si hubo error (status 401, 404, etc.), mostramos el mensaje del servidor
        alert(data.message || 'Error al iniciar sesión')
      }

    } catch (error) {
      // Si algo salió mal con la conexión o el servidor
      console.error('Error:', error)
      alert('Ocurrió un error en el servidor')
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

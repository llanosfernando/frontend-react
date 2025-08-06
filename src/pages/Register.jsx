// src/pages/Register.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../api/auth'

function Register() {
  const navigate = useNavigate()

  // Estado del formulario
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: ''
  })

  // Estado para manejar carga y errores
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Actualiza valores del formulario
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  // Validación rápida del front
  const validateForm = () => {
    if (!form.nombre.trim()) return 'El nombre es obligatorio'
    if (!form.email.trim()) return 'El correo es obligatorio'
    if (!/\S+@\S+\.\S+/.test(form.email)) return 'El correo no es válido'
    if (form.password.length < 6) return 'La contraseña debe tener mínimo 6 caracteres'
    return null
  }

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    const { ok, error } = await register(form.nombre, form.email, form.password)
    setLoading(false)

    if (ok) {
      setSuccess('✅ Registro exitoso. Redirigiendo al login...')
      setTimeout(() => navigate('/'), 2000) // Redirige en 2 seg
    } else {
      setError(error || '❌ Error al registrarse')
    }
  }

  // Renderiza el formulario de registro
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Crear cuenta</h2>

        {/* Mensajes de error o éxito */}
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-600 mb-4 text-center">{success}</p>}

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={form.nombre}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="w-full mb-6 p-2 border border-gray-300 rounded"
          value={form.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading} // 🔹 Evita doble clic
          className={`w-full text-white py-2 rounded ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Registrando...' : 'Registrarme'}
        </button>

        <p className="text-sm text-center mt-4">
          ¿Ya tienes cuenta?{' '}
          <Link to="/" className="text-blue-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register

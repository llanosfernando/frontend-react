// src/pages/Register.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Formulario de registro:', form)
    // Aquí puedes hacer el fetch al backend cuando lo tengas listo
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Crear cuenta</h2>

        <input
          type="text"
          name="name"
          placeholder="Nombre"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={form.name}
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
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Registrarme
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

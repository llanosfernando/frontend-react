// src/pages/Register.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const response = await fetch('http://localhost:3000/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })

    const data = await response.json()

    if (response.ok) {
      alert('Registro exitoso')
    } else {
      alert(data.message || 'Error al registrar usuario')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Ocurrió un error en el servidor')
  }
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

// src/Login.jsx
import React, { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({ correo: '', contraseña: '' });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Intentando iniciar sesión:', formData);
    // Aquí conectarías con Express para autenticar
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="correo" type="email" placeholder="Correo" onChange={handleChange} required />
      <input name="contraseña" type="password" placeholder="Contraseña" onChange={handleChange} required />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}

export default Login;

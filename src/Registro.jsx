// src/Registro.jsx
import React, { useState } from 'react';

function Registro() {
  const [formData, setFormData] = useState({ nombre: '', correo: '', contraseña: '' });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    // Aquí conectarías con tu backend en Express si estuviera montado
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>
      <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
      <input name="correo" type="email" placeholder="Correo" onChange={handleChange} required />
      <input name="contraseña" type="password" placeholder="Contraseña" onChange={handleChange} required />
      <button type="submit">Registrarse</button>
    </form>
  );
}

export default Registro;

// src/api/inventory.js
import { apiFetch } from './client';



// USUARIOS
export function getUsuarios() {
  return apiFetch('/usuarios');
}
// Crear usuario
export function createUsuario(usuario) {
  return apiFetch('/usuarios', {
    method: 'POST',
    body: JSON.stringify(usuario),
  });
}
// Actualizar usuario
export function updateUsuario(id, usuario) {
  return apiFetch(`/usuarios/${id}`, {
    method: 'PUT',
    body: JSON.stringify(usuario),
  });
}

// Eliminar usuario
export function deleteUsuario(id) {
  return apiFetch(`/usuarios/${id}`, {
    method: 'DELETE',
  });
}
// Actualizar contraseña de usuario
export function updateUsuarioPassword(id, newPassword) {
  return apiFetch(`/usuarios/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ password: newPassword }),
  });
}




// OPERADORES
export function getOperadores() {
  return apiFetch('/operadores');
}
// Crear operador
export async function createOperador(operador) {
  if (!operador.codigo || !operador.nombres || !operador.apellidos || !operador.cedula || !operador.cargo) {
    throw new Error("Faltan datos obligatorios: codigo, nombres, apellidos, cedula, cargo.");
  }
  console.log("Datos enviados a createOperador:", operador);
  try {
    const response = await apiFetch('/operadores', {
      method: 'POST',
      body: JSON.stringify(operador),
    });
    console.log("Respuesta completa del backend en createOperador:", response);
    return { ok: true, data: response };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}
// Actualizar operador
export async function updateOperador(codigo, operador) {
  if (!operador.nombres || !operador.apellidos || !operador.cedula || !operador.cargo) {
    throw new Error("Faltan datos obligatorios: nombres, apellidos, cedula, cargo.");
  }
  console.log("Datos enviados a updateOperador:", operador);
  try {
    const response = await apiFetch(`/operadores/${codigo}`, {
      method: 'PUT',
      body: JSON.stringify(operador),
    });
    console.log("Respuesta completa del backend en updateOperador:", response);
    return { ok: true, data: response };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}
// Eliminar operador
export function deleteOperador(codigo) {
  console.log("Código del operador a eliminar:", codigo);
  return apiFetch(`/operadores/${codigo}`, {
    method: 'DELETE',
  });
}


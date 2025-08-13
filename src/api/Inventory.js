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
export function createOperador(operador) {
  return apiFetch('/operadores', {
    method: 'POST',
    body: JSON.stringify(operador),
  });
}
// Actualizar operador
export function updateOperador(id, operador) {
  return apiFetch(`/operadores/${id}`, {
    method: 'PUT',
    body: JSON.stringify(operador),
  });
}
// Eliminar operador
export function deleteOperador(id) {
  return apiFetch(`/operadores/${id}`, {
    method: 'DELETE',
  });
}

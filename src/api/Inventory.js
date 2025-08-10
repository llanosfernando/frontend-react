// src/api/inventory.js
import { apiFetch } from './client';

// USUARIOS
export function getUsuarios() {
  return apiFetch('/usuarios');
}

export function createUsuario(usuario) {
  return apiFetch('/usuarios', {
    method: 'POST',
    body: JSON.stringify(usuario),
  });
}

export function updateUsuario(id, usuario) {
  return apiFetch(`/usuarios/${id}`, {
    method: 'PUT',
    body: JSON.stringify(usuario),
  });
}

export function deleteUsuario(id) {
  return apiFetch(`/usuarios/${id}`, {
    method: 'DELETE',
  });
}

// OPERADORES
export function getOperadores() {
  return apiFetch('/operadores');
}

export function createOperador(operador) {
  return apiFetch('/operadores', {
    method: 'POST',
    body: JSON.stringify(operador),
  });
}

export function updateOperador(id, operador) {
  return apiFetch(`/operadores/${id}`, {
    method: 'PUT',
    body: JSON.stringify(operador),
  });
}

export function deleteOperador(id) {
  return apiFetch(`/operadores/${id}`, {
    method: 'DELETE',
  });
}

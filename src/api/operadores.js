import { apiFetch } from './client';

// Obtener un operador por código
export const getOperador = (codigo) => 
  apiFetch(`/operadores/${codigo}`, { method: 'GET' });

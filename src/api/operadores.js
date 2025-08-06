import * as client from './client';

// Obtener un operador por código
export const getOperador = (codigo) => 
  client.apiFetch(`/operadores/${codigo}`, { method: 'GET' });

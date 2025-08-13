// src/api/client.js
import { getToken, clearToken } from './auth';

const API_URL = import.meta.env.VITE_API_URL;

// Función para realizar peticiones a la API
export async function apiFetch(endpoint, options = {}) {
  const token = getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    //para mostrar errores en la consola
    console.log('Request URL:', `${API_URL}${endpoint}`);
    console.log('Request Options:', options);

    // Realiza la petición a la API
    const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });

    if (res.status === 401 || res.status === 403) {
      clearToken();
      throw new Error('No autorizado. Inicia sesión de nuevo.');
    }

    let data;
    try {
      data = await res.clone().json();
    } catch (jsonError) {
      data = await res.text();
    }

    if (!res.ok) {
      // Si data es objeto, busca error/mensaje; si es texto, muestra texto
      if (typeof data === 'object') {
        throw new Error(data.error || data.mensaje || 'Error en la solicitud');
      } else {
        throw new Error(data || 'Error en la solicitud');
      }
    }

    return data;
  } catch (error) {
    console.error('Error en apiFetch:', error);
    throw error;
  }
}

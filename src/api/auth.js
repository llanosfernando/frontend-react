
import { apiFetch } from './client';

// ====== TOKEN MANAGEMENT ======
export const getToken = () => localStorage.getItem('token');
export const setToken = (token) => localStorage.setItem('token', token);
export const clearToken = () => localStorage.removeItem('token');

// ====== AUTH REQUESTS ======


// LOGIN
export async function login(correo, contraseña) { 
  try {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ correo, contraseña })
    });

    if (data.token) {
      setToken(data.token);
    }

    return { ok: true, data };

  } catch (error) {
    console.error('Error en login API:', error);
    return { 
      ok: false, 
      error: error.message || 'Error de conexión con el servidor' 
    };
  }
}

export const logout = () => {
  clearToken();
};


// REGISTRO
export const register = async (nombre, email, password) => {
  try {
    const data = await apiFetch('/auth/registro', {
      method: 'POST',
      body: JSON.stringify({ nombre, email, password })
    });

    return { ok: true, data };

  } catch (error) {
    console.error('Error en registro:', error);
    return { 
      ok: false, 
      error: error.message || 'Error de conexión con el servidor' 
    };
  }
};

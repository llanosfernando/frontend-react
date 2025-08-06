const API_URL = import.meta.env.VITE_API_URL; // URL del backend

// ====== TOKEN MANAGEMENT ======
export const getToken = () => localStorage.getItem('token');
export const setToken = (token) => localStorage.setItem('token', token);
export const clearToken = () => localStorage.removeItem('token');

// ====== AUTH REQUESTS ======
export async function login(correo, contraseña) { 
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, contraseña })
    });

    const data = await response.json();

    if (response.ok && data.token) {
      setToken(data.token); // guardamos el token usando tu helper
    }

    return { ok: response.ok, data };

  } catch (error) {
    console.error('Error en login API:', error);
    return { ok: false, error: 'Error de conexión con el servidor' };
  }
}

export const logout = () => {
  clearToken();
};

export const register = async (nombre, email, password) => {
  try {
    const response = await fetch(`${API_URL}/registro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { ok: false, error: data.mensaje || 'Error al registrarse' };    }

    return { ok: true, data };

  } catch (error) {
    console.error('Error en registro:', error);
    return { ok: false, error: 'Error de conexión con el servidor' };
  }
};

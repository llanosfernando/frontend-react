// Hook personalizado para manejar formularios de usuario y operador
// Centraliza el estado, validación y submit
import { useState, useEffect } from "react";

export default function useUsuarioForm({ initialForm, onSubmit }) {
  const [form, setForm] = useState(initialForm || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Actualiza el estado form cada vez que cambie initialForm
  useEffect(() => {
    setForm(initialForm || {});
  }, [initialForm]);

  // Validación básica
  const validate = () => {
    if (!form.nombre || form.nombre.trim() === "") return "El nombre es obligatorio";
    if (form.email !== undefined && (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))) return "El correo es obligatorio y debe ser válido";
    return null;
  };

    // Handler para submit
    const handleSubmit = async (e) => {
      // Si es evento, previene y usa el form actual; si no, usa los datos recibidos
      if (e && typeof e.preventDefault === "function") {
        e.preventDefault();
        setError("");
        const validationError = validate();
        if (validationError) {
          setError(validationError);
          return;
        }
        setLoading(true);
        try {
          await onSubmit(form);
          setForm(initialForm || {});
        } catch (err) {
          setError(err.message || "Error guardando");
        } finally {
          setLoading(false);
        }
      } else {
        // Si no es evento, asume que son los datos del formulario
        setError("");
        const validationError = validate();
        if (validationError) {
          setError(validationError);
          return;
        }
        setLoading(true);
        try {
          await onSubmit(e); // e aquí son los datos
          setForm(initialForm || {});
        } catch (err) {
          setError(err.message || "Error guardando");
        } finally {
          setLoading(false);
        }
      }
    };

  return {
    form,
    setForm,
    loading,
    error,
    handleSubmit,
  };
}

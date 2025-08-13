import { useState } from "react";

export default function useOperadorForm({ initialForm, onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err.message || "Error al enviar el formulario");
    } finally {
      setLoading(false);
    }
  };

  return { form, setForm, loading, error, handleSubmit };
}

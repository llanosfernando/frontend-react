
import { apiFetch } from "./client";

// Listar inventario
export const getInventario = () => apiFetch("/inventario", { method: "GET" });

// Crear item
export const createItem = (data) =>
  apiFetch("/inventario", {
    method: "POST",
    body: JSON.stringify(data),
  });

// Editar item
export const updateItem = (id, data) =>
  apiFetch(`/inventario/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  

// Borrar item
export const deleteItem = (id) =>
  apiFetch(`/inventario/${id}`, { method: "DELETE" });

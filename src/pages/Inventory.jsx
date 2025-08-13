// src/pages/Inventory.jsx
import { useEffect, useState } from "react";
import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  getOperadores,
  createOperador,
  updateOperador,
  deleteOperador,
} from "../api/Inventory";
import toast from "react-hot-toast";
import { getToken } from "../api/auth";
import { jwtDecode } from "jwt-decode";
import { ChevronDown } from "lucide-react";
import { updateUsuarioPassword } from "../api/Inventory";
import UsuarioForm from "../components/UsuarioForm";
import UsuarioTable from "../components/UsuarioTable";
import PasswordForm from "../components/PasswordForm";
import ViewSelector from "../components/ViewSelector";
import UserRoleInfo from "../components/UserRoleInfo";
import OperadorForm from "../components/OperadorForm";
import OperadorTable from "../components/OperadorTable";

export default function Inventory() {
  const [view, setView] = useState("usuarios");
  const [data, setData] = useState([]);
  // El formulario maneja su propio estado, no se necesita 'form' ni 'setForm' aquí
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [userRole, setUserRole] = useState("");

  // Nuevo estado para el formulario de contraseña
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordUserId, setPasswordUserId] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  // Obtener el rol del usuario al cargar el componente
  useEffect(() => {
    try {
      const token = getToken();
      if (token) {
        const decoded = jwtDecode(token);
        setUserRole(decoded.rol || "");
      }
    } catch (err) {
      setUserRole("");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [view]);

  const fetchData = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      setData(view === "usuarios" ? await getUsuarios() : await getOperadores());
    } catch (err) {
      setErrorMsg("Error cargando datos");
      toast.error("Error cargando datos");
    } finally {
      setLoading(false);
    }
  };
  
  // Handler para el envío del formulario de usuarios
  const handleUsuarioSubmit = async (form) => {
    console.log("Datos del formulario de usuarios enviados:", form);
    if (!form.nombre || form.nombre.trim() === "") {
      toast.error("El nombre es obligatorio");
      return;
    }
    if (form.email !== undefined && (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))) {
      toast.error("El correo es obligatorio y debe ser válido");
      return;
    }
    if (form.password !== undefined && !editingId) {
      if (!form.password || form.password.trim() === "") {
        toast.error("La contraseña es obligatoria");
        return;
      }
    }
    setLoading(true);
    try {
      editingId ? await updateUsuario(editingId, form) : await createUsuario(form);
      toast.success(editingId ? "Usuario actualizado" : "Usuario creado");
      setEditingId(null);
      fetchData();
    } catch (err) {
      toast.error(err.message || "Error guardando usuario");
    } finally {
      setLoading(false);
    }
  };

  // Handler para el envío del formulario de operadores
  const handleOperadorSubmit = async (form) => {
    console.log("Datos del formulario de operadores enviados:", form);
    if (!form.nombre || form.nombre.trim() === "") {
      toast.error("El nombre del operador es obligatorio");
      return;
    }
    if (!form.codigo || form.codigo.trim() === "") {
      toast.error("El código del operador es obligatorio");
      return;
    }
    setLoading(true);
    try {
      editingId ? await updateOperador(editingId, form) : await createOperador(form);
      toast.success(editingId ? "Operador actualizado" : "Operador creado");
      setEditingId(null);
      fetchData();
    } catch (err) {
      toast.error(err.message || "Error guardando operador");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
  setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este registro?")) return;
    setLoading(true);
    try {
      view === "usuarios" ? await deleteUsuario(id) : await deleteOperador(id);
      toast.success("Registro eliminado");
      fetchData();
    } catch (err) {
      toast.error(err.message || "Error eliminando");
    } finally {
      setLoading(false);
    }
  };

  // Handler para mostrar el formulario de contraseña
  const handleShowPasswordForm = (userId) => {
    setPasswordUserId(userId);
    setShowPasswordForm(true);
    setNewPassword("");
  };

  // Handler para actualizar la contraseña
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    console.log('Actualizando contraseña:', { id: passwordUserId, password: newPassword });
    if (!newPassword || newPassword.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    try {
      const res = await updateUsuarioPassword(passwordUserId, newPassword);
      console.log('Respuesta backend:', res);
      toast.success("Contraseña actualizada");
      setShowPasswordForm(false);
      setPasswordUserId(null);
      setNewPassword("");
    } catch (err) {
      toast.error("Error actualizando contraseña");
      console.error('Error actualizando contraseña:', err);
    }
  };

  // Handler para cambiar el rol de un usuario
  const handleChangeRol = async (userId, newRol) => {
    try {
      const usuario = data.find(u => u.id === userId);
      await updateUsuario(userId, { ...usuario, rol: newRol });
      toast.success('Rol actualizado');
      fetchData();
    } catch (err) {
      toast.error('Error actualizando rol');
    }
  };

  // Renderiza la vista actual
  return (
    <div className="p-6">
      {/* Mostrar el rol del usuario */}
      <UserRoleInfo role={userRole} />
      <h1 className="text-3xl font-bold mb-4">📦 Inventory Manager</h1>
      {/* Selector de vista */}
      <div className="mb-6">
        <ViewSelector value={view} onChange={e => setView(e.target.value)} />
      </div>

      {/* Botón para agregar nuevo usuario/operador */}

      {/* Formulario de usuario u operador SIEMPRE visible */}
      {view === "usuarios" ? (
        <UsuarioForm
          initialForm={editingId ? data.find(u => u.id === editingId) : { nombre: "", email: "", password: "", rol: "" }}
          onSubmit={handleUsuarioSubmit}
          loading={loading}
          editingId={editingId}
        />
      ) : (
        <OperadorForm
          initialForm={editingId ? data.find(o => o.id === editingId) : { nombres: "", apellidos: "", cedula: "", cargo: "", foto: "" }}
          onSubmit={handleOperadorSubmit}
          loading={loading}
          editingId={editingId}
        />
      )}

      {/* Formulario para actualizar contraseña */}
      {showPasswordForm && (
        <PasswordForm
          onSubmit={handleUpdatePassword}
          onCancel={() => setShowPasswordForm(false)}
          value={newPassword}
          onChange={setNewPassword}
        />
      )}

      {/* Tabla de usuarios u operadores */}
      {view === "usuarios" ? (
        <UsuarioTable
          data={data}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onShowPasswordForm={handleShowPasswordForm}
          onChangeRol={handleChangeRol}
          view={view}
        />
      ) : (
        <OperadorTable
          data={data}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

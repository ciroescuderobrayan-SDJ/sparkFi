// Datos de sesión simulados — cuando exista un backend vendrán de la API
const USUARIO_SESION = {
  nombre: "Juan Pérez",
  email: "juan.perez@example.com",
  password: "sparkfi123",
};

// Estado de preferencias del usuario (en producción se guardaría en el servidor)
const preferencias = {
  notificacionEmail: true,
  notificacionPush: true,
  perfilPublico: false,
  mostrarActividad: true,
};

// ─────────────────────────────────────────
// Funciones de validación
// ─────────────────────────────────────────

function validarFormatoEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarLongitudPassword(password) {
  return password.length >= 6;
}

// ─────────────────────────────────────────
// Función genérica para mensajes de éxito
// Igual al patrón usado en login y registro
// ─────────────────────────────────────────

function mostrarMensaje(area, texto, tipo) {
  area.innerHTML = "";
  const div = document.createElement("div");
  div.className = "mensaje mensaje--" + tipo;
  div.textContent = texto;
  area.appendChild(div);
}

// Muestra lista de errores con el mismo formato que 02-create-account.js
function mostrarErrores(area, errores) {
  area.innerHTML = "";

  const titulo = document.createElement("p");
  titulo.className = "resultado-titulo--error";
  titulo.textContent = "Por favor corrige los siguientes errores:";
  area.appendChild(titulo);

  const lista = document.createElement("ul");
  lista.className = "lista-errores";

  for (let i = 0; i < errores.length; i++) {
    const item = document.createElement("li");
    item.textContent = errores[i];
    lista.appendChild(item);
  }

  area.appendChild(lista);
}

// ─────────────────────────────────────────
// Sección 1 — Editar perfil
// ─────────────────────────────────────────

function validarPerfil(nombre, email) {
  const errores = [];

  if (!nombre) {
    errores.push("El nombre completo es obligatorio.");
  }

  if (!email) {
    errores.push("El correo electrónico es obligatorio.");
  } else if (!validarFormatoEmail(email)) {
    errores.push("El correo no tiene un formato válido (ejemplo@correo.com).");
  }

  return errores;
}

function manejarGuardarPerfil() {
  const inputNombre = document.getElementById("edit-nombre");
  const inputEmail = document.getElementById("edit-email");
  // El área de resultado se crea dinámicamente en la inicialización
  const resultadoArea = document.getElementById("resultado-perfil");

  const nombre = inputNombre.value.trim();
  const email = inputEmail.value.trim();

  const errores = validarPerfil(nombre, email);

  if (errores.length > 0) {
    mostrarErrores(resultadoArea, errores);
    return;
  }

  // Actualiza el estado simulado de sesión con los nuevos datos
  USUARIO_SESION.nombre = nombre;
  USUARIO_SESION.email = email;

  mostrarMensaje(resultadoArea, "Perfil actualizado correctamente.", "exito");
}

function manejarCambioFoto() {
  const resultadoArea = document.getElementById("resultado-perfil");
  mostrarMensaje(resultadoArea, "Cambio de foto disponible próximamente.", "error");
}

// ─────────────────────────────────────────
// Sección 2 — Cambiar contraseña
// ─────────────────────────────────────────

function validarCambioPassword(actual, nueva, confirmar) {
  const errores = [];

  if (!actual) {
    errores.push("Debes ingresar tu contraseña actual.");
  }

  if (!nueva) {
    errores.push("La nueva contraseña es obligatoria.");
  }

  if (!confirmar) {
    errores.push("Debes confirmar la nueva contraseña.");
  }

  // Verifica que la contraseña actual coincida con la del sistema
  if (actual && actual !== USUARIO_SESION.password) {
    errores.push("La contraseña actual no es correcta.");
  }

  if (nueva && !validarLongitudPassword(nueva)) {
    errores.push("La nueva contraseña debe tener al menos 6 caracteres.");
  }

  if (nueva && confirmar && nueva !== confirmar) {
    errores.push("Las contraseñas nuevas no coinciden.");
  }

  return errores;
}

function limpiarCamposPassword() {
  document.getElementById("password-actual").value = "";
  document.getElementById("password-nueva").value = "";
  document.getElementById("password-confirmar").value = "";
}

function manejarCambioPassword() {
  const actual = document.getElementById("password-actual").value;
  const nueva = document.getElementById("password-nueva").value;
  const confirmar = document.getElementById("password-confirmar").value;
  const resultadoArea = document.getElementById("resultado-settings");

  const errores = validarCambioPassword(actual, nueva, confirmar);

  if (errores.length > 0) {
    mostrarErrores(resultadoArea, errores);
    return;
  }

  // Actualiza la contraseña en el estado de sesión simulado
  USUARIO_SESION.password = nueva;

  limpiarCamposPassword();
  mostrarMensaje(resultadoArea, "¡Contraseña actualizada exitosamente!", "exito");
}

// ─────────────────────────────────────────
// Sección 3 y 4 — Notificaciones y Privacidad
// Los switches ya funcionan visualmente con CSS puro;
// aquí solo registramos el cambio de estado en preferencias
// ─────────────────────────────────────────

function registrarToggle(checkbox, clave) {
  checkbox.addEventListener("change", function () {
    preferencias[clave] = checkbox.checked;
  });
}

// ─────────────────────────────────────────
// Inicialización — espera a que el DOM esté listo
// ─────────────────────────────────────────

document.addEventListener("DOMContentLoaded", function () {

  // ── Perfil: crear el área de resultado y enlazar botones ──

  // El HTML no incluye un div de resultado en la sección de perfil,
  // así que lo creamos dinámicamente y lo insertamos antes del botón guardar
  const seccionPerfil = document.querySelector(".edit-profile-section");
  const btnGuardarPerfil = seccionPerfil.querySelector(".btn-guardar");

  const resultadoPerfil = document.createElement("div");
  resultadoPerfil.id = "resultado-perfil";
  seccionPerfil.insertBefore(resultadoPerfil, btnGuardarPerfil);

  btnGuardarPerfil.addEventListener("click", manejarGuardarPerfil);

  const btnCambiarFoto = document.querySelector(".btn-change-photo");
  if (btnCambiarFoto) {
    btnCambiarFoto.addEventListener("click", manejarCambioFoto);
  }

  // ── Contraseña ──

  const btnGuardarPassword = document.getElementById("btn-guardar-password");
  if (btnGuardarPassword) {
    btnGuardarPassword.addEventListener("click", manejarCambioPassword);
  }

  // ── Notificaciones ──

  const seccionNotif = document.querySelector(".notifications-section");
  if (seccionNotif) {
    const clavesNotif = ["notificacionEmail", "notificacionPush"];
    const checkboxesNotif = seccionNotif.querySelectorAll("input[type='checkbox']");

    for (let i = 0; i < checkboxesNotif.length; i++) {
      registrarToggle(checkboxesNotif[i], clavesNotif[i]);
    }
  }

  // ── Privacidad y seguridad ──

  const seccionPrivacidad = document.querySelector(".privacy-section");
  if (seccionPrivacidad) {
    const clavesPrivacidad = ["perfilPublico", "mostrarActividad"];
    const checkboxesPrivacidad = seccionPrivacidad.querySelectorAll("input[type='checkbox']");

    for (let i = 0; i < checkboxesPrivacidad.length; i++) {
      registrarToggle(checkboxesPrivacidad[i], clavesPrivacidad[i]);
    }
  }
});

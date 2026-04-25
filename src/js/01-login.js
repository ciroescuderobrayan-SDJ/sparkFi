// Sin backend: credenciales fijas hasta que exista una API real
const CREDENCIALES_SISTEMA = {
  email: "admin@sparkfi.com",
  password: "sparkfi123",
};

const MAX_INTENTOS = 3;
let intentosRealizados = 0;

function validarCredenciales(email, password) {
  return (
    email === CREDENCIALES_SISTEMA.email &&
    password === CREDENCIALES_SISTEMA.password
  );
}

// Crea y muestra un div de mensaje dentro del área de resultado
function mostrarMensaje(area, texto, tipo) {
  area.innerHTML = "";
  const div = document.createElement("div");
  div.className = "mensaje mensaje--" + tipo;
  div.textContent = texto;
  area.appendChild(div);
}

// Deshabilita el formulario completamente tras agotar los intentos
function deshabilitarFormulario() {
  document.getElementById("email").disabled = true;
  document.getElementById("password").disabled = true;
  const btn = document.getElementById("btn-login");
  btn.disabled = true;
  btn.textContent = "Bloqueado";
}

function manejarLogin() {
  // trim() evita que un espacio en blanco cuente como credencial válida
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const resultadoArea = document.getElementById("resultado-login");

  if (!email || !password) {
    mostrarMensaje(resultadoArea, "Por favor, completa todos los campos.", "error");
    return;
  }

  if (intentosRealizados >= MAX_INTENTOS) {
    mostrarMensaje(
      resultadoArea,
      "Usuario bloqueado. Ha superado el número de intentos.",
      "bloqueado"
    );
    deshabilitarFormulario();
    return;
  }

  intentosRealizados++;

  if (validarCredenciales(email, password)) {
    mostrarMensaje(resultadoArea, "¡Bienvenido al sistema! Redirigiendo...", "exito");
    deshabilitarFormulario();
    // 1500 ms para que el usuario alcance a leer el mensaje antes de redirigir
    setTimeout(function () {
      window.location.href = "03-home.html";
    }, 1500);
    return;
  }

  if (intentosRealizados < MAX_INTENTOS) {
    mostrarMensaje(
      resultadoArea,
      "Datos incorrectos. Intento " + intentosRealizados + " de " + MAX_INTENTOS + ".",
      "error"
    );
  } else {
    mostrarMensaje(
      resultadoArea,
      "Usuario bloqueado. Ha superado el número de intentos.",
      "bloqueado"
    );
    deshabilitarFormulario();
  }
}

// DOMContentLoaded garantiza que el botón ya existe en el DOM antes de buscarlo
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btn-login").addEventListener("click", manejarLogin);
});

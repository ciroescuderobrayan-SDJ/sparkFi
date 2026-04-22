// Credenciales de prueba — cuando exista un backend esto se reemplaza por una llamada a la API
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

function mostrarMensaje(area, texto, tipo) {
  area.innerHTML = "";
  const div = document.createElement("div");
  div.className = "mensaje mensaje--" + tipo;
  div.textContent = texto;
  area.appendChild(div);
}

function deshabilitarFormulario() {
  document.getElementById("email").disabled = true;
  document.getElementById("password").disabled = true;
  const btn = document.getElementById("btn-login");
  btn.disabled = true;
  btn.textContent = "Bloqueado";
}

function manejarLogin() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const resultadoArea = document.getElementById("resultado-login");

  if (!email || !password) {
    mostrarMensaje(resultadoArea, "Por favor, completa todos los campos.", "error");
    return;
  }

  // Cada clic cuenta como un intento; cuando se agotan, el formulario queda bloqueado
  while (intentosRealizados < MAX_INTENTOS) {
    intentosRealizados++;

    if (validarCredenciales(email, password)) {
      mostrarMensaje(resultadoArea, "¡Bienvenido al sistema! Redirigiendo...", "exito");
      deshabilitarFormulario();
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
    return;
  }

  // Si el usuario presiona el botón después de haberse bloqueado, se vuelve a mostrar el mensaje
  mostrarMensaje(
    resultadoArea,
    "Usuario bloqueado. Ha superado el número de intentos.",
    "bloqueado"
  );
  deshabilitarFormulario();
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btn-login").addEventListener("click", manejarLogin);
});

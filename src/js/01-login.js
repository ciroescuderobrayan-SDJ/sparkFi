const API_USUARIOS =
  "https://69ff3b6e8c70b15fa3cb2e3d.mockapi.io/api/v1/users";

const MAX_INTENTOS = 3;
let intentosRealizados = 0;

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

function cambiarEstadoBoton(cargando) {
  const btn = document.getElementById("btn-login");

  if (cargando) {
    btn.disabled = true;
    btn.textContent = "Validando...";
    return;
  }

  btn.disabled = false;
  btn.textContent = "Iniciar sesion";
}

async function obtenerUsuarios() {
  const respuesta = await fetch(API_USUARIOS);

  if (!respuesta.ok) {
    throw new Error("No se pudieron consultar los usuarios.");
  }

  return await respuesta.json();
}

function buscarUsuario(usuarios, email, password) {
  return usuarios.find(function (usuario) {
    return usuario.email === email && usuario.password === password;
  });
}

async function manejarLogin() {
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
      "Usuario bloqueado. Ha superado el numero de intentos.",
      "bloqueado",
    );
    deshabilitarFormulario();
    return;
  }

  try {
    cambiarEstadoBoton(true);
    mostrarMensaje(resultadoArea, "Validando usuario...", "cargando");

    const usuarios = await obtenerUsuarios();
    const usuarioEncontrado = buscarUsuario(usuarios, email, password);

    if (usuarioEncontrado) {
      sessionStorage.setItem(
        "usuarioSparkFi",
        JSON.stringify(usuarioEncontrado),
      );

      mostrarMensaje(
        resultadoArea,
        "Bienvenido al sistema. Redirigiendo...",
        "exito",
      );

      setTimeout(function () {
        window.location.href = "03-home.html";
      }, 1500);

      return;
    }

    intentosRealizados++;

    if (intentosRealizados < MAX_INTENTOS) {
      mostrarMensaje(
        resultadoArea,
        "Datos incorrectos. Intento " +
          intentosRealizados +
          " de " +
          MAX_INTENTOS +
          ".",
        "error",
      );
    } else {
      mostrarMensaje(
        resultadoArea,
        "Usuario bloqueado. Ha superado el numero de intentos.",
        "bloqueado",
      );
      deshabilitarFormulario();
    }
  } catch (error) {
    mostrarMensaje(
      resultadoArea,
      "No se pudieron cargar los datos. Intenta mas tarde.",
      "error",
    );
  } finally {
    if (intentosRealizados < MAX_INTENTOS) {
      cambiarEstadoBoton(false);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btn-login").addEventListener("click", manejarLogin);
});

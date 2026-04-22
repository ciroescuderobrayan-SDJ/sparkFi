function validarFormatoEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarLongitudPassword(password) {
  return password.length >= 6;
}

function validarPasswordsIguales(password, confirmar) {
  return password === confirmar;
}

function validarFormularioRegistro(nombre, email, password, confirmar, terminos) {
  const errores = [];

  // Antes de validar formatos, me aseguro de que ningún campo esté vacío
  const camposTexto = [
    { valor: nombre, mensaje: "El nombre completo es obligatorio." },
    { valor: email, mensaje: "El correo electrónico es obligatorio." },
    { valor: password, mensaje: "La contraseña es obligatoria." },
    { valor: confirmar, mensaje: "Debes confirmar tu contraseña." },
  ];

  for (let i = 0; i < camposTexto.length; i++) {
    if (!camposTexto[i].valor.trim()) {
      errores.push(camposTexto[i].mensaje);
    }
  }

  if (email.trim() && !validarFormatoEmail(email)) {
    errores.push("El correo no tiene un formato válido (ejemplo@correo.com).");
  }

  if (password.trim() && !validarLongitudPassword(password)) {
    errores.push("La contraseña debe tener al menos 6 caracteres.");
  }

  if (password.trim() && confirmar.trim() && !validarPasswordsIguales(password, confirmar)) {
    errores.push("Las contraseñas no coinciden.");
  }

  if (!terminos) {
    errores.push("Debes aceptar los términos y condiciones.");
  }

  return errores;
}

function manejarRegistro() {
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email-registro").value;
  const password = document.getElementById("password-registro").value;
  const confirmar = document.getElementById("confirmar-password").value;
  const terminos = document.getElementById("terminos").checked;
  const resultadoArea = document.getElementById("resultado-registro");

  const errores = validarFormularioRegistro(nombre, email, password, confirmar, terminos);

  resultadoArea.innerHTML = "";

  if (errores.length > 0) {
    const titulo = document.createElement("p");
    titulo.className = "resultado-titulo--error";
    titulo.textContent = "Por favor corrige los siguientes errores:";
    resultadoArea.appendChild(titulo);

    const lista = document.createElement("ul");
    lista.className = "lista-errores";

    for (let i = 0; i < errores.length; i++) {
      const item = document.createElement("li");
      item.textContent = errores[i];
      lista.appendChild(item);
    }

    resultadoArea.appendChild(lista);
  } else {
    const divExito = document.createElement("div");
    divExito.className = "mensaje mensaje--exito";

    const tituloExito = document.createElement("p");
    tituloExito.className = "resultado-titulo--exito";
    tituloExito.textContent = "¡Cuenta creada exitosamente! Redirigiendo al login...";
    divExito.appendChild(tituloExito);

    const listaInfo = document.createElement("ul");
    listaInfo.className = "info-usuario";

    const datosUsuario = [
      { etiqueta: "Nombre", valor: nombre },
      { etiqueta: "Correo", valor: email },
    ];

    for (let j = 0; j < datosUsuario.length; j++) {
      const itemInfo = document.createElement("li");
      itemInfo.innerHTML =
        "<strong>" + datosUsuario[j].etiqueta + ":</strong> " + datosUsuario[j].valor;
      listaInfo.appendChild(itemInfo);
    }

    divExito.appendChild(listaInfo);
    resultadoArea.appendChild(divExito);

    setTimeout(function () {
      window.location.href = "01-login.html";
    }, 2000);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btn-registro").addEventListener("click", manejarRegistro);
});

function validarFormatoCorreo(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}

function validarLongitudContrasena(contrasena) {
  return contrasena.length >= 6;
}

function validarContrasenasIguales(contrasena, confirmarContrasena) {
  return contrasena === confirmarContrasena;
}

function validarFormularioCrearCuenta(
  nombreCompleto,
  correo,
  contrasena,
  confirmarContrasena,
  terminos,
) {
  const errores = [];

  const camposTexto = [
    { valor: nombreCompleto, mensaje: "El nombre completo es obligatorio." },
    { valor: correo, mensaje: "El correo electronico es obligatorio." },
    { valor: contrasena, mensaje: "La contrasena es obligatoria." },
    { valor: confirmarContrasena, mensaje: "Debes confirmar tu contrasena." },
  ];

  for (let i = 0; i < camposTexto.length; i++) {
    if (!camposTexto[i].valor.trim()) {
      errores.push(camposTexto[i].mensaje);
    }
  }

  if (correo.trim() && !validarFormatoCorreo(correo)) {
    errores.push("El correo no tiene un formato valido (ejemplo@correo.com).");
  }

  if (contrasena.trim() && !validarLongitudContrasena(contrasena)) {
    errores.push("La contrasena debe tener al menos 6 caracteres.");
  }

  if (
    contrasena.trim() &&
    confirmarContrasena.trim() &&
    !validarContrasenasIguales(contrasena, confirmarContrasena)
  ) {
    errores.push("Las contrasenas no coinciden.");
  }

  if (!terminos) {
    errores.push("Debes aceptar los terminos y condiciones.");
  }

  return errores;
}

function manejarCrearCuenta() {
  const campoNombre = document.getElementById("nombre-completo");
  const campoCorreo = document.getElementById("correo");
  const campoContrasena = document.getElementById("contrasena");
  const campoConfirmarContrasena = document.getElementById("confirmar-contrasena");
  const campoTerminos = document.getElementById("terminos");
  const mensajeResultado = document.getElementById("resultado-crear-cuenta");

  const nombreCompleto = campoNombre.value;
  const correo = campoCorreo.value;
  const contrasena = campoContrasena.value;
  const confirmarContrasena = campoConfirmarContrasena.value;
  const terminos = campoTerminos.checked;

  const errores = validarFormularioCrearCuenta(
    nombreCompleto,
    correo,
    contrasena,
    confirmarContrasena,
    terminos,
  );

  mensajeResultado.innerHTML = "";

  if (errores.length > 0) {
    const titulo = document.createElement("p");
    titulo.className = "titulo-mensaje-crear-cuenta titulo-mensaje-error";
    titulo.textContent = "Por favor corrige los siguientes errores:";
    mensajeResultado.appendChild(titulo);

    const lista = document.createElement("ul");
    lista.className = "lista-errores-crear-cuenta";

    for (let i = 0; i < errores.length; i++) {
      const item = document.createElement("li");
      item.textContent = errores[i];
      lista.appendChild(item);
    }

    mensajeResultado.appendChild(lista);
  } else {
    const divExito = document.createElement("div");
    divExito.className = "mensaje-crear-cuenta mensaje-exito-crear-cuenta";

    const tituloExito = document.createElement("p");
    tituloExito.className = "titulo-mensaje-crear-cuenta titulo-mensaje-exito";
    tituloExito.textContent =
      "Cuenta creada exitosamente. Redirigiendo al login...";
    divExito.appendChild(tituloExito);

    const listaInfo = document.createElement("ul");
    listaInfo.className = "datos-usuario-crear-cuenta";

    const datosUsuario = [
      { etiqueta: "Nombre", valor: nombreCompleto },
      { etiqueta: "Correo", valor: correo },
    ];

    for (let j = 0; j < datosUsuario.length; j++) {
      const itemInfo = document.createElement("li");
      itemInfo.innerHTML =
        "<strong>" + datosUsuario[j].etiqueta + ":</strong> " + datosUsuario[j].valor;
      listaInfo.appendChild(itemInfo);
    }

    divExito.appendChild(listaInfo);
    mensajeResultado.appendChild(divExito);

    setTimeout(function () {
      window.location.href = "01-login.html";
    }, 2000);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const botonCrearCuenta = document.getElementById("boton-crear-cuenta");
  botonCrearCuenta.addEventListener("click", manejarCrearCuenta);
});

const API_USUARIOS =
  "https://69ff3b6e8c70b15fa3cb2e3d.mockapi.io/api/v1/users";

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

function limpiarResultado(area) {
  area.innerHTML = "";
}

function mostrarErrores(area, errores) {
  limpiarResultado(area);

  const titulo = document.createElement("p");
  titulo.className = "titulo-mensaje-crear-cuenta titulo-mensaje-error";
  titulo.textContent = "Por favor corrige los siguientes errores:";
  area.appendChild(titulo);

  const lista = document.createElement("ul");
  lista.className = "lista-errores-crear-cuenta";

  for (let i = 0; i < errores.length; i++) {
    const item = document.createElement("li");
    item.textContent = errores[i];
    lista.appendChild(item);
  }

  area.appendChild(lista);
}

function mostrarCargando(area) {
  limpiarResultado(area);

  const mensaje = document.createElement("div");
  mensaje.className = "mensaje-crear-cuenta mensaje-cargando-crear-cuenta";
  mensaje.textContent = "Creando cuenta...";

  area.appendChild(mensaje);
}

function mostrarExito(area, nombreCompleto, correo) {
  limpiarResultado(area);

  const divExito = document.createElement("div");
  divExito.className = "mensaje-crear-cuenta mensaje-exito-crear-cuenta";

  const tituloExito = document.createElement("p");
  tituloExito.className = "titulo-mensaje-crear-cuenta titulo-mensaje-exito";
  tituloExito.textContent = "Cuenta creada exitosamente. Redirigiendo al login...";
  divExito.appendChild(tituloExito);

  const listaInfo = document.createElement("ul");
  listaInfo.className = "datos-usuario-crear-cuenta";

  const datosUsuario = [
    { etiqueta: "Nombre", valor: nombreCompleto },
    { etiqueta: "Correo", valor: correo },
  ];

  for (let i = 0; i < datosUsuario.length; i++) {
    const itemInfo = document.createElement("li");
    const etiqueta = document.createElement("strong");

    etiqueta.textContent = datosUsuario[i].etiqueta + ": ";
    itemInfo.appendChild(etiqueta);
    itemInfo.appendChild(document.createTextNode(datosUsuario[i].valor));
    listaInfo.appendChild(itemInfo);
  }

  divExito.appendChild(listaInfo);
  area.appendChild(divExito);
}

function cambiarEstadoBoton(cargando) {
  const boton = document.getElementById("boton-crear-cuenta");

  if (cargando) {
    boton.disabled = true;
    boton.textContent = "Creando cuenta...";
    return;
  }

  boton.disabled = false;
  boton.textContent = "Registrarme";
}

function mostrarBotonCuentaCreada() {
  const boton = document.getElementById("boton-crear-cuenta");

  boton.disabled = true;
  boton.textContent = "Cuenta creada";
}

async function obtenerUsuarios() {
  const respuesta = await fetch(API_USUARIOS);

  if (!respuesta.ok) {
    throw new Error("No se pudieron consultar los usuarios.");
  }

  return await respuesta.json();
}

function correoYaExiste(usuarios, correo) {
  const correoNormalizado = correo.trim().toLowerCase();

  return usuarios.some(function (usuario) {
    return String(usuario.email).toLowerCase() === correoNormalizado;
  });
}

async function crearUsuario(usuario) {
  const respuesta = await fetch(API_USUARIOS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo crear el usuario.");
  }

  return await respuesta.json();
}

async function manejarCrearCuenta() {
  const campoNombre = document.getElementById("nombre-completo");
  const campoCorreo = document.getElementById("correo");
  const campoContrasena = document.getElementById("contrasena");
  const campoConfirmarContrasena = document.getElementById(
    "confirmar-contrasena",
  );
  const campoTerminos = document.getElementById("terminos");
  const mensajeResultado = document.getElementById("resultado-crear-cuenta");

  const nombreCompleto = campoNombre.value.trim();
  const correo = campoCorreo.value.trim().toLowerCase();
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

  if (errores.length > 0) {
    mostrarErrores(mensajeResultado, errores);
    return;
  }

  let cuentaCreada = false;

  try {
    cambiarEstadoBoton(true);
    mostrarCargando(mensajeResultado);

    const usuarios = await obtenerUsuarios();

    if (correoYaExiste(usuarios, correo)) {
      mostrarErrores(mensajeResultado, [
        "Ya existe una cuenta registrada con este correo.",
      ]);
      return;
    }

    await crearUsuario({
      nombre: nombreCompleto,
      email: correo,
      password: contrasena,
      nivel: 1,
      ahorro: 0,
    });

    cuentaCreada = true;
    mostrarBotonCuentaCreada();
    mostrarExito(mensajeResultado, nombreCompleto, correo);

    setTimeout(function () {
      window.location.href = "01-login.html";
    }, 2000);
  } catch (error) {
    mostrarErrores(mensajeResultado, [
      "No se pudieron cargar los datos. Intenta mas tarde.",
    ]);
  } finally {
    if (!cuentaCreada) {
      cambiarEstadoBoton(false);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const botonCrearCuenta = document.getElementById("boton-crear-cuenta");
  botonCrearCuenta.addEventListener("click", manejarCrearCuenta);
});

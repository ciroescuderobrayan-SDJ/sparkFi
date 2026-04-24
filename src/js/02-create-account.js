// Comprueba que el correo tenga la estructura básica usuario@dominio.ext
function validarFormatoCorreo(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}

// La contraseña debe tener al menos 6 caracteres para ser aceptada
function validarLongitudContrasena(contrasena) {
  return contrasena.length >= 6;
}

// Verifica que el campo de confirmación sea idéntico al de la contraseña original
function validarContrasenasIguales(contrasena, confirmarContrasena) {
  return contrasena === confirmarContrasena;
}

// Recorre todos los campos del formulario y devuelve un arreglo con los errores encontrados.
// Si el arreglo viene vacío, el formulario pasó todas las validaciones.
function validarFormularioCrearCuenta(
  nombreCompleto,
  correo,
  contrasena,
  confirmarContrasena,
  terminos,
) {
  const errores = [];

  // Primero se verifica que ningún campo de texto esté vacío
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

  // Solo valida el formato del correo si el usuario escribió algo (evita duplicar el error de "obligatorio")
  if (correo.trim() && !validarFormatoCorreo(correo)) {
    errores.push("El correo no tiene un formato valido (ejemplo@correo.com).");
  }

  // Solo valida la longitud si el campo de contraseña no está vacío
  if (contrasena.trim() && !validarLongitudContrasena(contrasena)) {
    errores.push("La contrasena debe tener al menos 6 caracteres.");
  }

  // Compara las dos contraseñas solo cuando ambas tienen contenido
  if (
    contrasena.trim() &&
    confirmarContrasena.trim() &&
    !validarContrasenasIguales(contrasena, confirmarContrasena)
  ) {
    errores.push("Las contrasenas no coinciden.");
  }

  // El usuario debe aceptar los términos para poder registrarse
  if (!terminos) {
    errores.push("Debes aceptar los terminos y condiciones.");
  }

  return errores;
}

// Función principal que se ejecuta al hacer clic en "Registrarme".
// Lee los valores del formulario, valida, y muestra el resultado en pantalla.
function manejarCrearCuenta() {
  // Obtenemos referencias a todos los campos del formulario
  const campoNombre = document.getElementById("nombre-completo");
  const campoCorreo = document.getElementById("correo");
  const campoContrasena = document.getElementById("contrasena");
  const campoConfirmarContrasena = document.getElementById(
    "confirmar-contrasena",
  );
  const campoTerminos = document.getElementById("terminos");
  const mensajeResultado = document.getElementById("resultado-crear-cuenta");

  // Extraemos los valores actuales de cada campo
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

  // Limpiamos cualquier mensaje anterior antes de mostrar el nuevo resultado
  mensajeResultado.innerHTML = "";

  if (errores.length > 0) {
    // Hay errores: mostramos un encabezado rojo y luego la lista de problemas
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
    // Todo correcto: mostramos un mensaje de éxito con los datos confirmados
    const divExito = document.createElement("div");
    divExito.className = "mensaje-crear-cuenta mensaje-exito-crear-cuenta";

    const tituloExito = document.createElement("p");
    tituloExito.className = "titulo-mensaje-crear-cuenta titulo-mensaje-exito";
    tituloExito.textContent =
      "Cuenta creada exitosamente. Redirigiendo al login...";
    divExito.appendChild(tituloExito);

    // Mostramos el nombre y correo del usuario recién registrado como confirmación
    const listaInfo = document.createElement("ul");
    listaInfo.className = "datos-usuario-crear-cuenta";

    const datosUsuario = [
      { etiqueta: "Nombre", valor: nombreCompleto },
      { etiqueta: "Correo", valor: correo },
    ];

    for (let j = 0; j < datosUsuario.length; j++) {
      const itemInfo = document.createElement("li");
      itemInfo.innerHTML =
        "<strong>" +
        datosUsuario[j].etiqueta +
        ":</strong> " +
        datosUsuario[j].valor;
      listaInfo.appendChild(itemInfo);
    }

    divExito.appendChild(listaInfo);
    mensajeResultado.appendChild(divExito);

    // Tras 2 segundos redirigimos al login para que el usuario inicie sesión con su nueva cuenta
    setTimeout(function () {
      window.location.href = "01-login.html";
    }, 2000);
  }
}

// Esperamos a que el DOM esté completamente cargado antes de enlazar el botón,
// así evitamos errores por intentar acceder a elementos que aún no existen.
document.addEventListener("DOMContentLoaded", function () {
  const botonCrearCuenta = document.getElementById("boton-crear-cuenta");
  botonCrearCuenta.addEventListener("click", manejarCrearCuenta);
});

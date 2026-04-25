// Sin backend: el nombre viene hardcodeado hasta que exista sesión real
const USUARIO = { nombre: "Juan" };

// Devuelve el saludo apropiado según la hora del día
function obtenerSaludo() {
  const hora = new Date().getHours();
  if (hora >= 5 && hora < 12) return "Buenos días";
  if (hora >= 12 && hora < 18) return "Buenas tardes";
  return "Buenas noches";
}

// Reemplaza "Bienvenido" en el título por el saludo dinámico
function actualizarSaludo() {
  const titulo = document.querySelector(".home-hero__title");
  if (!titulo) return;
  titulo.innerHTML =
    obtenerSaludo() +
    ", " +
    USUARIO.nombre +
    ' <span class="home-hero__wave">👋</span>';
}

// Las tarjetas aparecen escalonadas con un pequeño retraso entre cada una
function animarTarjetas() {
  const tarjetas = document.querySelectorAll(".home-quick-access__card");
  tarjetas.forEach(function (tarjeta, i) {
    tarjeta.style.opacity = "0";
    tarjeta.style.transform = "translateY(20px)";
    tarjeta.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    setTimeout(function () {
      tarjeta.style.opacity = "1";
      tarjeta.style.transform = "translateY(0)";
    }, 100 + i * 130);
  });
}

// Hace que el avatar del header lleve al perfil al hacer clic
function navegarAlPerfil() {
  const avatar = document.querySelector(".home-header__user-avatar");
  if (!avatar) return;
  avatar.style.cursor = "pointer";
  avatar.addEventListener("click", function () {
    window.location.href = "./07-profile.html";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  actualizarSaludo();
  animarTarjetas();
  navegarAlPerfil();
});

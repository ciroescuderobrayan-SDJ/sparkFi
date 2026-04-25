function animarContador(elemento, duracion) {
  const texto = elemento.textContent.trim();
  const esDinero = texto.startsWith("$");
  const numero = parseInt(texto.replace(/\D/g, ""), 10);
  if (isNaN(numero)) return;

  const inicio = Date.now();

  (function tick() {
    const progreso = Math.min((Date.now() - inicio) / duracion, 1);
    // easeOut cúbico para que la animación desacelere al final
    const ease = 1 - Math.pow(1 - progreso, 3);
    const actual = Math.round(numero * ease);

    elemento.textContent = esDinero
      ? "$" + actual.toLocaleString("en-US")
      : String(actual);

    if (progreso < 1) requestAnimationFrame(tick);
    else elemento.textContent = texto;
  })();
}

function iniciarContadores() {
  document.querySelectorAll(".profile-sidebar__stat-value").forEach(function (el) {
    animarContador(el, 1200);
  });
}

function confirmarCerrarSesion() {
  const enlace = document.querySelector(".profile-sidebar__logout-link");
  if (!enlace) return;

  enlace.addEventListener("click", function (e) {
    e.preventDefault();
    if (confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      window.location.href = enlace.getAttribute("href");
    }
  });
}

function animarLogros() {
  document.querySelectorAll(".profile-achievements__card").forEach(function (tarjeta, i) {
    tarjeta.style.opacity = "0";
    tarjeta.style.transform = "translateY(16px)";
    tarjeta.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    setTimeout(function () {
      tarjeta.style.opacity = "1";
      tarjeta.style.transform = "translateY(0)";
    }, 200 + i * 150);
  });
}

function manejarVerLogros() {
  const enlace = document.querySelector(".profile-achievements__link");
  if (!enlace) return;

  // Placeholder hasta que exista la página de todos los logros
  enlace.addEventListener("click", function (e) {
    e.preventDefault();
    alert("Próximamente: todos tus logros.");
  });
}

document.addEventListener("DOMContentLoaded", function () {
  iniciarContadores();
  confirmarCerrarSesion();
  animarLogros();
  manejarVerLogros();
});

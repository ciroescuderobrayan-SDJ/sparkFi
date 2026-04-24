document.addEventListener('DOMContentLoaded', () => {
    // 1. Configuración inicial
    let ahorroActual = 25000;
    const metaTotal = 50000;

    // 2. Selección de elementos (usando las clases de tu código original)
    const barraEfecto = document.querySelector('.progress-fill');
    const textoProgreso = document.querySelector('.progress-text');
    const botonAhorrar = document.querySelector('.challenge button') || document.querySelector('button');
    
    // Seleccionamos los logros (el segundo es el que activaremos)
    const logros = document.querySelectorAll('.achievement');

    if (botonAhorrar) {
        botonAhorrar.addEventListener('click', () => {
            if (ahorroActual < metaTotal) {
                ahorroActual += 5000;
                const porcentaje = (ahorroActual / metaTotal) * 100;

                // Aplicamos los cambios al DOM
                if (barraEfecto) {
                    barraEfecto.style.width = `${porcentaje}%`;
                    barraEfecto.style.transition = "width 0.5s ease-in-out";
                }

                if (textoProgreso) {
                    textoProgreso.innerText = `Progreso: $${ahorroActual.toLocaleString()} / $${metaTotal.toLocaleString()}`;
                }

                // Lógica de Logros: Si llega al 100%, iluminamos el segundo logro
                if (ahorroActual >= metaTotal && logros[1]) {
                    logros[1].style.opacity = "1";
                    logros[1].style.filter = "none";
                    logros[1].style.transform = "scale(1.1)";
                    logros[1].style.transition = "all 0.5s ease";
                    
                    const etiqueta = logros[1].querySelector('.achievement-label');
                    if (etiqueta) {
                        etiqueta.innerText = "¡Meta Cumplida!";
                        etiqueta.style.color = "#16a34a";
                    }
                }
            }
        });
    }
});
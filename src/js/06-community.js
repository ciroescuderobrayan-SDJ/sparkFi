document.addEventListener('DOMContentLoaded', () => {
    // Buscamos el primer post de Marta
    const primerPost = document.querySelector('.post-card');
    const btnComentar = document.querySelector('.comment-btn');
    const contadorTexto = document.querySelector('.comment-count');
    let totalComentarios = 0;

    if (primerPost) {
        // CREAMOS EL CONTENEDOR DE COMENTARIOS DESDE JS (Para no tocar HTML)
        const areaComentarios = document.createElement('div');
        areaComentarios.style.cssText = "display: none; margin-top: 15px; padding: 15px; background: #f8faff; border-radius: 15px; border: 1px solid #e4e7f2;";
        
        // Creamos la lista donde caerán los mensajes
        const listaMensajes = document.createElement('div');
        
        // Creamos el input y el botón
        const cajaInput = document.createElement('div');
        cajaInput.style.cssText = "display: flex; gap: 10px; margin-top: 10px;";
        cajaInput.innerHTML = `
            <input type="text" placeholder="Escribe un comentario..." style="flex: 1; padding: 10px; border-radius: 10px; border: 1px solid #ddd; outline: none;">
            <button style="background: #0a3dfe; color: white; border: none; padding: 8px 15px; border-radius: 10px; cursor: pointer; font-weight: 600;">Publicar</button>
        `;

        areaComentarios.appendChild(listaMensajes);
        areaComentarios.appendChild(cajaInput);
        primerPost.appendChild(areaComentarios);

        // Funcionalidad de abrir/cerrar
        if (btnComentar) {
            btnComentar.addEventListener('click', () => {
                areaComentarios.style.display = (areaComentarios.style.display === 'none') ? 'block' : 'none';
            });
        }

        // Funcionalidad de publicar
        const botonPublicar = cajaInput.querySelector('button');
        const inputTexto = cajaInput.querySelector('input');

        botonPublicar.addEventListener('click', () => {
            if (inputTexto.value.trim() !== "") {
                const nuevoComentario = document.createElement('div');
                nuevoComentario.style.cssText = "background: white; padding: 10px; border-radius: 10px; margin-bottom: 8px; border: 1px solid #eee; font-size: 14px;";
                nuevoComentario.innerHTML = `<strong>Juan:</strong> ${inputTexto.value}`;
                
                listaMensajes.appendChild(nuevoComentario);
                
                totalComentarios++;
                if (contadorTexto) contadorTexto.innerText = totalComentarios;
                inputTexto.value = ""; // Limpiar
            }
        });
    }
});
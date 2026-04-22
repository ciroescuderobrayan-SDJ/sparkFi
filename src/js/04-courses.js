// Cursos y sus datos

const cursos = [
  {
    id: "ahorro-intro",
    tema: "Ahorro",
    titulo: "Introducción al ahorro",
    icono: "🐷",
    progreso: 65,
    estado: "En curso",
    lecciones: [
      { icono: "🎟️", titulo: "Reducir gastos en entretenimiento" },
      { icono: "💸", titulo: "Guardar incremento salarial" },
      { icono: "🏦", titulo: "Separar ahorro fijo al inicio del mes" },
      { icono: "🔁", titulo: "Configurar transferencia automatica de ahorro" },
    ],
  },
  {
    id: "presupuesto-basico",
    tema: "Presupuesto",
    titulo: "Presupuesto básico",
    icono: "🧮",
    progreso: 20,
    estado: "En curso",
    lecciones: [
      { icono: "📝", titulo: "Registrar ingresos y gastos por categoría" },
      { icono: "📐", titulo: "Definir topes semanales realistas" },
      { icono: "📆", titulo: "Revisar gastos variables cada fin de semana" },
      { icono: "🧠", titulo: "Ajustar presupuesto segun resultados del mes" },
    ],
  },
  {
    id: "inversion-fundamentos",
    tema: "Inversión",
    titulo: "Fundamentos de inversión",
    icono: "📈",
    progreso: 0,
    estado: "Por iniciar",
    lecciones: [
      { icono: "⚖️", titulo: "Riesgo vs rentabilidad" },
      { icono: "⏳", titulo: "Interés compuesto y horizonte de tiempo" },
      { icono: "📊", titulo: "Diferencias entre renta fija y variable" },
      { icono: "🚀", titulo: "Como empezar con montos pequenos" },
    ],
  },
  {
    id: "fondo-emergencia",
    tema: "Ahorro",
    titulo: "Fondo de emergencia",
    icono: "🛟",
    progreso: 0,
    estado: "Por iniciar",
    lecciones: [
      { icono: "🧮", titulo: "Calcular 3 a 6 meses de gastos" },
      { icono: "🔒", titulo: "Elegir cuenta segura y líquida" },
      { icono: "📋", titulo: "Definir regla para usar el fondo" },
      { icono: "🧩", titulo: "Plan de reposicion del fondo tras emergencia" },
    ],
  },
  {
    id: "gastos-hormiga",
    tema: "Ahorro",
    titulo: "Control de gastos hormiga",
    icono: "🧾",
    progreso: 0,
    estado: "Por iniciar",
    lecciones: [
      { icono: "🔎", titulo: "Identificar fugas diarias de dinero" },
      { icono: "⏸️", titulo: "Aplicar regla de pausa antes de comprar" },
      { icono: "🛒", titulo: "Crear lista de compras consciente" },
      { icono: "📉", titulo: "Medir ahorro semanal por recorte de fugas" },
    ],
  },
  {
    id: "ahorro-objetivos",
    tema: "Ahorro",
    titulo: "Ahorro por objetivos",
    icono: "🎯",
    progreso: 0,
    estado: "Por iniciar",
    lecciones: [
      { icono: "🎯", titulo: "Definir metas SMART" },
      { icono: "🤖", titulo: "Automatizar aportes mensuales" },
      { icono: "🗂️", titulo: "Priorizar metas de corto y largo plazo" },
      { icono: "✅", titulo: "Monitorear avance con checkpoints mensuales" },
    ],
  },
  {
    id: "metodo-503020",
    tema: "Presupuesto",
    titulo: "Método 50/30/20",
    icono: "📊",
    progreso: 0,
    estado: "Por iniciar",
    lecciones: [
      { icono: "📊", titulo: "Separar necesidades, gustos y ahorro" },
      { icono: "🧭", titulo: "Ajustar porcentajes a tu realidad" },
      { icono: "📏", titulo: "Calcular limite mensual por categoria" },
      { icono: "♻️", titulo: "Corregir desbalance al cierre del mes" },
    ],
  },
  {
    id: "presupuesto-familiar",
    tema: "Presupuesto",
    titulo: "Presupuesto familiar",
    icono: "👨‍👩‍👧",
    progreso: 0,
    estado: "Por iniciar",
    lecciones: [
      { icono: "🏠", titulo: "Distribuir gastos del hogar" },
      { icono: "🛍️", titulo: "Planificar compras grandes" },
      { icono: "🛡️", titulo: "Establecer fondo para imprevistos familiares" },
      { icono: "🤝", titulo: "Definir metas compartidas en familia" },
    ],
  },
  {
    id: "inversion-indexados",
    tema: "Inversión",
    titulo: "Inversión en fondos indexados",
    icono: "💹",
    progreso: 0,
    estado: "Por iniciar",
    lecciones: [
      { icono: "📚", titulo: "Qué es un índice bursátil" },
      { icono: "🌍", titulo: "Cómo diversificar con bajo costo" },
      { icono: "💰", titulo: "Como evaluar comisiones del fondo" },
      { icono: "📅", titulo: "Estrategia de aportes periodicos" },
    ],
  },
  {
    id: "inversion-riesgo",
    tema: "Inversión",
    titulo: "Perfil de riesgo e inversión",
    icono: "⚖️",
    progreso: 0,
    estado: "Por iniciar",
    lecciones: [
      { icono: "🧠", titulo: "Identificar tu tolerancia al riesgo" },
      { icono: "🧾", titulo: "Elegir productos según tu perfil" },
      { icono: "🧱", titulo: "Balancear cartera segun horizonte" },
      { icono: "⚙️", titulo: "Rebalanceo basico cada trimestre" },
    ],
  },
];

// Filtro de la izquierda

const barraLateral = document.querySelector(".barra-lateral-cursos");
const inputBusqueda = document.querySelector(".campo-busqueda-cursos");
const contenedorLecciones = document.querySelector(".lista-cursos");

const textoMiga = document.querySelector(".texto-miga-cursos");
const porcentajeLeccion = document.querySelector(".porcentaje-leccion");
const listaLeccion = document.querySelector(".lista-leccion");
const barraLeccion = document.querySelector(".relleno-progreso-leccion");

let temaActivo = "Ahorro";
let textoBusqueda = "";
let cursoActivoId = null;

function obtenerCursosActivos() {
  return cursos.filter((curso) => curso.tema === temaActivo);
}

function obtenerCursosFiltrados() {
  return cursos.filter((curso) => {
    const coincideTexto = curso.titulo
      .toLowerCase()
      .includes(textoBusqueda.toLowerCase());

    return coincideTexto;
  });
}

if (inputBusqueda) {
  inputBusqueda.addEventListener("input", (e) => {
    textoBusqueda = e.target.value.trim();
    renderizarCursos();
  });

  inputBusqueda.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      textoBusqueda = e.target.value.trim();
      renderizarCursos();
    }
  });
}

function activarBotonSeleccionado(botonSeleccionado) {
  const botones = document.querySelectorAll(".boton-tema-curso");
  botones.forEach((boton) => boton.classList.remove("activo"));
  botonSeleccionado.classList.add("activo");
}

function renderizarCursos() {
  if (!barraLateral) {
    return;
  }

  const cursosActivos = obtenerCursosFiltrados();
  const botonesActuales = barraLateral.querySelectorAll(".boton-tema-curso");
  botonesActuales.forEach((boton) => boton.remove());

  if (!cursosActivos.length) {
    const vacio = document.createElement("p");
    vacio.className = "texto-progreso-curso";
    vacio.textContent = "No se encontraron cursos.";
    barraLateral.appendChild(vacio);
    return;
  }

  const mensajeVacioAnterior = barraLateral.querySelector(
    ".texto-progreso-curso",
  );
  if (mensajeVacioAnterior) {
    mensajeVacioAnterior.remove();
  }

  if (cursosActivos.length && !cursoActivoId) {
    cursoActivoId = cursosActivos[0].id;
  }

  if (cursosActivos.length && !cursosActivos.some((curso) => curso.id === cursoActivoId)) {
    cursoActivoId = cursosActivos[0].id;
  }

  const fragmento = document.createDocumentFragment();
  cursosActivos.forEach((curso) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "boton-tema-curso";
    if (curso.id === cursoActivoId) {
      boton.classList.add("activo");
    }
    boton.textContent = curso.titulo;
    fragmento.appendChild(boton);

    boton.addEventListener("click", () => {
      cursoActivoId = curso.id;
      activarBotonSeleccionado(boton);
      renderizarLeccionesCurso(curso);
      renderizarDetalleCurso(curso);
    });
  });

  barraLateral.appendChild(fragmento);

  const cursoActivo = cursosActivos.find((curso) => curso.id === cursoActivoId);
  renderizarLeccionesCurso(cursoActivo);
  renderizarDetalleCurso(cursoActivo);
}

renderizarCursos();

//Edición de la información del curso seleccionado

function renderizarLeccionesCurso(curso) {
  if (!contenedorLecciones || !curso) {
    return;
  }

  const totalLecciones = curso.lecciones.length;
  contenedorLecciones.innerHTML = curso.lecciones
    .map((leccion, index) => {
      const numero = index + 1;
      const textoBoton = numero === 1 ? "Estudiar" : "Ver lección";
      const claseBoton = numero === 1 ? "boton-curso" : "boton-curso boton-curso-secundario";

      return `
        <article class="tarjeta-curso">
          <div class="cuerpo-tarjeta-curso">
            <div class="icono-curso">${leccion.icono || "📘"}</div>

            <div class="info-curso">
              <h2 class="nombre-curso">${leccion.titulo || "Lección"}</h2>
              <p class="texto-progreso-curso">Lección ${numero} de ${totalLecciones}</p>

              <div class="barra-progreso">
                <div class="relleno-progreso" style="width:${Math.round((numero / totalLecciones) * 100)}%;"></div>
              </div>
            </div>
          </div>

          <button class="${claseBoton}">${textoBoton}</button>
        </article>
      `;
    })
    .join("");
}

function renderizarDetalleCurso(curso) {
  if (!curso) return;

  if (textoMiga) {
    textoMiga.textContent = "Cursos > " + curso.titulo + " > Lección 1";
  }

  if (porcentajeLeccion) {
    porcentajeLeccion.textContent = curso.progreso + "% completado";
  }

  if (barraLeccion) {
    barraLeccion.style.width = curso.progreso + "%";
  }

  if (listaLeccion) {
    const primeraLeccion = curso.lecciones[0];
    const icono = primeraLeccion?.icono || "📘";
    const titulo = primeraLeccion?.titulo || "Lección";

    listaLeccion.innerHTML =
      '<li class="item-leccion">' +
      '<span class="icono-item-leccion" aria-hidden="true">' + icono + "</span>" +
      '<span class="texto-item-leccion">' + titulo + "</span>" +
      "</li>";
  }
}

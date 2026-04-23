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

// Clase de color del ícono según el tema del curso
const colorIcono = {
  Ahorro: "course-icon-green",
  Presupuesto: "course-icon-yellow",
  "Inversión": "course-icon-lightgreen",
};

// Selección de elementos de la interfaz y estado global

const barraLateral = document.querySelector(".sidebar");
const inputBusqueda = document.querySelector(".campo-busqueda-cursos");
const contenedorLecciones = document.querySelector(".course-list");
const mensajeVacio = document.getElementById("mensaje-vacio-cursos");

const porcentajeLeccion = document.querySelector(".lesson-percentage");
const listaLeccion = document.querySelector(".lesson-list");
const barraLeccion = document.querySelector(".lesson-progress-fill");

let temaActivo = "Ahorro";
let textoBusqueda = "";
let cursoActivoId = null;


// Filtro de los cursos
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

// Escucha lo que el usuario escribe para filtrar la lista
if (inputBusqueda) {
  inputBusqueda.addEventListener("input", (e) => {
    textoBusqueda = e.target.value.trim();
    renderizarCursos();
  });
}

// para seleccionar el nuevo curso
function activarBotonSeleccionado(botonSeleccionado) {
  const botones = document.querySelectorAll(".sidebar-item");
  botones.forEach((boton) => boton.classList.remove("active"));
  botonSeleccionado.classList.add("active");
}

function renderizarCursos() {
  if (!barraLateral) {
    return;
  }

  const cursosActivos = obtenerCursosFiltrados();
  const botonesActuales = barraLateral.querySelectorAll(".sidebar-item");
  botonesActuales.forEach((boton) => boton.remove());

  // si no hay cursos encontrados
  if (mensajeVacio) {
    mensajeVacio.hidden = cursosActivos.length > 0;
  }
  if (cursosActivos.length === 0) return;

  // el curso visible según el input
  const cursoSigueVisible = cursosActivos.find(c => c.id === cursoActivoId);
  if (cursosActivos.length > 0 && !cursoSigueVisible) {
    cursoActivoId = cursosActivos[0].id;
  }

  // renderizado de los cursos buscados
  const fragmento = document.createDocumentFragment();
  cursosActivos.forEach((curso) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "sidebar-item";
    if (curso.id === cursoActivoId) {
      boton.classList.add("active");
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

// se pinta el contenido

function renderizarLeccionesCurso(curso) {
  if (!contenedorLecciones || !curso) {
    return;
  }

  const claseIcono = colorIcono[curso.tema] || "course-icon-blue";

  contenedorLecciones.innerHTML = curso.lecciones
    .map((leccion, index) => {
      const numero = index + 1;
      const textoBoton = numero === 1 ? "Estudiar" : "Ver lección";
      const claseBoton = numero === 1 ? "btn-secondary" : "btn-secondary btn-secondary-outline";

      return `
        <article class="course-card">
          <div class="course-left">
            <div class="course-icon ${claseIcono}">${leccion.icono || "📘"}</div>

            <div class="course-info">
              <h2 class="course-title">${leccion.titulo || "Lección"}</h2>
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
      "<li>" +
      "<span aria-hidden=\"true\">" + icono + "</span> " +
      titulo +
      "</li>";
  }
}

function completarCursoActivo() {
  const cursoActivo = cursos.find((curso) => curso.id === cursoActivoId);
  if (!cursoActivo) {
    return;
  }

  cursoActivo.progreso = 100;
  cursoActivo.estado = "Completado";
  renderizarDetalleCurso(cursoActivo);
}

const botonCompletarLeccion = document.querySelector(".boton-completar-leccion");
if (botonCompletarLeccion) {
  botonCompletarLeccion.addEventListener("click", completarCursoActivo);
}

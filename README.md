# SparkFi — Plataforma Educativa de Finanzas Personales

SparkFi es un prototipo de aplicación web orientada a la educación financiera personal. Ofrece una experiencia interactiva con cursos, retos, gamificación y seguimiento visual del progreso, construida íntegramente con tecnologías web fundamentales sin dependencias externas.

---

## Tabla de contenidos

- [Vista previa](#vista-previa)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación y uso](#instalación-y-uso)
- [Credenciales de prueba](#credenciales-de-prueba)
- [Navegación](#navegación)
- [Diseño visual](#diseño-visual)

---

## Vista previa

| Login | Home | Cursos |
|-------|------|--------|
| ![Login](src/images/mockups/01-login.png) | ![Home](src/images/mockups/03-home.png) | ![Cursos](src/images/mockups/04-courses.png) |

| Retos | Comunidad | Perfil |
|-------|-----------|--------|
| ![Retos](src/images/mockups/05-challenges.png) | ![Comunidad](src/images/mockups/06-community.png) | ![Perfil](src/images/mockups/07-profile.png) |

---

## Características

- **Autenticación simulada** — login y registro con validación en el lado del cliente
- **Dashboard principal** — resumen del progreso, cursos activos y estadísticas financieras
- **Cursos interactivos** — módulos de educación financiera organizados por tema y nivel
- **Retos financieros** — sistema de desafíos con seguimiento de avance y puntuación
- **Comunidad** — sección social para interacción entre usuarios
- **Perfil de usuario** — historial de actividad, logros y estadísticas personales
- **Configuración** — preferencias de cuenta y personalización
- **Diseño responsive** — adaptado para móvil, tablet y escritorio

---

## Tecnologías

| Tecnología | Uso |
|------------|-----|
| HTML5 | Estructura semántica de las vistas |
| CSS3 | Estilos, layout y responsividad |
| JavaScript (Vanilla) | Interactividad y lógica del cliente |
| SVG | Iconografía vectorial personalizada |
| Google Fonts (Inter) | Tipografía del sistema |

> No requiere instalación de dependencias ni herramientas de construcción (build tools).

---

## Estructura del proyecto

```
sparkFi/
├── index.html                  # Punto de entrada → redirige a login
├── src/
│   ├── html/
│   │   ├── 01-login.html
│   │   ├── 02-create-account.html
│   │   ├── 03-home.html
│   │   ├── 04-courses.html
│   │   ├── 05-challenges.html
│   │   ├── 06-community.html
│   │   ├── 07-profile.html
│   │   └── 08-settings.html
│   ├── css/
│   │   ├── index.css           # Estilos globales compartidos
│   │   ├── 01-login.css
│   │   ├── 02-create-account.css
│   │   └── ...                 # Un archivo por vista
│   ├── js/
│   │   ├── 01-login.js
│   │   ├── 02-create-account.js
│   │   └── ...                 # Un archivo por vista
│   └── images/
│       └── mockups/            # Capturas de diseño (PNG)
```

**Convención de nombres:** los archivos usan prefijos de dos dígitos (`01-`, `02-`, ...) para mantener un orden lógico y evitar conflictos de ordenamiento alfabético en proyectos con múltiples vistas.

---

## Instalación y uso

**Requisitos previos:** [VS Code](https://code.visualstudio.com/) con la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

```bash
# 1. Clonar el repositorio
git clone https://github.com/usuario/sparkfi.git

# 2. Entrar al directorio
cd sparkfi
```

Luego, dentro de VS Code:

1. Abrir la carpeta del proyecto
2. Hacer clic derecho sobre `index.html`
3. Seleccionar **"Open with Live Server"**

El navegador abrirá automáticamente la pantalla de login.

---

## Credenciales de prueba

Para explorar la aplicación sin necesidad de registrarse, se pueden usar las siguientes credenciales:

| Campo | Valor |
|-------|-------|
| Correo | `admin@sparkfi.com` |
| Contraseña | `sparkfi123` |

---

## Navegación

| # | Vista | Ruta |
|---|-------|------|
| 01 | Login | `src/html/01-login.html` |
| 02 | Registro | `src/html/02-create-account.html` |
| 03 | Home / Dashboard | `src/html/03-home.html` |
| 04 | Cursos | `src/html/04-courses.html` |
| 05 | Retos | `src/html/05-challenges.html` |
| 06 | Comunidad | `src/html/06-community.html` |
| 07 | Perfil | `src/html/07-profile.html` |
| 08 | Configuración | `src/html/08-settings.html` |

---

## Diseño visual

### Paleta de colores

| Variable | Hex | Uso |
|----------|-----|-----|
| Verde principal | `#22D74F` | Acciones primarias, éxito |
| Verde suave | `#00D369` | Acentos secundarios |
| Azul primario | `#006AF8` | Botones, enlaces |
| Azul fuerte | `#0A3DFE` | Énfasis y hover |
| Amarillo | `#FFD838` | Alertas, logros |
| Fondo general | `#F7F9FF` | Background de la app |
| Superficie | `#FFFFFF` | Tarjetas y modales |
| Bordes | `#E4E7F2` | Separadores y outlines |
| Texto principal | `#181F34` | Títulos y cuerpo |
| Texto secundario | `#3C4A5F` | Subtítulos y etiquetas |

### Tipografía

**Inter** — Google Fonts  
Usada en todos los pesos desde `Regular 400` hasta `Bold 700` según jerarquía visual.

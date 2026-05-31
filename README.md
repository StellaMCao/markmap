# Herramientas Visuales Interactivas

¡Bienvenido/a! Este repositorio contiene dos potentes aplicaciones web estáticas y auto-contenidas diseñadas para facilitar la creación de mapas conceptuales interactivos y el diseño visual estructurado directamente desde tu navegador.

👉 **[Acceder al Menú Principal en GitHub Pages](https://stellamcao.github.io/markmap/)**

---

## 🚀 Aplicaciones Incluidas

El repositorio se organiza de forma extremadamente limpia, conteniendo únicamente las siguientes herramientas accesibles a través de un menú de inicio unificado:

### 1. 🗺️ Generador Markmap (`/markmap`)
Un editor de Markdown avanzado que genera mapas conceptuales interactivos y dinámicos en tiempo real. 
- **Despliegue Flexible**: Permite forzar el nivel de profundidad inicial del mapa (desde solo título hasta apertura total) y recordar de forma inteligente las ramas abiertas/cerradas manualmente.
- **Estilo de Texto Enriquecido**: Soporte para negrita, cursiva, código con resaltado de sintaxis (`Highlight.js`), tablas estructuradas e inserción de fórmulas matemáticas complejas mediante `KaTeX`.
- **Integración Multimedia**: Inserción optimizada de imágenes (con selección de ancho en píxeles) y reproductores de audio embebidos, con soporte especial para enlaces compartidos de **Google Drive**.
- **Motor de Búsqueda Integrado**: Permite buscar términos dentro de los nodos y resaltar las coincidencias al instante.
- **Personalización Visual Extensa**:
  - **Presets**: Lectura, Compacto, Presentación, Dense y Oscuro.
  - **Paletas de Colores**: Clásico, Océano, Bosque, Atardecer y Monocromático.
  - **Tipografías**: Sistema, Serif, Mono, Redondeada, Humanista, Geométrica, Condensada, Slab y Libro.
  - **Ajustes Finos**: Grosor de línea, tamaño de texto global y personalizado por nivel de profundidad, espaciados horizontal/vertical, tiempos de animación de transición y tema claro/oscuro.
- **Formatos de Exportación**:
  - **HTML Interactivo**: Exporta el mapa completo y auto-contenido, manteniendo la interactividad, zoom, fórmulas KaTeX, estilos y reproductores de audio.
  - **Imágenes**: Descarga el mapa como vector `SVG` de alta calidad o como imagen `PNG`.
  - **Fuentes**: Guarda el archivo `.md` original o cópialo directamente al portapapeles.

### 2. 🎨 Estudio de Diseños (`/design-studio`)
Un espacio de trabajo y editor visual multipropósito diseñado para crear una amplia variedad de esquemas estructurados de forma ágil y estética:
- Diagramas de flujo y mapas mentales interactivos.
- Wireframes de interfaces y maquetaciones rápidas.
- Moodboards visuales inspiracionales.
- Hojas de ruta (Roadmaps) y presentaciones secuenciales por pasos.
- Interfaz completamente estática, ejecutada al 100% en el navegador del cliente sin necesidad de servidores.

---

## 🛠️ Estructura del Repositorio

El repositorio ha sido optimizado y limpiado a fondo para eliminar dependencias obsoletas del código fuente de markmap original. Ahora cuenta con una arquitectura puramente estática:

```text
├── .github/workflows/pages.yml  # Automatización de despliegue en GitHub Pages
├── design-studio/               # Aplicación Estudio de Diseños
│   └── index.html               # Aplicación auto-contenida (estilos y lógica embebidos)
├── markmap/                     # Aplicación Generador Markmap
│   └── index.html               # Aplicación auto-contenida (estilos y lógica embebidos)
├── .gitignore                   # Archivos ignorados por Git
├── .nojekyll                    # Deshabilita el motor Jekyll en GitHub Pages
├── index.html                   # Menú de inicio (Landing page principal)
├── LICENSE                      # Licencia del proyecto
└── README.md                    # Esta guía
```

---

## 🌐 Despliegue e Integración Continua

El repositorio se compila y despliega automáticamente a GitHub Pages en cada cambio a la rama principal (`master`) a través de **GitHub Actions**.

- **Workflow**: `.github/workflows/pages.yml`
- **Configuración de Despliegue**: Se sirve directamente desde la raíz del proyecto (`path: .`), permitiendo un acceso directo y veloz a todas las herramientas.

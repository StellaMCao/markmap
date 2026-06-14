const sample = `# Mapas Conceptuales con Markmap\n\n## ¿Qué es Markmap?\n- Herramienta de visualización interactiva\n- Traduce texto en formato **Markdown** a un mapa mental visual\n- Permite contraer y expandir ramas con un clic\n\n## Ventajas\n- **Estructura clara**: Jerarquía visual inmediata\n- **Interactividad**: Zoom, paneo y colapso de nodos\n- **Portabilidad**: Exportación a HTML interactivo, SVG y PNG\n- **Soporte KaTeX**: Fórmulas matemáticas como $E = mc^2$\n\n## Formato Markdown Soportado\n- **Estilo de texto**: *Cursiva* para énfasis, **negrita** para conceptos clave\n- **Listas ordenadas**: Estructura de ramas jerárquicas\n- **Tablas**: Comparación de datos rápidos\n\n## Cómo Empezar\n- Escribe tu texto en el editor de la izquierda\n- Usa guiones (-) para añadir subconceptos\n- Ajusta colores y fuentes en la barra de configuración`;

const tableSnippet = `\n\n## Tabla\n\n| Columna | Detalle | Estado |\n| --- | --- | --- |\n| HTML | Exporta interactividad | Listo |\n| SVG | Exporta imagen vectorial | Listo |\n| PNG | Puede depender de imágenes externas | Variable |\n`;

const templates = {
  standard: sample,
  simple: `# Mapa Mental Simple\n\n## Idea Central\n- Subtema 1\n  - Detalle A\n  - Detalle B\n- Subtema 2\n  - Detalle C\n  - Detalle D\n- Subtema 3\n  - Detalle E`,
  math: `# KaTeX Fórmulas Matemáticas\n\n## Ecuaciones Álgebra\n- Cuadrática: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$\n- Binomio: $(a+b)^2 = a^2 + 2ab + b^2$\n\n## Cálculo y Física\n- Identidad de Euler: $e^{i\\pi} + 1 = 0$\n- Relatividad: $E = mc^2$\n- Derivadas: $\\frac{d}{dx}(e^x) = e^x$\n- Integración:\n  - $\\displaystyle \\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}$`,
  table: `# Listas y Tablas\n\n## Resumen de Opciones\n| Opción | Formato | interactivo |\n| --- | --- | --- |\n| HTML | .html | Sí |\n| SVG | .svg | Estático |\n| PNG | .png | Imagen |\n\n## Tareas Pendientes\n- [x] Diseñar interfaz premium\n- [x] Separar lógica y estilos\n- [ ] Probar compatibilidad en local\n- [ ] Subir cambios a GitHub`
};

const scripts = [
  'https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js',
  'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js',
  'https://cdn.jsdelivr.net/npm/highlight.js@11.8.0/highlight.min.js',
  'https://cdn.jsdelivr.net/npm/markmap-lib@0.18.12/dist/browser/index.iife.min.js',
  'https://cdn.jsdelivr.net/npm/markmap-view@0.18.12/dist/browser/index.min.js'
];

const palettes = {
  classic: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#17becf'],
  ocean: ['#005f73', '#0a9396', '#94d2bd', '#3a86ff', '#4361ee', '#4895ef'],
  forest: ['#386641', '#6a994e', '#a7c957', '#2d6a4f', '#40916c', '#74c69d'],
  sunset: ['#9b2226', '#bb3e03', '#ca6702', '#ee9b00', '#ae2012', '#e76f51'],
  neon: ['#ff007f', '#00f0ff', '#ff00ff', '#39ff14', '#ffff00', '#7b2cbf'],
  pastel: ['#b388ff', '#ff8a80', '#ff80ab', '#a7ffeb', '#82b1ff', '#ffe082'],
  vintage: ['#e29578', '#dd6e42', '#e8c547', '#4d9078', '#8f2d56', '#b5e2fa'],
  grape: ['#4a154b', '#6b11ff', '#b388ff', '#d500f9', '#ea80fc'],
  candy: ['#ff1744', '#00e5ff', '#ffea00', '#00e676', '#ff9100', '#d500f9'],
  mono: ['#111827', '#374151', '#4b5563', '#6b7280', '#0f766e']
};

const fonts = {
  system: 'Outfit, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  inter: 'Inter, ui-sans-serif, system-ui, sans-serif',
  poppins: 'Poppins, sans-serif',
  quicksand: 'Quicksand, sans-serif',
  serif: 'Lora, Georgia, Cambria, "Times New Roman", serif',
  playfair: '"Playfair Display", Georgia, serif',
  cinzel: 'Cinzel, Georgia, serif',
  mono: '"Fira Code", Consolas, "Liberation Mono", Menlo, monospace',
  jetbrains: '"JetBrains Mono", monospace',
  rounded: '"Trebuchet MS", "Segoe UI", ui-sans-serif, sans-serif',
  humanist: 'Candara, "Aptos", "Segoe UI", ui-sans-serif, sans-serif',
  geometric: 'Avenir Next, Avenir, Montserrat, "Segoe UI", ui-sans-serif, sans-serif',
  narrow: '"Arial Narrow", "Aptos Narrow", "Roboto Condensed", Arial, sans-serif',
  slab: 'Rockwell, "Roboto Slab", "Courier New", serif',
  book: 'Palatino, "Palatino Linotype", "Book Antiqua", Georgia, serif'
};

const visualPresets = {
  lecture: {
    palette: 'classic', font: 'book', textSize: 1.18, textColor: 'auto', lineWidth: 1.8,
    widthRules: { 1: 520, 2: 460, 3: 400, 4: 360 },
    textSizeRules: { 1: 1.22, 2: 1.1, 3: 1, 4: 0.96 },
    spacingHorizontal: 92, spacingVertical: 10, theme: 'light'
  },
  compact: {
    palette: 'ocean', font: 'system', textSize: 0.86, textColor: 'auto', lineWidth: 1.2,
    widthRules: { 1: 300, 2: 250, 3: 220, 4: 190 },
    textSizeRules: { 1: 1.12, 2: 1.02, 3: 0.94, 4: 0.9 },
    spacingHorizontal: 54, spacingVertical: 4, theme: 'light'
  },
  presentation: {
    palette: 'sunset', font: 'slab', textSize: 1.36, textColor: 'auto', lineWidth: 2.4,
    widthRules: { 1: 680, 2: 560, 3: 480, 4: 420 },
    textSizeRules: { 1: 1.2, 2: 1.08, 3: 1, 4: 0.94 },
    spacingHorizontal: 110, spacingVertical: 14, theme: 'light'
  },
  dense: {
    palette: 'forest', font: 'narrow', textSize: 0.86, textColor: 'auto', lineWidth: 1,
    widthRules: { 1: 360, 2: 300, 3: 260, 4: 230 },
    textSizeRules: { 1: 1.08, 2: 1, 3: 0.92, 4: 0.88 },
    spacingHorizontal: 46, spacingVertical: 2, theme: 'light'
  },
  dark: {
    palette: 'mono', font: 'humanist', textSize: 1, textColor: 'auto', lineWidth: 1.7,
    widthRules: { 1: 460, 2: 390, 3: 340, 4: 300 },
    textSizeRules: { 1: 1.18, 2: 1.08, 3: 1, 4: 0.94 },
    spacingHorizontal: 78, spacingVertical: 8, theme: 'dark'
  }
};

const widthProfiles = {
  compact: [260, 220, 190, 170],
  normal: [420, 360, 320, 280],
  wide: [620, 520, 460, 400]
};

const defaultWidthRules = { 1: 420, 2: 360, 3: 320, 4: 280 };
const defaultTextSizeRules = { 1: 1.18, 2: 1.08, 3: 1, 4: 0.94, 5: 0.9 };
let widthRules = { ...defaultWidthRules };
let textSizeRules = { ...defaultTextSizeRules };

const accents = {
  teal: { accent: '#0f766e', hover: '#0d9488', light: 'rgba(15, 118, 110, 0.1)', glow: 'rgba(15, 118, 110, 0.15)' },
  indigo: { accent: '#4f46e5', hover: '#6366f1', light: 'rgba(79, 70, 229, 0.1)', glow: 'rgba(79, 70, 229, 0.15)' },
  violet: { accent: '#7c3aed', hover: '#8b5cf6', light: 'rgba(124, 58, 237, 0.1)', glow: 'rgba(124, 58, 237, 0.15)' },
  rose: { accent: '#e11d48', hover: '#f43f5e', light: 'rgba(225, 29, 72, 0.1)', glow: 'rgba(225, 29, 72, 0.15)' },
  amber: { accent: '#d97706', hover: '#f59e0b', light: 'rgba(217, 119, 6, 0.1)', glow: 'rgba(217, 119, 6, 0.15)' },
  emerald: { accent: '#059669', hover: '#10b981', light: 'rgba(5, 150, 105, 0.1)', glow: 'rgba(5, 150, 105, 0.15)' }
};

function applyAccentColor(name) {
  const colors = accents[name] || accents.teal;
  document.documentElement.style.setProperty('--accent', colors.accent);
  document.documentElement.style.setProperty('--accent-hover', colors.hover);
  document.documentElement.style.setProperty('--accent-light', colors.light);
  document.documentElement.style.setProperty('--accent-glow', colors.glow);
  localStorage.setItem('markmap-repl-accent', name);
  
  const buttons = document.querySelectorAll('#accent-picker-container button');
  buttons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.color === name);
  });
}

// Undo/Redo Class
class HistoryManager {
  constructor(initialValue, onRestore) {
    this.stack = [initialValue];
    this.index = 0;
    this.onRestore = onRestore;
    this.maxSize = 100;
  }
  push(value) {
    if (this.stack[this.index] === value) return;
    this.stack = this.stack.slice(0, this.index + 1);
    this.stack.push(value);
    if (this.stack.length > this.maxSize) {
      this.stack.shift();
    } else {
      this.index++;
    }
    this.updateButtons();
  }
  undo() {
    if (this.index > 0) {
      this.index--;
      this.onRestore(this.stack[this.index]);
      this.updateButtons();
      return true;
    }
    return false;
  }
  redo() {
    if (this.index < this.stack.length - 1) {
      this.index++;
      this.onRestore(this.stack[this.index]);
      this.updateButtons();
      return true;
    }
    return false;
  }
  updateButtons() {
    const undoBtn = document.querySelector('#undo');
    const redoBtn = document.querySelector('#redo');
    if (undoBtn) undoBtn.disabled = this.index === 0;
    if (redoBtn) redoBtn.disabled = this.index === this.stack.length - 1;
  }
}

// DOM Elements
let textarea, levelSelect, foldModeSelect, paletteSelect, presetSelect, fontSelect;
let textSizeSelect, textColorSelect, lineWidthSelect, widthLevelInput, widthPxInput;
let widthSummary, textLevelInput, textPercentInput, textSizeSummary;
let spacingHInput, spacingVInput, durationInput, themeSelect, circleSizeInput;
let fileInput, countText, statusToast, helpOverlay, searchInput, searchSummary;
let splitterElement, svg, editorPane, sidebarPane;

let transformer;
let mm;
let renderTimer;
let isLocked = false;
let historyManager;

// Functions
function colorFor(paletteName) {
  const colors = palettes[paletteName] || palettes.classic;
  return (node) => colors[Math.max(0, (node.state?.depth || 1) - 1) % colors.length];
}

function currentSettings() {
  return {
    level: Math.max(-1, Number(levelSelect.value) || 0),
    foldMode: foldModeSelect.value,
    palette: paletteSelect.value,
    font: fontSelect.value,
    textSize: Number(textSizeSelect.value),
    textSizeRules: { ...textSizeRules },
    textColor: textColorSelect.value,
    lineWidth: Number(lineWidthSelect.value),
    widthRules: { ...widthRules },
    spacingHorizontal: Number(spacingHInput.value) || 78,
    spacingVertical: Number(spacingVInput.value) || 7,
    duration: Math.max(0, Number(durationInput.value) || 0),
    theme: themeSelect.value,
    circleRadius: Number(circleSizeInput.value) || 7
  };
}

function sanitizeWidthRules(rules) {
  const next = {};
  Object.entries(rules || {}).forEach(([level, width]) => {
    const numericLevel = Math.max(1, Math.round(Number(level)));
    const numericWidth = Math.max(80, Math.min(1200, Math.round(Number(width))));
    if (Number.isFinite(numericLevel) && Number.isFinite(numericWidth)) next[numericLevel] = numericWidth;
  });
  return Object.keys(next).length ? next : { ...defaultWidthRules };
}

function sanitizeTextSizeRules(rules) {
  const next = {};
  Object.entries(rules || {}).forEach(([level, size]) => {
    const numericLevel = Math.max(1, Math.round(Number(level)));
    const numericSize = Math.max(0.4, Math.min(2.4, Number(size)));
    if (Number.isFinite(numericLevel) && Number.isFinite(numericSize)) {
      next[numericLevel] = Math.round(numericSize * 100) / 100;
    }
  });
  return Object.keys(next).length ? next : { ...defaultTextSizeRules };
}

function widthRulesFromProfile(profileName) {
  const profile = widthProfiles[profileName] || widthProfiles.normal;
  return Object.fromEntries(profile.map((width, index) => [index + 1, width]));
}

function widthForDepth(rules, depth) {
  const sanitized = sanitizeWidthRules(rules);
  const levels = Object.keys(sanitized).map(Number).sort((a, b) => a - b);
  const matchedLevel = levels.filter((level) => level <= depth).pop() || levels[0];
  return sanitized[matchedLevel];
}

function widthCssFor(rules) {
  return Array.from({ length: 32 }, (_, index) => {
    const depth = index + 1;
    const width = widthForDepth(rules, depth);
    return [
      `.markmap-node[data-depth="${depth}"] .markmap-foreign > div{width:${width}px;max-width:${width}px}`,
      `.markmap-node[data-depth="${depth}"] .markmap-foreign > div > div{max-width:${width}px;white-space:normal;overflow-wrap:anywhere}`
    ].join('\n');
  }).join('\n');
}

function textSizeForDepth(rules, depth) {
  const sanitized = sanitizeTextSizeRules(rules);
  const levels = Object.keys(sanitized).map(Number).sort((a, b) => a - b);
  const matchedLevel = levels.filter((level) => level <= depth).pop() || levels[0];
  return sanitized[matchedLevel];
}

function textSizeCssFor(rules) {
  return Array.from({ length: 32 }, (_, index) => {
    const depth = index + 1;
    return `.markmap-node[data-depth="${depth}"] .markmap-foreign > div{font-size:calc(var(--map-font-size) * ${textSizeForDepth(rules, depth)})}`;
  }).join('\n');
}

function updateWidthSummary() {
  widthSummary.textContent = Object.entries(sanitizeWidthRules(widthRules))
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([level, width]) => `N${level}:${width}px`)
    .join(' ');
}

function updateTextSizeSummary() {
  textSizeSummary.textContent = Object.entries(sanitizeTextSizeRules(textSizeRules))
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([level, size]) => `N${level}:${Math.round(size * 100)}%`)
    .join(' ');
}

function applySettingsToControls(settings) {
  if (settings.palette && palettes[settings.palette]) {
    paletteSelect.value = settings.palette;
    updateVisualPaletteGrid(settings.palette);
  }
  if (settings.font && fonts[settings.font]) fontSelect.value = settings.font;
  if (settings.textSize) textSizeSelect.value = String(settings.textSize);
  if (settings.textColor) textColorSelect.value = settings.textColor;
  if (settings.lineWidth) lineWidthSelect.value = String(settings.lineWidth);
  if (settings.widthRules) widthRules = sanitizeWidthRules(settings.widthRules);
  if (settings.textSizeRules) textSizeRules = sanitizeTextSizeRules(settings.textSizeRules);
  if (settings.spacingHorizontal) spacingHInput.value = String(settings.spacingHorizontal);
  if (settings.spacingVertical != null) spacingVInput.value = String(settings.spacingVertical);
  if (settings.theme === 'dark' || settings.theme === 'light') {
    themeSelect.value = settings.theme;
    document.body.dataset.theme = settings.theme;
  }
  if (settings.circleRadius) {
    circleSizeInput.value = String(settings.circleRadius);
  } else {
    circleSizeInput.value = '7';
  }
  widthLevelInput.value = '1';
  widthPxInput.value = String(sanitizeWidthRules(widthRules)[1] || 420);
  textLevelInput.value = '1';
  textPercentInput.value = String(Math.round((sanitizeTextSizeRules(textSizeRules)[1] || 1) * 100));
  updateWidthSummary();
  updateTextSizeSummary();
  applyUiSettings();
}

function applyUiSettings(settings = currentSettings()) {
  document.body.dataset.theme = settings.theme;
  document.documentElement.style.setProperty('--map-font', fonts[settings.font] || fonts.system);
  document.documentElement.style.setProperty('--map-font-size', `${settings.textSize || 1}em`);
  document.documentElement.style.setProperty('--map-text', settings.textColor === 'auto' ? 'var(--text-primary)' : settings.textColor);
  document.documentElement.style.setProperty('--circle-radius', `${settings.circleRadius || 7}px`);
}

function markmapOptions(settings = currentSettings()) {
  return {
    autoFit: false,
    duration: settings.duration,
    initialExpandLevel: -1,
    color: colorFor(settings.palette),
    lineWidth: () => Math.max(0.5, settings.lineWidth),
    maxWidth: 0,
    style: () => `${widthCssFor(settings.widthRules)}\n${textSizeCssFor(settings.textSizeRules)}`,
    spacingHorizontal: settings.spacingHorizontal,
    spacingVertical: settings.spacingVertical
  };
}

function cloneWithoutFold(node) {
  const payload = node.payload ? { ...node.payload } : undefined;
  if (payload) delete payload.fold;
  return {
    ...node,
    payload,
    children: node.children?.map(cloneWithoutFold) || []
  };
}

function cloneWithLevelFold(node, visibleLevel, depth = 1) {
  const payload = node.payload ? { ...node.payload } : {};
  delete payload.fold;
  if (visibleLevel >= 0 && depth >= visibleLevel + 1 && node.children?.length) payload.fold = 1;
  return {
    ...node,
    payload: Object.keys(payload).length ? payload : undefined,
    children: node.children?.map((child) => cloneWithLevelFold(child, visibleLevel, depth + 1)) || []
  };
}

function prepareRootForFoldMode(root, settings) {
  if (settings.foldMode === 'strict') return cloneWithLevelFold(root, settings.level);
  return cloneWithoutFold(root);
}

function showToast(message, isError = false) {
  statusToast.textContent = message;
  statusToast.classList.remove('hidden');
  statusToast.classList.toggle('error', isError);
  
  // Auto-hide after 5 seconds unless error
  if (!isError) {
    setTimeout(() => {
      statusToast.classList.add('hidden');
    }, 4500);
  }
}

function encodeState(markdown, settings) {
  return btoa(unescape(encodeURIComponent(JSON.stringify({ markdown, settings }))));
}

function decodeState(hash) {
  if (!hash.startsWith('#m=')) return null;
  try { return JSON.parse(decodeURIComponent(escape(atob(hash.slice(3))))); }
  catch (error) { return null; }
}

function triggerSaveAnimation() {
  const dot = document.querySelector('#autosave-dot');
  const label = document.querySelector('#autosave-label');
  if (dot && label) {
    dot.classList.add('saving');
    label.textContent = 'Guardando...';
    setTimeout(() => {
      dot.classList.remove('saving');
      label.textContent = 'Guardado';
    }, 800);
  }
}

function persist() {
  try {
    localStorage.setItem('markmap-repl-markdown', textarea.value);
    localStorage.setItem('markmap-repl-settings', JSON.stringify(currentSettings()));
    triggerSaveAnimation();
  } catch (error) {}
}

function loadSettings(settings = {}) {
  if (settings.level != null) levelSelect.value = String(Math.max(-1, Number(settings.level)));
  if (settings.foldMode === 'memory' || settings.foldMode === 'strict') foldModeSelect.value = settings.foldMode;
  applySettingsToControls(settings);
  if (settings.widthRules) widthRules = sanitizeWidthRules(settings.widthRules);
  else if (settings.nodeWidth) widthRules = widthRulesFromProfile(settings.nodeWidth);
  if (settings.duration != null) durationInput.value = String(settings.duration);
  applyUiSettings();
  updateWidthSummary();
  updateTextSizeSummary();
}

function restore() {
  const shared = decodeState(location.hash);
  if (shared) {
    textarea.value = shared.markdown || sample;
    loadSettings(shared.settings || {});
    historyManager = new HistoryManager(textarea.value, (val) => { textarea.value = val; render(); });
    return;
  }
  try {
    const storedSettings = JSON.parse(localStorage.getItem('markmap-repl-settings') || '{}');
    const storedMarkdown = localStorage.getItem('markmap-repl-markdown') || sample;
    textarea.value = storedMarkdown;
    loadSettings(storedSettings);
  } catch (error) {
    textarea.value = sample;
    loadSettings();
  }
  historyManager = new HistoryManager(textarea.value, (val) => { textarea.value = val; render(); });
}

function download(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function mapTitle() {
  const firstHeading = textarea.value.match(/^#\s+(.+)$/m)?.[1] || 'markmap';
  return firstHeading
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase() || 'markmap';
}

function fileName(extension) {
  return `${mapTitle()}.${extension}`;
}

function configureMapLinks(container = svg) {
  container.querySelectorAll('.markmap-foreign a').forEach((link) => {
    if (!link.getAttribute('href')?.startsWith('#')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
    if (link.dataset.mapLinkReady) return;
    link.dataset.mapLinkReady = '1';
    ['pointerdown', 'mousedown', 'click', 'dblclick'].forEach((eventName) => {
      link.addEventListener(eventName, (event) => event.stopPropagation());
    });
  });
}

function normalizeText(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function expandMatchingNodes(node, query) {
  let hasMatchInDescendants = false;
  const nodeText = normalizeText(node.content || '');
  const matchedSelf = nodeText.includes(query);
  
  if (node.children && node.children.length > 0) {
    node.children.forEach((child) => {
      const childHasMatch = expandMatchingNodes(child, query);
      if (childHasMatch) {
        hasMatchInDescendants = true;
      }
    });
  }
  
  const matched = matchedSelf || hasMatchInDescendants;
  if (matched) {
    if (node.payload) {
      delete node.payload.fold;
    }
  }
  return matched;
}

function clearSearch({ silent = false } = {}) {
  svg.querySelectorAll('.markmap-node.search-hit').forEach((node) => node.classList.remove('search-hit'));
  searchSummary.textContent = '';
  if (!silent) {
    searchInput.value = '';
    render().then(() => showToast('Búsqueda limpia.'));
  }
}

function searchMap({ fitFirst = false } = {}) {
  const query = normalizeText(searchInput.value.trim());
  svg.querySelectorAll('.markmap-node.search-hit').forEach((node) => node.classList.remove('search-hit'));
  if (!query) {
    searchSummary.textContent = '';
    return;
  }
  const matches = Array.from(svg.querySelectorAll('.markmap-node')).filter((node) => {
    const text = normalizeText(node.textContent || '');
    const matched = text.includes(query);
    node.classList.toggle('search-hit', matched);
    return matched;
  });
  searchSummary.textContent = matches.length ? `${matches.length} coincidencias` : 'Sin resultados';
  if (matches.length && fitFirst) mm?.fit();
  showToast(matches.length
    ? `Búsqueda: ${matches.length} nodo(s) resaltado(s).`
    : 'No encontré coincidencias visibles. Si una rama está cerrada, abrila o usá Abrir todo.');
}

function updateEditorStats() {
  const text = textarea.value;
  const chars = text.length;
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  // Estimate reading time: 200 words per minute
  const readingTime = Math.ceil(words / 200);
  countText.textContent = `${chars} caracteres | ${words} palabras | ~${readingTime} min lectura`;
}

async function render() {
  if (!transformer || !mm) return;
  updateEditorStats();
  applyUiSettings();
  persist();
  try {
    const { root } = transformer.transform(textarea.value.trim() || '# Markmap');
    const settings = currentSettings();
    let displayRoot = prepareRootForFoldMode(root, settings);
    
    // Smart Search Expansion
    const query = normalizeText(searchInput.value.trim());
    if (query) {
      expandMatchingNodes(displayRoot, query);
    }
    
    await mm.setData(displayRoot, markmapOptions(settings));
    configureMapLinks();
    searchMap();
    await mm.fit();
  } catch (error) {
    showToast(error.message || 'No se pudo renderizar el mapa.', true);
  }
}

function scheduleRender() {
  clearTimeout(renderTimer);
  renderTimer = setTimeout(render, 160);
}

function insertAtCursor(text) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const before = textarea.value.slice(0, start);
  const after = textarea.value.slice(end);
  textarea.value = `${before}${text}${after}`;
  textarea.focus();
  textarea.selectionStart = textarea.selectionEnd = start + text.length;
  historyManager.push(textarea.value);
  render();
}

function driveFileId(url) {
  const trimmed = url.trim();
  const match = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/) || trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return match?.[1] || '';
}

function directDriveUrl(url, type = 'download') {
  const trimmed = url.trim();
  const id = driveFileId(trimmed);
  if (!id) return trimmed;
  if (type === 'image') return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
  if (type === 'preview') return `https://drive.google.com/file/d/${id}/preview`;
  return `https://drive.google.com/uc?export=download&id=${id}`;
}

function insertImage() {
  const rawUrl = prompt('Pegá una URL pública de imagen o un enlace compartido de Drive:');
  if (!rawUrl) return;
  const alt = prompt('Texto alternativo:', 'Imagen') || 'Imagen';
  const width = Math.max(80, Math.min(900, Math.round(Number(prompt('Ancho de imagen en px:', '240')) || 240)));
  const src = directDriveUrl(rawUrl, 'image');
  insertAtCursor(`\n- ${alt}\n  <span class="media-image" style="display:inline-block;width:${width}px"> <img src="${src}" alt="${alt}"> </span>\n`);
}

function insertAudio() {
  const rawUrl = prompt('Pegá una URL pública de audio o un enlace compartido de Drive:');
  if (!rawUrl) return;
  const label = prompt('Título del audio:', 'Audio') || 'Audio';
  const id = driveFileId(rawUrl);
  const embed = id
    ? `<iframe src="${directDriveUrl(rawUrl, 'preview')}" allow="autoplay"></iframe>`
    : `<audio controls preload="metadata" src="${directDriveUrl(rawUrl)}"></audio>`;
  insertAtCursor(`\n- ${label}\n  <div class="media-node">${embed}</div>\n`);
}

function setWidthRule() {
  const level = Math.max(1, Math.round(Number(widthLevelInput.value) || 1));
  const width = Math.max(80, Math.min(1200, Math.round(Number(widthPxInput.value) || 420)));
  widthLevelInput.value = String(level);
  widthPxInput.value = String(width);
  widthRules = sanitizeWidthRules({ ...widthRules, [level]: width });
  updateWidthSummary();
  render().then(() => showToast(`Ancho aplicado: nivel ${level} usa ${width}px.`));
}

function resetWidthRules() {
  widthRules = { ...defaultWidthRules };
  widthLevelInput.value = '1';
  widthPxInput.value = String(widthRules[1]);
  updateWidthSummary();
  render().then(() => showToast('Anchos base restaurados.'));
}

function setTextSizeRule() {
  const level = Math.max(1, Math.round(Number(textLevelInput.value) || 1));
  const percent = Math.max(40, Math.min(240, Math.round(Number(textPercentInput.value) || 100)));
  textLevelInput.value = String(level);
  textPercentInput.value = String(percent);
  textSizeRules = sanitizeTextSizeRules({ ...textSizeRules, [level]: percent / 100 });
  updateTextSizeSummary();
  render();
}

function resetTextSizeRules() {
  textSizeRules = { ...defaultTextSizeRules };
  textLevelInput.value = '1';
  textPercentInput.value = String(Math.round(textSizeRules[1] * 100));
  updateTextSizeSummary();
  render();
}

function applyLevel(level, mode = 'strict') {
  levelSelect.value = String(Math.max(-1, Number(level)));
  foldModeSelect.value = mode;
  render();
}

function showHelp() {
  helpOverlay.classList.add('open');
}

function closeHelp() {
  helpOverlay.classList.remove('open');
}

function resetVisualSettings() {
  levelSelect.value = '-1';
  foldModeSelect.value = 'strict';
  paletteSelect.value = 'classic';
  updateVisualPaletteGrid('classic');
  fontSelect.value = 'system';
  textSizeSelect.value = '1';
  textColorSelect.value = 'auto';
  lineWidthSelect.value = '1.6';
  circleSizeInput.value = '7';
  document.documentElement.style.setProperty('--circle-radius', '7px');
  textSizeRules = { ...defaultTextSizeRules };
  textLevelInput.value = '1';
  textPercentInput.value = String(Math.round(textSizeRules[1] * 100));
  spacingHInput.value = '78';
  spacingVInput.value = '7';
  durationInput.value = '180';
  themeSelect.value = 'light';
  document.body.dataset.theme = 'light';
  widthRules = { ...defaultWidthRules };
  widthLevelInput.value = '1';
  widthPxInput.value = String(widthRules[1]);
  updateWidthSummary();
  updateTextSizeSummary();
  document.documentElement.style.setProperty('--editor-width', '360px');
  render().then(() => showToast('Configuración visual restablecida.'));
}

function applyVisualPreset() {
  const preset = visualPresets[presetSelect.value] || visualPresets.lecture;
  applySettingsToControls(preset);
  render().then(() => showToast(`Preset aplicado: ${presetSelect.options[presetSelect.selectedIndex].text}.`));
}

function tryCreateIcons() {
  try {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  } catch (err) {
    console.error('Failed to create Lucide icons:', err);
  }
}

function toggleSidebar() {
  sidebarPane.classList.toggle('collapsed');
  setTimeout(() => mm?.fit(), 280);
}

function toggleEditor() {
  editorPane.classList.toggle('collapsed');
  // Update toggle button state in header
  const toggleBtn = document.querySelector('#toggle-editor-btn');
  if (toggleBtn) {
    if (editorPane.classList.contains('collapsed')) {
      toggleBtn.classList.remove('btn-secondary');
      toggleBtn.classList.add('btn-primary');
      toggleBtn.innerHTML = '<i data-lucide="edit-3"></i><span>Ver Editor</span>';
    } else {
      toggleBtn.classList.remove('btn-primary');
      toggleBtn.classList.add('btn-secondary');
      toggleBtn.innerHTML = '<i data-lucide="eye-off"></i><span>Ocultar Editor</span>';
    }
    tryCreateIcons();
  }
  setTimeout(() => mm?.fit(), 280);
}

async function copyMarkdown() {
  try {
    await navigator.clipboard.writeText(textarea.value);
    showToast('Markdown copiado al portapapeles.');
  } catch (error) {
    showToast('No pude copiar el Markdown al portapapeles.', true);
  }
}

function togglePresentation() {
  document.body.classList.toggle('presentation-mode');
  const btn = document.querySelector('#presentation-btn');
  if (btn) {
    if (document.body.classList.contains('presentation-mode')) {
      btn.innerHTML = '<i data-lucide="minimize-2"></i><span>Salir</span>';
      showToast('Modo presentación activo. Presioná ESC para salir.');
    } else {
      btn.innerHTML = '<i data-lucide="play"></i><span>Presentación</span>';
    }
    tryCreateIcons();
  }
  setTimeout(() => mm?.fit(), 200);
}

function toggleReadingMode() {
  document.body.classList.toggle('reading-mode');
  const btn = document.querySelector('#reading-btn');
  if (btn) {
    if (document.body.classList.contains('reading-mode')) {
      btn.innerHTML = '<i data-lucide="edit"></i><span>Modo Edición</span>';
      showToast('Modo Lectura activo (editor oculto).');
    } else {
      btn.innerHTML = '<i data-lucide="book-open"></i><span>Lectura</span>';
    }
    tryCreateIcons();
  }
  setTimeout(() => mm?.fit(), 200);
}

function setupSplitter() {
  let dragging = false;
  
  splitterElement.addEventListener('pointerdown', (event) => {
    dragging = true;
    splitterElement.classList.add('active');
    splitterElement.setPointerCapture(event.pointerId);
  });
  
  splitterElement.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    const rect = document.querySelector('.workspace').getBoundingClientRect();
    const width = Math.max(260, Math.min(rect.width - 320, event.clientX - rect.left));
    document.documentElement.style.setProperty('--editor-width', `${width}px`);
    mm?.fit();
  });
  
  splitterElement.addEventListener('pointerup', () => { 
    dragging = false; 
    splitterElement.classList.remove('active');
  });
}

function wrapSelection(prefix, suffix = prefix, placeholder = 'texto') {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selected = textarea.value.slice(start, end) || placeholder;
  const replacement = `${prefix}${selected}${suffix}`;
  textarea.value = `${textarea.value.slice(0, start)}${replacement}${textarea.value.slice(end)}`;
  textarea.focus();
  const selectionStart = start + prefix.length;
  textarea.selectionStart = selectionStart;
  textarea.selectionEnd = selectionStart + selected.length;
  historyManager.push(textarea.value);
  render();
}

function exportSvgSource() {
  const clone = svg.cloneNode(true);
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('style', `font-family:${fonts[currentSettings().font] || fonts.system}`);
  return new XMLSerializer().serializeToString(clone);
}

function exportSvg() {
  download(fileName('svg'), exportSvgSource(), 'image/svg+xml;charset=utf-8');
}

function exportPng() {
  const source = exportSvgSource();
  const image = new Image();
  const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  image.onload = () => {
    try {
      const rect = svg.getBoundingClientRect();
      const canvas = document.createElement('canvas');
      const scale = 2; // High-res export
      canvas.width = Math.max(1, Math.round(rect.width * scale));
      canvas.height = Math.max(1, Math.round(rect.height * scale));
      const ctx = canvas.getContext('2d');
      
      // Get preview background color
      const previewEl = document.querySelector('.map-pane');
      ctx.fillStyle = getComputedStyle(previewEl).backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((png) => {
        URL.revokeObjectURL(url);
        if (!png) {
          showToast('No se pudo generar el PNG.', true);
          return;
        }
        const pngUrl = URL.createObjectURL(png);
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = fileName('png');
        document.body.append(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(pngUrl);
      }, 'image/png');
    } catch (error) {
      URL.revokeObjectURL(url);
      showToast('No se pudo generar PNG. Si el mapa incluye imágenes externas, el navegador puede bloquear la exportación.', true);
    }
  };
  image.onerror = () => {
    URL.revokeObjectURL(url);
    showToast('No se pudo convertir el SVG a PNG.', true);
  };
  image.src = url;
}

function exportedHtml(markdown, settings) {
  const safeMarkdown = JSON.stringify(markdown).replace(/</g, '\\u003c');
  const safeSettings = JSON.stringify(settings).replace(/</g, '\\u003c');
  const scriptTags = scripts.map((src) => `<script src="${src}"><\/script>`).join('\n');
  const mapText = settings.textColor === 'auto'
    ? (settings.theme === 'dark' ? '#edf2f7' : '#17202a')
    : settings.textColor;
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Markmap</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
<style>
:root{--map-font:${fonts[settings.font] || fonts.system};--map-font-size:${settings.textSize || 1}em;--map-text:${mapText};--table-border:${settings.theme === 'dark' ? '#334155' : '#d6dee8'};--table-head:${settings.theme === 'dark' ? '#223047' : '#eef2f6'};--circle-radius:${settings.circleRadius || 7}px}*{box-sizing:border-box}html,body{height:100%;margin:0}body{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:${settings.theme === 'dark' ? '#111827' : '#fbfcfd'};color:${settings.theme === 'dark' ? '#edf2f7' : '#17202a'}}header{align-items:center;background:${settings.theme === 'dark' ? '#182235' : '#fff'};border-bottom:1px solid ${settings.theme === 'dark' ? '#334155' : '#d6dee8'};display:flex;gap:8px;justify-content:space-between;min-height:48px;padding:8px 12px}h1{font-size:16px;margin:0}button{background:transparent;border:1px solid ${settings.theme === 'dark' ? '#334155' : '#d6dee8'};border-radius:6px;color:inherit;cursor:pointer;font:inherit;font-size:14px;min-height:32px;padding:0 10px}#mindmap{display:block;height:calc(100vh - 48px);width:100vw}.markmap-node circle{cursor:pointer;r:var(--circle-radius,7px) !important;stroke-width:2.2px !important;transition:r .15s ease,stroke-width .15s ease,fill .15s ease}.markmap-node circle:hover{r:calc(var(--circle-radius,7px) * 1.35) !important;stroke-width:3px !important}.markmap-foreign div{color:var(--map-text);font-family:var(--map-font);font-size:var(--map-font-size)}.markmap-foreign a{color:color-mix(in srgb,var(--map-text) 72%,#008cff)}.markmap-foreign img{border-radius:6px;max-height:180px;max-width:min(100%,420px);object-fit:contain}.markmap-foreign .media-image img{height:auto;max-height:none;max-width:100%;width:100%}.markmap-foreign audio{display:block;height:40px;min-width:260px;width:260px}.markmap-foreign iframe{border:0;border-radius:8px;display:block;height:78px;width:300px}.markmap-foreign .media-node{display:inline-block;min-width:280px}.markmap-foreign table{border-collapse:collapse;display:block;font-size:.82em;margin-top:6px;max-width:380px;overflow:hidden}.markmap-foreign th,.markmap-foreign td{border:1px solid var(--table-border);padding:4px 7px;text-align:left;vertical-align:top;white-space:nowrap}.markmap-foreign th{background:var(--table-head);font-weight:700}.hint{color:${settings.theme === 'dark' ? '#aab6c7' : '#64748b'};font-size:12px}
</style>
</head>
<body>
<header><h1>Markmap</h1><div><button id="fit">Ajustar</button> <span class="hint">clic en círculos para desplegar/contraer</span></div></header>
<svg id="mindmap"></svg>
${scriptTags}
<script>
const markdown = ${safeMarkdown};
const settings = ${safeSettings};
const palettes = ${JSON.stringify(palettes)};
const defaultWidthRules = ${JSON.stringify(defaultWidthRules)};
const defaultTextSizeRules = ${JSON.stringify(defaultTextSizeRules)};
const api = window.markmap;
const svg = document.querySelector('#mindmap');
function colorFor(name){const colors=palettes[name]||palettes.classic;return node=>colors[Math.max(0,(node.state?.depth||1)-1)%colors.length];}
function sanitizeWidthRules(rules){const next={};Object.entries(rules||{}).forEach(([level,width])=>{const numericLevel=Math.max(1,Math.round(Number(level)));const numericWidth=Math.max(80,Math.min(1200,Math.round(Number(width))));if(Number.isFinite(numericLevel)&&Number.isFinite(numericWidth))next[numericLevel]=numericWidth});return Object.keys(next).length?next:{...defaultWidthRules}}
function sanitizeTextSizeRules(rules){const next={};Object.entries(rules||{}).forEach(([level,size])=>{const numericLevel=Math.max(1,Math.round(Number(level)));const numericSize=Math.max(.4,Math.min(2.4,Number(size)));if(Number.isFinite(numericLevel)&&Number.isFinite(numericSize))next[numericLevel]=Math.round(numericSize*100)/100});return Object.keys(next).length?next:{...defaultTextSizeRules}}
function widthForDepth(rules,depth){const sanitized=sanitizeWidthRules(rules);const levels=Object.keys(sanitized).map(Number).sort((a,b)=>a-b);const matched=levels.filter(level=>level<=depth).pop()||levels[0];return sanitized[matched]}
function widthCssFor(rules){return Array.from({length:32},(_,i)=>{const depth=i+1;const width=widthForDepth(rules,depth);return '.markmap-node[data-depth="'+depth+'"] .markmap-foreign > div{width:'+width+'px;max-width:'+width+'px}\\n.markmap-node[data-depth="'+depth+'"] .markmap-foreign > div > div{max-width:'+width+'px;white-space:normal;overflow-wrap:anywhere}'}).join('\\n')}
function textSizeForDepth(rules,depth){const sanitized=sanitizeTextSizeRules(rules);const levels=Object.keys(sanitized).map(Number).sort((a,b)=>a-b);const matched=levels.filter(level=>level<=depth).pop()||levels[0];return sanitized[matched]}
function textSizeCssFor(rules){return Array.from({length:32},(_,i)=>{const depth=i+1;return '.markmap-node[data-depth="'+depth+'"] .markmap-foreign > div{font-size:calc(var(--map-font-size) * '+textSizeForDepth(rules,depth)+')}'}).join('\\n')}
function cloneWithoutFold(node){const payload=node.payload?{...node.payload}:undefined;if(payload)delete payload.fold;return {...node,payload,children:node.children?.map(cloneWithoutFold)||[]}}
function cloneWithLevelFold(node,visibleLevel,depth=1){const payload=node.payload?{...node.payload}:{};delete payload.fold;if(visibleLevel>=0&&depth>=visibleLevel+1&&node.children?.length)payload.fold=1;return {...node,payload:Object.keys(payload).length?payload:undefined,children:node.children?.map(child=>cloneWithLevelFold(child,visibleLevel,depth+1))||[]}}
function prepareRoot(root){return settings.foldMode==='memory'?cloneWithoutFold(root):cloneWithLevelFold(root,settings.level??-1)}
function configureMapLinks(){svg.querySelectorAll('.markmap-foreign a').forEach(link=>{if(!link.getAttribute('href')?.startsWith('#')){link.setAttribute('target','_blank');link.setAttribute('rel','noopener noreferrer')}if(link.dataset.mapLinkReady)return;link.dataset.mapLinkReady='1';['pointerdown','mousedown','click','dblclick'].forEach(name=>link.addEventListener(name,event=>event.stopPropagation()))})}
const transformer = new api.Transformer();
function lineWidth(){return Math.max(.5,settings.lineWidth||1.6)}
const mm = api.Markmap.create(svg, { autoFit: false, duration: settings.duration ?? 180, initialExpandLevel: -1, color: colorFor(settings.palette), lineWidth, maxWidth: 0, style: () => widthCssFor(settings.widthRules)+'\\n'+textSizeCssFor(settings.textSizeRules), spacingHorizontal: settings.spacingHorizontal ?? 78, spacingVertical: settings.spacingVertical ?? 7 });
async function draw() {
  const { root } = transformer.transform(markdown);
  await mm.setData(prepareRoot(root), { duration: settings.duration ?? 180, initialExpandLevel: -1, color: colorFor(settings.palette), lineWidth, maxWidth: 0, style: () => widthCssFor(settings.widthRules)+'\\n'+textSizeCssFor(settings.textSizeRules), spacingHorizontal: settings.spacingHorizontal ?? 78, spacingVertical: settings.spacingVertical ?? 7 });
  configureMapLinks();
  await mm.fit();
}
document.querySelector('#fit').addEventListener('click', () => mm.fit());
window.addEventListener('resize', () => mm.fit());
draw();
<\/script>
</body>
</html>`;
}

function exportHtml() {
  download(fileName('html'), exportedHtml(textarea.value, currentSettings()), 'text/html;charset=utf-8');
}

function exportMarkdown() {
  download(fileName('md'), textarea.value, 'text/markdown;charset=utf-8');
}

async function copyShareLink() {
  const url = `${location.origin}${location.pathname}#m=${encodeState(textarea.value, currentSettings())}`;
  try {
    await navigator.clipboard.writeText(url);
    showToast('Link copiado al portapapeles.');
  } catch (error) {
    location.hash = `m=${encodeState(textarea.value, currentSettings())}`;
    showToast('No pude copiar al portapapeles, pero dejé el link compartible en la barra de direcciones.');
  }
}

function importMarkdown(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    textarea.value = String(reader.result || '');
    historyManager.push(textarea.value);
    render();
  };
  reader.onerror = () => showToast('No se pudo leer el archivo.', true);
  reader.readAsText(file);
}

// Programmatic Zoom Controls
function zoomIn() {
  if (!mm) return;
  mm.rescale(1.25);
}

function zoomOut() {
  if (!mm) return;
  mm.rescale(0.8);
}

function toggleZoomLock() {
  if (!mm) return;
  isLocked = !isLocked;
  const lockBtn = document.querySelector('#lock-zoom-btn');
  if (lockBtn) {
    if (isLocked) {
      d3.select(svg).on('.zoom', null); // Disable D3 zoom
      lockBtn.innerHTML = '<i data-lucide="lock"></i>';
      lockBtn.title = 'Mapa Bloqueado (clic para desbloquear)';
      showToast('Mapa bloqueado. Paneo y zoom desactivados.');
    } else {
      d3.select(svg).call(mm.zoom); // Re-enable D3 zoom
      lockBtn.innerHTML = '<i data-lucide="unlock"></i>';
      lockBtn.title = 'Bloquear Movimiento';
      showToast('Mapa desbloqueado.');
    }
    tryCreateIcons();
  }
}

// Visual Palette Selector Builder
function createVisualPaletteSelector() {
  const container = document.querySelector('#palette-selector-grid');
  if (!container) return;
  container.innerHTML = '';
  
  Object.keys(palettes).forEach((name) => {
    const colors = palettes[name];
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-secondary palette-option';
    button.dataset.palette = name;
    button.title = `Paleta: ${name}`;
    
    // Create colored circles
    let dotsHtml = '<div class="palette-dots">';
    colors.slice(0, 4).forEach((color) => {
      dotsHtml += `<span class="palette-dot" style="background-color: ${color}"></span>`;
    });
    dotsHtml += '</div>';
    
    button.innerHTML = `${dotsHtml} <span style="text-transform: capitalize; font-size: 0.78rem;">${name}</span>`;
    
    button.addEventListener('click', () => {
      paletteSelect.value = name;
      updateVisualPaletteGrid(name);
      render();
    });
    
    container.appendChild(button);
  });
}

function updateVisualPaletteGrid(activeName) {
  const buttons = document.querySelectorAll('#palette-selector-grid button');
  buttons.forEach((btn) => {
    if (btn.dataset.palette === activeName) {
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-primary');
      // Glow style
      btn.style.boxShadow = `0 0 8px var(--accent-glow)`;
    } else {
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-secondary');
      btn.style.boxShadow = 'none';
    }
  });
}

// Sidebar Accordion Handler
function setupAccordions() {
  const headers = document.querySelectorAll('.accordion-header');
  headers.forEach((header) => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const wasOpen = item.classList.contains('open');
      
      // Close all accordions optionally or just toggle this one
      // Let's just toggle this one to allow multiple open sections
      item.classList.toggle('open');
      
      // Animate slide toggle using JS display or CSS. 
      // We handle it via CSS display none/flex toggle, which is fast and robust.
    });
  });
}

// Theme Conmutator (gorgeous custom toggle click handler)
function setupThemeToggle() {
  const toggle = document.querySelector('#theme-toggle-btn');
  if (!toggle) return;
  
  toggle.addEventListener('click', () => {
    const currentTheme = themeSelect.value;
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    themeSelect.value = nextTheme;
    document.body.dataset.theme = nextTheme;
    applyUiSettings();
    render();
    
    // Update SVG icon indicator
    const thumb = toggle.querySelector('.theme-toggle-thumb');
    if (thumb) {
      thumb.innerHTML = nextTheme === 'dark' 
        ? '<i data-lucide="moon"></i>' 
        : '<i data-lucide="sun"></i>';
      tryCreateIcons();
    }
  });
}

// New drag & drop setup
function setupDragAndDrop() {
  const pane = document.querySelector('.editor-pane');
  if (!pane) return;
  
  let dragCounter = 0;
  
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
    pane.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  });
  
  pane.addEventListener('dragenter', () => {
    dragCounter++;
    pane.classList.add('drag-over');
  });
  
  pane.addEventListener('dragleave', () => {
    dragCounter--;
    if (dragCounter <= 0) {
      dragCounter = 0;
      pane.classList.remove('drag-over');
    }
  });
  
  pane.addEventListener('drop', (event) => {
    dragCounter = 0;
    pane.classList.remove('drag-over');
    const file = event.dataTransfer && event.dataTransfer.files ? event.dataTransfer.files[0] : null;
    if (file) {
      importMarkdown(file);
    }
  });
}

// New keyboard shortcuts handler
function setupKeyboardShortcuts() {
  textarea.addEventListener('keydown', (event) => {
    const key = event.key ? event.key.toLowerCase() : '';
    // Ctrl + Z: Undo
    if (event.ctrlKey && !event.shiftKey && key === 'z') {
      event.preventDefault();
      historyManager.undo();
    }
    // Ctrl + Y: Redo
    if (event.ctrlKey && key === 'y') {
      event.preventDefault();
      historyManager.redo();
    }
    // Ctrl + S: Save Markdown (.md)
    if (event.ctrlKey && key === 's') {
      event.preventDefault();
      exportMarkdown();
      showToast('Markdown descargado.');
    }
    // Ctrl + O: Import/Open file
    if (event.ctrlKey && key === 'o') {
      event.preventDefault();
      fileInput.click();
    }
  });

  // Global window listeners for presentation & search
  window.addEventListener('keydown', (event) => {
    const key = event.key ? event.key.toLowerCase() : '';
    // Alt + P: Toggle Presentation
    if (event.altKey && key === 'p') {
      event.preventDefault();
      togglePresentation();
    }
    // Alt + F: Focus search map input
    if (event.altKey && key === 'f') {
      event.preventDefault();
      if (sidebarPane.classList.contains('collapsed')) {
        toggleSidebar();
      }
      const accordionItem = searchInput.closest('.accordion-item');
      if (accordionItem && !accordionItem.classList.contains('open')) {
        accordionItem.classList.add('open');
      }
      searchInput.focus();
      searchInput.select();
      showToast('Buscador enfocado.');
    }
  });
}

// New dynamic table generator
function insertCustomTable() {
  const colsInput = prompt('Ingrese el número de columnas (1-10):', '3');
  if (colsInput === null) return;
  const rowsInput = prompt('Ingrese el número de filas (1-20):', '3');
  if (rowsInput === null) return;
  
  const cols = Math.max(1, Math.min(10, parseInt(colsInput) || 3));
  const rows = Math.max(1, Math.min(20, parseInt(rowsInput) || 3));
  
  let snippet = '\n\n## Nueva Tabla\n\n|';
  for (let c = 1; c <= cols; c++) {
    snippet += ` Cabecera ${c} |`;
  }
  snippet += '\n|';
  for (let c = 1; c <= cols; c++) {
    snippet += ' --- |';
  }
  for (let r = 1; r <= rows; r++) {
    snippet += '\n|';
    for (let c = 1; c <= cols; c++) {
      snippet += ` Celda R${r}C${c} |`;
    }
  }
  snippet += '\n';
  insertAtCursor(snippet);
  showToast(`Tabla de ${cols}x${rows} insertada.`);
}

// Initialize App
function boot() {
  // Query all DOM elements
  textarea = document.querySelector('#markdown');
  levelSelect = document.querySelector('#level');
  foldModeSelect = document.querySelector('#fold-mode');
  paletteSelect = document.querySelector('#palette');
  presetSelect = document.querySelector('#preset');
  fontSelect = document.querySelector('#font');
  textSizeSelect = document.querySelector('#text-size');
  textColorSelect = document.querySelector('#text-color');
  lineWidthSelect = document.querySelector('#line-width');
  widthLevelInput = document.querySelector('#width-level');
  widthPxInput = document.querySelector('#width-px');
  widthSummary = document.querySelector('#width-summary');
  textLevelInput = document.querySelector('#text-level');
  textPercentInput = document.querySelector('#text-percent');
  textSizeSummary = document.querySelector('#text-size-summary');
  spacingHInput = document.querySelector('#spacing-h');
  spacingVInput = document.querySelector('#spacing-v');
  durationInput = document.querySelector('#duration');
  themeSelect = document.querySelector('#theme');
  fileInput = document.querySelector('#import-file');
  countText = document.querySelector('#count');
  statusToast = document.querySelector('#status-toast');
  helpOverlay = document.querySelector('#help-overlay');
  searchInput = document.querySelector('#search-map');
  searchSummary = document.querySelector('#search-summary');
  splitterElement = document.querySelector('#splitter');
  svg = document.querySelector('#mindmap');
  editorPane = document.querySelector('#editor-pane');
  sidebarPane = document.querySelector('#sidebar-pane');
  circleSizeInput = document.querySelector('#circle-size');

  const api = window.markmap;
  if (!window.d3 || !api || !api.Transformer || !api.Markmap) {
    const keys = api ? Object.keys(api).join(', ') : 'sin window.markmap';
    showToast(`No se cargaron las librerías de Markmap. Detalle: ${keys}. Reintentá recargando.`, true);
    return;
  }
  
  transformer = new api.Transformer();
  mm = api.Markmap.create(svg, markmapOptions());
  
  // Set up components
  createVisualPaletteSelector();
  setupAccordions();
  setupThemeToggle();
  restore();
  
  // Restore Accent Color
  const storedAccent = localStorage.getItem('markmap-repl-accent') || 'teal';
  applyAccentColor(storedAccent);
  
  // Update theme toggle thumb icon initially
  const toggle = document.querySelector('#theme-toggle-btn');
  if (toggle) {
    const thumb = toggle.querySelector('.theme-toggle-thumb');
    if (thumb) {
      thumb.innerHTML = themeSelect.value === 'dark' 
        ? '<i data-lucide="moon"></i>' 
        : '<i data-lucide="sun"></i>';
    }
  }

  // Load Lucide Icons
  tryCreateIcons();

  // Listeners
  textarea.addEventListener('input', () => {
    scheduleRender();
    historyManager.push(textarea.value);
  });
  
  [levelSelect, foldModeSelect, paletteSelect, fontSelect, textSizeSelect, textColorSelect, lineWidthSelect, spacingHInput, spacingVInput, durationInput, themeSelect, circleSizeInput].forEach((control) => {
    control.addEventListener('change', () => {
      if (control === paletteSelect) updateVisualPaletteGrid(paletteSelect.value);
      render();
    });
  });
  
  [levelSelect, spacingHInput, spacingVInput, durationInput, circleSizeInput].forEach((control) => {
    control.addEventListener('input', scheduleRender);
  });

  // Accent picker click listeners
  document.querySelectorAll('#accent-picker-container button').forEach((btn) => {
    btn.addEventListener('click', () => {
      applyAccentColor(btn.dataset.color);
    });
  });

  // Header quick buttons
  document.querySelector('#toggle-sidebar-btn').addEventListener('click', toggleSidebar);
  document.querySelector('#toggle-editor-btn').addEventListener('click', toggleEditor);
  document.querySelector('#reading-btn').addEventListener('click', toggleReadingMode);
  document.querySelector('#presentation-btn').addEventListener('click', togglePresentation);
  document.querySelector('#help-btn').addEventListener('click', showHelp);
  document.querySelector('#close-help-btn').addEventListener('click', closeHelp);
  helpOverlay.addEventListener('click', (e) => { if (e.target === helpOverlay) closeHelp(); });

  // Floating map control buttons
  document.querySelector('#zoom-in-btn').addEventListener('click', zoomIn);
  document.querySelector('#zoom-out-btn').addEventListener('click', zoomOut);
  document.querySelector('#fit-btn').addEventListener('click', () => mm?.fit());
  document.querySelector('#lock-zoom-btn').addEventListener('click', toggleZoomLock);

  // Search functionality
  document.querySelector('#find-map').addEventListener('click', () => render().then(() => searchMap({ fitFirst: true })));
  document.querySelector('#clear-search').addEventListener('click', () => clearSearch());
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') render().then(() => searchMap({ fitFirst: true }));
    if (event.key === 'Escape') clearSearch();
  });
  
  // Undo/Redo listeners
  document.querySelector('#undo').addEventListener('click', () => historyManager.undo());
  document.querySelector('#redo').addEventListener('click', () => historyManager.redo());

  // Markdown format insertion
  document.querySelector('#bold-btn').addEventListener('click', () => wrapSelection('**', '**', 'negrita'));
  document.querySelector('#italic-btn').addEventListener('click', () => wrapSelection('*', '*', 'cursiva'));
  document.querySelector('#code-btn').addEventListener('click', () => wrapSelection('\n\`\`\`js\n', '\n\`\`\`\n', 'const test = "hola";'));
  document.querySelector('#table-btn').addEventListener('click', insertCustomTable);
  document.querySelector('#image-btn').addEventListener('click', insertImage);
  document.querySelector('#audio-btn').addEventListener('click', insertAudio);

  // Clear editor click listener
  const clearBtn = document.querySelector('#clear-editor-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('¿Estás seguro de que deseas borrar todo el contenido del editor?')) {
        textarea.value = '';
        historyManager.push(textarea.value);
        render();
        textarea.focus();
        showToast('Editor limpio.');
      }
    });
  }
  
  // Custom templates dropdown
  const templateSelect = document.querySelector('#template-select');
  if (templateSelect) {
    templateSelect.addEventListener('change', () => {
      const val = templateSelect.value;
      if (val && templates[val]) {
        textarea.value = templates[val];
        historyManager.push(textarea.value);
        render();
        textarea.focus();
        // Reset to placeholder
        templateSelect.value = '';
      }
    });
  }

  // Sidebar controls
  document.querySelector('#apply-level').addEventListener('click', () => render());
  document.querySelector('#open-all').addEventListener('click', () => applyLevel(-1, 'strict'));
  document.querySelector('#title-only').addEventListener('click', () => applyLevel(0, 'strict'));
  document.querySelector('#apply-preset').addEventListener('click', applyVisualPreset);
  document.querySelector('#reset-visual').addEventListener('click', resetVisualSettings);

  document.querySelector('#set-width').addEventListener('click', setWidthRule);
  document.querySelector('#reset-width').addEventListener('click', resetWidthRules);
  document.querySelector('#set-text-size').addEventListener('click', setTextSizeRule);
  document.querySelector('#reset-text-size').addEventListener('click', resetTextSizeRules);
  
  [widthLevelInput, widthPxInput].forEach((control) => control.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') setWidthRule();
  }));
  [textLevelInput, textPercentInput].forEach((control) => control.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') setTextSizeRule();
  }));

  // File import and exports
  document.querySelector('#import').addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => importMarkdown(fileInput.files[0]));
  document.querySelector('#save-md').addEventListener('click', exportMarkdown);
  document.querySelector('#copy-md').addEventListener('click', copyMarkdown);
  document.querySelector('#share').addEventListener('click', copyShareLink);
  document.querySelector('#save-html').addEventListener('click', exportHtml);
  document.querySelector('#save-svg').addEventListener('click', exportSvg);
  document.querySelector('#save-png').addEventListener('click', exportPng);
  document.querySelector('#save-pdf').addEventListener('click', () => {
    window.print();
  });

  // Splitter and Layout Resizing
  setupSplitter();
  window.addEventListener('resize', () => mm?.fit());
  window.addEventListener('hashchange', () => { restore(); render(); });
  
  // Escape key handler for presentation mode
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('presentation-mode')) {
      togglePresentation();
    }
  });

  // Setup advanced user experience components
  setupDragAndDrop();
  setupKeyboardShortcuts();

  render();
  showToast('Markmap REPL cargado correctamente.');
}

window.addEventListener('load', boot);

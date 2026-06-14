/* app.js - Explorador de Neuropsicología y Anatomía Cerebral */

// Contenido Markdown inicial con información anatómica y clínica detallada (15 estructuras)
const INITIAL_MARKDOWN = `# Lóbulo Frontal
- Función: Planificación conductual, toma de decisiones complejas, control motor voluntario, razonamiento lógico, modulación de la personalidad, inhibición de impulsos y producción fluida del habla. Sede del pensamiento abstracto y la prospección.
- Neurotransmisores: Dopamina, Acetilcolina.
- Caso Clínico: Phineas Gage (1848), obrero de ferrocarril que, tras atravesar su lóbulo frontal con una barra de hierro, sobrevivió pero sufrió un cambio radical de personalidad: de ser responsable y tranquilo pasó a ser desinhibido, irreverente e incapaz de mantener planes a largo plazo.
- Lesión: Síndrome des-ejecutivo (pérdida de planificación y juicio), desinhibición conductual, apatía profunda, hemiparesia contralateral, perseveración (repetición de conductas) y afasia motora de Broca en lesiones izquierdas.

# Área de Broca
- Función: Producción y articulación del lenguaje hablado y escrito. Responsable de la programación motora del habla, la morfosintaxis, la fluencia verbal y la transición de pensamiento a palabra articulada. Se localiza en el giro frontal inferior (áreas 44 y 45 de Brodmann).
- Neurotransmisores: Dopamina, Glutamato.
- Caso Clínico: "Tan" (Louis Victor Leborgne, 1861), paciente de Paul Broca que podía comprender perfectamente el lenguaje pero solo podía pronunciar la sílaba "tan". La autopsia reveló una lesión en el lóbulo frontal izquierdo que hoy lleva el nombre de Broca.
- Lesión: Afasia de Broca: habla no fluente, telegráfica y con gran esfuerzo articulatorio. El paciente comprende pero no puede expresarse. Disartria, apraxia del habla y mutismo en casos severos.

# Área de Wernicke
- Función: Comprensión e interpretación del lenguaje hablado y escrito. Procesa la forma fonológica y semántica de las palabras entrantes. Se localiza en el giro temporal superior posterior (área 22 de Brodmann) del hemisferio dominante (izquierdo en ~95% de diestros).
- Neurotransmisores: Glutamato, GABA.
- Caso Clínico: Carl Wernicke (1874) describió pacientes que hablaban de forma fluida pero ininteligible (usando palabras inventadas o fuera de contexto), y eran incapaces de comprender lo que se les decía. La lesión estaba en el lóbulo temporal posterior izquierdo.
- Lesión: Afasia de Wernicke: habla fluente pero vacía de contenido, repleta de parafasias (sustituciones de palabras) y neologismos. El paciente no comprende lo que le dicen ni reconoce sus propios errores (anosognosia lingüística). Puede incluir alexia y agrafia.

# Lóbulo Parietal
- Función: Procesamiento somatosensorial (tacto, dolor, temperatura, presión y propiocepción), integración multisensorial, orientación espacial y corporal, aritmética y cálculo matemático, escritura y praxias constructivas.
- Neurotransmisores: Glutamato, GABA.
- Caso Clínico: Pacientes con heminegligencia unilateral que, tras un accidente cerebrovascular en el lóbulo parietal derecho, ignoran completamente el lado izquierdo de su cuerpo: solo comen la mitad del plato, se afeitan medio rostro o dibujan objetos sin el hemicampo izquierdo.
- Lesión: Heminegligencia espacial unilateral, agnosia táctil (astereognosia), apraxia constructiva e ideomotora, Síndrome de Gerstmann (acalculia, agrafia, desorientación izquierda-derecha y agnosia digital).

# Lóbulo Temporal
- Función: Procesamiento y decodificación auditiva, comprensión del lenguaje hablado (Área de Wernicke), memoria declarativa a largo plazo (en sus estructuras mediales), reconocimiento facial/visual complejo (Área Fusiforme de los Rostros), y procesamiento melódico y musical.
- Neurotransmisores: Acetilcolina, Glutamato.
- Caso Clínico: Paciente H.M. (Henry Molaison), a quien se le extirpó bilateralmente el lóbulo temporal medial (hipocampos y amígdalas) para tratar epilepsia refractaria. Perdió para siempre la capacidad de formar nuevas memorias declarativas, aunque conservó intactas su inteligencia y memorias procedimentales.
- Lesión: Amnesia anterógrada severa, afasia sensorial de Wernicke, agnosia visual para caras (prosopagnosia), síndrome de Klüver-Bucy (con amígdalas) y epilepsia del lóbulo temporal con auras características.

# Lóbulo Occipital
- Función: Procesamiento visual primario (corteza V1 / área estriada) y de asociación (percepción de formas, colores, movimiento, orientación de líneas y reconocimiento de patrones visuales complejos). Integra señales de la retina via tálamo.
- Neurotransmisores: GABA, Glutamato.
- Caso Clínico: Pacientes con ceguera cortical que insisten en que pueden ver, tropezando con objetos y negando su déficit (Síndrome de Anton-Babinski). También escotomas y hemianopsias tras infartos de la arteria cerebral posterior.
- Lesión: Ceguera cortical, hemianopsia homónima contralateral, alucinaciones visuales (fotopsias), agnosia visual de objetos, prosopagnosia occipital y síndrome de Balint en lesiones bilaterales.

# Cerebelo
- Función: Coordinación fina del movimiento voluntario, regulación del equilibrio postural, tono muscular, control de la precisión temporal, refinamiento de planes motores provenientes de la corteza, y aprendizaje motor procedimental (condicionamiento del parpadeo).
- Neurotransmisores: GABA (células de Purkinje), Glutamato (fibras musgosas y trepadoras).
- Caso Clínico: Pacientes con ataxia espinocerebelosa o degeneración cerebelosa alcohólica que muestran una marcha característica con base amplia ("de borracho"), dismetría al hacer la prueba dedo-nariz y descomposición del movimiento al realizar tareas secuenciales.
- Lesión: Ataxia cerebelosa, dismetría, disdiadococinesia (incapacidad de hacer movimientos alternantes rápidos), temblor intencional, hipotonía muscular y habla escandida (disartria cerebelosa).

# Tronco Encefálico
- Función: Control de funciones vitales autónomas (respiración, frecuencia cardíaca, presión arterial, deglución), modulación de los ciclos de sueño y vigilia a través del Sistema Activador Reticular Ascendente (SARA), y origen de los 12 pares de nervios craneales.
- Neurotransmisores: Noradrenalina (locus coeruleus), Serotonina (núcleos del rafe), Dopamina (sustancia negra y área tegmental ventral).
- Caso Clínico: Paciente con Síndrome de Enclaustramiento (Locked-in syndrome) por infarto de la protuberancia (puente): parálisis cuadripléjica y anartria completa con conciencia totalmente intacta, comunicándose únicamente mediante movimientos oculares verticales.
- Lesión: Coma profundo, paro cardiorrespiratorio (riesgo vital extremo), Síndrome de Enclaustramiento, disfunción autonómica grave, parálisis de nervios craneales múltiples y síndromes alternos (p. ej., Wallenberg, Weber).

# Hipocampo
- Función: Consolidación y codificación de la memoria declarativa episódica (eventos autobiográficos) y semántica (hechos generales) desde la memoria de trabajo hacia la memoria a largo plazo. Mapa de orientación espacial (lugar cells) fundamental para la navegación.
- Neurotransmisores: Acetilcolina, Glutamato (receptor NMDA — clave en la potenciación a largo plazo / LTP).
- Caso Clínico: Pacientes con enfermedad de Alzheimer temprana, donde la degeneración bilateral del hipocampo produce olvidos que se repiten: el paciente hace la misma pregunta cada pocos minutos sin ningún recuerdo de haberla hecho.
- Lesión: Amnesia anterógrada severa (incapacidad de consolidar nuevos recuerdos declarativos), desorientación topográfica espacial profunda. La memoria procedural y la semántica remota están relativamente preservadas.

# Amígdala
- Función: Procesamiento y regulación de las emociones, especialmente el miedo, la agresión y las respuestas defensivas ante amenazas (lucha-huida-parálisis). Condicionamiento del miedo. Modula la consolidación de la memoria emocional en el hipocampo vía noradrenalina.
- Neurotransmisores: Noradrenalina, Adrenalina, Glutamato, GABA.
- Caso Clínico: Paciente S.M., con la enfermedad de Urbach-Wiethe que destruyó selectivamente sus amígdalas bilaterales. Muestra una ausencia patológica de miedo ante serpientes venenosas, arañas y situaciones de amenaza real, siendo incapaz de reconocer el miedo en rostros ajenos.
- Lesión: Ausencia patológica de miedo ante amenazas vitales, docilidad extrema y hipersexualidad (Síndrome de Klüver-Bucy en lesiones combinadas), déficit para identificar emociones negativas en el reconocimiento facial.

# Ganglios Basales
- Función: Regulación y selección de movimientos voluntarios, supresión de movimientos no deseados (inhibición del tálamo vía globo pálido), aprendizaje de hábitos y rutinas motoras, motivación y procesamiento de la recompensa (núcleo accumbens). Forman circuitos complejos con la corteza y el tálamo.
- Neurotransmisores: Dopamina (vía nigro-estriada), GABA, Acetilcolina, Glutamato.
- Caso Clínico: Paciente con enfermedad de Parkinson: la degeneración de la sustancia negra reduce drásticamente la dopamina estriatal, produciendo temblor en reposo, rigidez en rueda dentada, bradicinesia (lentitud extrema del movimiento) y postura en flexión.
- Lesión: Parkinson (hipocinesia, temblor en reposo, rigidez), Huntington (corea, movimientos involuntarios bruscos), Hemibalismo (movimientos violentos de un hemicuerpo) y síntomas neuropsiquiátricos como TOC o trastornos de control de impulsos.

# Cuerpo Calloso
- Función: Principal comisura cerebral que conecta ambos hemisferios, facilitando la transferencia e integración bidireccional de información sensorial, motora, cognitiva y emocional. Permite la cooperación hemisférica en tareas complejas como el lenguaje o las praxias.
- Neurotransmisores: Glutamato, GABA.
- Caso Clínico: Pacientes con "cerebro escindido" (split-brain) sometidos a comisurotomía para tratar epilepsia severa (estudios de Sperry y Gazzaniga, Premio Nobel 1981): podían identificar con la mano izquierda un objeto presentado al hemicampo visual izquierdo, pero eran incapaces de nombrarlo verbalmente porque el hemisferio verbal no recibía la información.
- Lesión: Síndrome de desconexión interhemisférica: apraxia unilateral izquierda, alexia sin agrafia (en sección del esplenio), mano ajena (síndrome de la mano extraña), mutismo transitorio y dificultad para integrar información entre hemisferios.

# Tálamo
- Función: Principal estación de relevo sensorial del encéfalo para todas las modalidades sensitivas (excepto el olfato) antes de proyectar a las áreas corticales específicas. Regula el estado de alerta y la consciencia (junto al tronco y el SARA), y modula el procesamiento cognitivo y emocional.
- Neurotransmisores: Glutamato, GABA, Acetilcolina.
- Caso Clínico: Síndrome de Dejerine-Roussy (síndrome de dolor talámico central): dolor quemante severo, espontáneo y persistente en el hemicuerpo contralateral a una lesión vascular talámica. Frecuentemente acompañado de alodinia (dolor ante estímulos normalmente inofensivos).
- Lesión: Hemihipoestesia contralateral (pérdida de sensibilidad), dolor talámico central neuropático, deterioro cognitivo y amnésico (síndrome de Korsakoff en núcleos de la línea media), coreoatetosis y alteraciones del sueño.

# Hipotálamo
- Función: Regulación de la homeostasis corporal (temperatura, hambre, sed, saciedad, presión arterial), control del sistema endocrino mediante la hipófisis (eje HPA y HPG), regulación de los ritmos circadianos (núcleo supraquiasmático), y coordinación de las respuestas autónomas del estrés.
- Neurotransmisores: Dopamina, Serotonina, Oxitocina, Vasopresina (ADH), TRH, CRH, GnRH.
- Caso Clínico: Pacientes con craneofaringioma (tumor hipotalámico) que desarrollan obesidad hipotalámica (hambre insaciable por destrucción del núcleo ventromedial) y diabetes insípida (poliuria extrema por falta de vasopresina).
- Lesión: Diabetes insípida (déficit de ADH), hipertermia o hipotermia, obesidad hipotalámica, alteraciones del ritmo circadiano y sueño, infertilidad (disfunción del eje gonadal) y síndrome de Prader-Willi (en lesiones congénitas).

# Giro Cingulado
- Función: Procesamiento emocional y afectivo (cíngulo anterior: ACC), detección de errores y conflictos cognitivos (control ejecutivo), control motor de movimientos voluntarios, modulación del dolor físico y emocional, y regulación autonómica de la frecuencia cardíaca y presión arterial.
- Neurotransmisores: Glutamato, GABA, Serotonina, Dopamina.
- Caso Clínico: Pacientes con cingulotomía anterior (lesión estereotáctica quirúrgica del cíngulo anterior) utilizada para aliviar el dolor crónico refractario o como último recurso en TOC severo. Reducen el sufrimiento emocional del dolor sin eliminar la percepción sensorial.
- Lesión: Apatía severa y mutismo acinético (incapacidad para hablar o moverse voluntariamente pese a integridad motora), indiferencia al dolor (analgesia afectiva), labilidad emocional y fallo en la detección de errores propios.`;

// Estado de la aplicación
let structures = {};
let selectedRegionId = "frontal"; // Región actualmente visualizada
let isLesionMode = false;
let currentView = "lateral"; // "lateral" o "medial"

// DOM Elements
const brainSvg = document.getElementById('brain-svg');
const toggleLesionMode = document.getElementById('toggle-lesion-mode');
const clearLesionsBtn = document.getElementById('clear-lesions-btn');
const modeBanner = document.getElementById('mode-banner');
const modeText = document.getElementById('mode-text');

// Views Toggle DOM
const btnViewLateral = document.getElementById('btn-view-lateral');
const btnViewMedial = document.getElementById('btn-view-medial');
const viewLateralGroup = document.getElementById('view-lateral-group');
const viewMedialGroup = document.getElementById('view-medial-group');

// Tabs DOM
const tabBtnDetails = document.getElementById('tab-btn-details');
const tabBtnEditor = document.getElementById('tab-btn-editor');
const tabDetails = document.getElementById('tab-details');
const tabEditor = document.getElementById('tab-editor');

// Card details DOM
const detailCard = document.getElementById('detail-card');
const structureName = document.getElementById('structure-name');
const structureBadge = document.getElementById('structure-badge');
const structureFuncion = document.getElementById('structure-funcion');
const structureNeuro = document.getElementById('structure-neuro');
const structureCaso = document.getElementById('structure-caso');
const structureLesion = document.getElementById('structure-lesion');

// Diagnostic Report DOM
const reportIndicator = document.getElementById('report-indicator');
const reportStatusText = document.getElementById('report-status-text');
const reportStructures = document.getElementById('report-structures');
const reportDeficits = document.getElementById('report-deficits');
const reportIntegration = document.getElementById('report-integration');
const printReportBtn = document.getElementById('print-report-btn');

// Markdown Editor DOM
const markdownInput = document.getElementById('markdown-input');
const applyMarkdownBtn = document.getElementById('apply-markdown-btn');
const downloadMarkdownBtn = document.getElementById('download-markdown-btn');

// ──────────────────────────────────────────────────────────────────────────────
// Inicialización
// ──────────────────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  markdownInput.value = INITIAL_MARKDOWN;
  structures = parseBrainMarkdown(INITIAL_MARKDOWN);

  // Tabs
  tabBtnDetails.addEventListener('click', () => switchTab('details'));
  tabBtnEditor.addEventListener('click', () => switchTab('editor'));

  // Vistas
  btnViewLateral.addEventListener('click', () => switchView('lateral'));
  btnViewMedial.addEventListener('click', () => switchView('medial'));

  // Editor
  applyMarkdownBtn.addEventListener('click', applyEditorChanges);
  downloadMarkdownBtn.addEventListener('click', downloadMarkdownFile);

  // Lesiones
  toggleLesionMode.addEventListener('change', handleModeChange);
  clearLesionsBtn.addEventListener('click', resetAllLesions);
  printReportBtn.addEventListener('click', () => window.print());

  // SVG Events
  setupBrainSvgEvents();

  // Render inicial
  updateStructureDetails(selectedRegionId);
  updateSvgStates();
  generateDiagnosticReport();
});

// ──────────────────────────────────────────────────────────────────────────────
// Tab / View Switching
// ──────────────────────────────────────────────────────────────────────────────
function switchTab(tab) {
  if (tab === 'details') {
    tabBtnDetails.classList.add('active');
    tabBtnEditor.classList.remove('active');
    tabDetails.classList.add('active');
    tabEditor.classList.remove('active');
  } else {
    tabBtnDetails.classList.remove('active');
    tabBtnEditor.classList.add('active');
    tabDetails.classList.remove('active');
    tabEditor.classList.add('active');
  }
}

function switchView(view) {
  currentView = view;

  if (view === 'lateral') {
    btnViewLateral.classList.add('active-view');
    btnViewMedial.classList.remove('active-view');
    viewLateralGroup.style.display = 'block';
    viewMedialGroup.style.display = 'none';

    // Si la región actualmente elegida solo existe en medial, volver a frontal
    const medialOnly = ['calloso', 'talamo', 'hipotalamo', 'cingulado'];
    if (medialOnly.includes(selectedRegionId)) {
      selectedRegionId = 'frontal';
      updateStructureDetails('frontal');
    }
  } else {
    btnViewLateral.classList.remove('active-view');
    btnViewMedial.classList.add('active-view');
    viewLateralGroup.style.display = 'none';
    viewMedialGroup.style.display = 'block';
  }

  updateSvgStates();
}

// ──────────────────────────────────────────────────────────────────────────────
// SVG Interaction
// ──────────────────────────────────────────────────────────────────────────────
function setupBrainSvgEvents() {
  const regions = brainSvg.querySelectorAll('.brain-region');

  regions.forEach(region => {
    const id = getCanonicalId(region.id);

    region.addEventListener('mouseenter', () => {
      if (!isLesionMode) updateStructureDetails(id);
      showSvgFloatingLabel(region);
    });

    region.addEventListener('mouseleave', () => {
      if (!isLesionMode) updateStructureDetails(selectedRegionId);
      hideSvgFloatingLabel();
    });

    region.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isLesionMode) {
        toggleRegionLesion(id);
      } else {
        selectRegion(id);
      }
    });
  });

  // Clic fuera del cerebro deselecciona
  brainSvg.addEventListener('click', () => {
    if (!isLesionMode) clearRegionSelection();
  });
}

// Normalizar IDs (ej: "region-broca" → "broca", "region-hipocampo-medial" → "hipocampo")
function getCanonicalId(svgId) {
  let id = svgId.replace('region-', '');
  if (id.endsWith('-medial')) id = id.slice(0, -7);
  return id;
}

function selectRegion(id) {
  selectedRegionId = id;
  updateSvgStates();
  updateStructureDetails(id);
}

function clearRegionSelection() {
  selectedRegionId = 'frontal';
  updateSvgStates();
  updateStructureDetails(selectedRegionId);
}

function toggleRegionLesion(id) {
  if (!structures[id]) return;
  structures[id].isDamaged = !structures[id].isDamaged;
  updateSvgStates();
  updateStructureDetails(id);
  generateDiagnosticReport();
}

function updateSvgStates() {
  const regions = brainSvg.querySelectorAll('.brain-region');
  regions.forEach(region => {
    const structId = getCanonicalId(region.id);
    const data = structures[structId];
    if (data) {
      // Selección
      if (structId === selectedRegionId) {
        region.classList.add('selected-region');
      } else {
        region.classList.remove('selected-region');
      }
      // Daño
      if (data.isDamaged) {
        region.classList.add('damaged');
        region.setAttribute('filter', 'url(#glow)');
      } else {
        region.classList.remove('damaged');
        region.removeAttribute('filter');
      }
    }
  });
}

function resetAllLesions() {
  for (let id in structures) structures[id].isDamaged = false;
  updateSvgStates();
  generateDiagnosticReport();
  updateStructureDetails(selectedRegionId);
}

function handleModeChange() {
  isLesionMode = toggleLesionMode.checked;
  if (isLesionMode) {
    modeBanner.classList.add('lesion-active');
    modeText.textContent = 'Modo: Simulación de Lesiones (Haz clic)';
  } else {
    modeBanner.classList.remove('lesion-active');
    modeText.textContent = 'Modo: Inspeccionar Estructuras';
  }
  updateSvgStates();
}

// ──────────────────────────────────────────────────────────────────────────────
// Floating Hover Label
// ──────────────────────────────────────────────────────────────────────────────
function showSvgFloatingLabel(regionElement) {
  const id = getCanonicalId(regionElement.id);
  const data = structures[id];
  if (!data) return;

  let bbox;
  try { bbox = regionElement.getBBox(); } catch(e) { return; }

  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;

  const hoverLabelsG = document.getElementById('hover-labels');
  hoverLabelsG.innerHTML = '';

  const textBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  textBg.setAttribute('fill', 'rgba(9, 13, 22, 0.96)');
  textBg.setAttribute('stroke', 'rgba(255,255,255,0.18)');
  textBg.setAttribute('stroke-width', '1');
  textBg.setAttribute('rx', '5');
  textBg.setAttribute('ry', '5');

  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('fill', '#ffffff');
  text.setAttribute('font-family', 'Outfit');
  text.setAttribute('font-weight', '600');
  text.setAttribute('font-size', '13');
  text.setAttribute('text-anchor', 'middle');
  text.setAttribute('dominant-baseline', 'middle');
  text.textContent = data.name + (data.isDamaged ? ' ⚡ LESIONADO' : '');

  hoverLabelsG.appendChild(textBg);
  hoverLabelsG.appendChild(text);

  setTimeout(() => {
    try {
      const tBBox = text.getBBox();
      textBg.setAttribute('x', cx - tBBox.width / 2 - 10);
      textBg.setAttribute('y', cy - tBBox.height / 2 - 7);
      textBg.setAttribute('width', tBBox.width + 20);
      textBg.setAttribute('height', tBBox.height + 14);
      text.setAttribute('x', cx);
      text.setAttribute('y', cy);
    } catch(e) {}
  }, 10);
}

function hideSvgFloatingLabel() {
  document.getElementById('hover-labels').innerHTML = '';
}

// ──────────────────────────────────────────────────────────────────────────────
// Structure Detail Card
// ──────────────────────────────────────────────────────────────────────────────
function getBadgeInfo(id) {
  const limbic = ['hipocampo', 'amigdala', 'cingulado'];
  const subcortical = ['talamo', 'hipotalamo'];
  const comisura = ['calloso'];
  const lenguaje = ['broca', 'wernicke'];
  const motor = ['ganglios'];

  if (limbic.includes(id)) return { text: 'Sistema Límbico', cls: 'badge-limbic' };
  if (subcortical.includes(id)) return { text: 'Subcortical', cls: 'badge-talamo' };
  if (comisura.includes(id)) return { text: 'Comisura', cls: 'badge-calloso' };
  if (lenguaje.includes(id)) return { text: 'Área del Lenguaje', cls: 'badge-broca' };
  if (motor.includes(id)) return { text: 'Ganglios Basales', cls: 'badge-ganglios' };
  if (id === 'tronco') return { text: 'Tronco Encefálico', cls: 'badge-tronco' };
  if (id === 'cerebelo') return { text: 'Cerebelo', cls: 'badge-cerebelo' };
  return { text: 'Corteza Cerebral', cls: `badge-${id}` };
}

function updateStructureDetails(id) {
  const data = structures[id];
  if (!data) return;

  if (data.isDamaged) {
    structureName.innerHTML = `${data.name} <span style="color:#ef4444; font-size:12px; font-weight:700; vertical-align: middle;">⚡ LESIONADO</span>`;
  } else {
    structureName.textContent = data.name;
  }

  const badge = getBadgeInfo(id);
  structureBadge.textContent = badge.text;
  structureBadge.className = `badge ${badge.cls}`;

  structureFuncion.textContent = data.funcion;
  structureNeuro.textContent = data.neurotransmisores;
  structureCaso.innerHTML = data.caso;
  structureLesion.textContent = data.lesion;
}

// ──────────────────────────────────────────────────────────────────────────────
// Diagnostic Report Generator
// ──────────────────────────────────────────────────────────────────────────────
function generateDiagnosticReport() {
  const damagedIds = Object.keys(structures).filter(id => structures[id].isDamaged);

  if (damagedIds.length === 0) {
    reportIndicator.style.background = '#10b981';
    reportStatusText.textContent = 'Estado: Sano';
    reportStatusText.style.color = '#10b981';
    reportStructures.textContent = 'Ninguna estructura comprometida.';
    reportDeficits.innerHTML = '<li>Sin déficits neurocognitivos evidenciados. Comportamiento y reflejos normales.</li>';
    reportIntegration.innerHTML = 'El cerebro se encuentra en óptimas condiciones fisiológicas y funcionales. Respuestas biológicas y cognitivas normales.';
    return;
  }

  reportIndicator.style.background = '#ef4444';
  reportStatusText.textContent = `Estado: Dañado (${damagedIds.length} área${damagedIds.length > 1 ? 's' : ''})`;
  reportStatusText.style.color = '#ef4444';

  const names = damagedIds.map(id => structures[id].name);
  reportStructures.textContent = names.join(', ');

  reportDeficits.innerHTML = '';
  damagedIds.forEach(id => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${structures[id].name}:</strong> ${structures[id].lesion}`;
    reportDeficits.appendChild(li);
  });

  // ── Síntesis clínica ──
  const has = id => structures[id]?.isDamaged;

  let syndromes = [];
  const total = damagedIds.length;
  const totalStructures = Object.keys(structures).length;

  if (total >= totalStructures - 2) {
    syndromes.push(`<strong>Daño Cerebral Masivo / Coma Profundo:</strong> El compromiso extenso de estructuras corticales y subcorticales resulta incompatible con la vida consciente autónoma. Se requiere soporte vital asistido permanente e intervención neurológica urgente.`);
  } else {
    // Tronco — alerta crítica primero
    if (has('tronco')) {
      syndromes.push(`<strong>⚠️ Alerta Vital — Tronco Encefálico:</strong> El compromiso del tronco pone en riesgo inmediato la regulación cardiorrespiratoria autónoma y los ciclos de consciencia (SARA). Monitorización intensiva urgente.`);
    }

    // Síndromes de desconexión
    if (has('calloso')) {
      syndromes.push(`<strong>Síndrome de Cerebro Escindido (Desconexión Interhemisférica):</strong> Ausencia de transferencia de información entre hemisferios. El paciente puede realizar tareas independientes con cada mano pero no integra información asociativa ni lingüística entre ellas. Mano ajena posible.`);
    }

    // Afasias combinadas
    if (has('broca') && has('wernicke')) {
      syndromes.push(`<strong>Afasia Global:</strong> El compromiso simultáneo de Broca y Wernicke resulta en afasia total: el paciente no puede expresarse con fluidez ni comprender el lenguaje hablado o escrito. Es la forma más severa de afasia cortical.`);
    } else {
      if (has('broca')) {
        syndromes.push(`<strong>Afasia de Broca (No fluente):</strong> El paciente comprende el lenguaje pero no puede articularlo con fluidez. Habla telegráfica, lenta y con gran esfuerzo. Frecuentemente acompañado de apraxia del habla y frustración emocional por la incomunicación.`);
      }
      if (has('wernicke')) {
        syndromes.push(`<strong>Afasia de Wernicke (Fluente/Receptiva):</strong> El paciente habla con fluidez pero produce contenido incoherente, lleno de parafasias y neologismos. No comprende lo que se le dice y, críticamente, no es consciente de sus propios errores lingüísticos (anosognosia del déficit).`);
      }
    }

    // Frontal sin Broca
    if (has('frontal')) {
      syndromes.push(`<strong>Síndrome Desejecutivo Frontal:</strong> Pérdida de iniciativa, planificación, juicio social y autocontrol conductual. Desinhibición similar al perfil de Phineas Gage. Dificultad para seguir planes a largo plazo y para inhibir respuestas impulsivas.`);
    }

    // Ganglios Basales
    if (has('ganglios')) {
      syndromes.push(`<strong>Síndrome de Ganglios Basales:</strong> Disfunción en la regulación y selección del movimiento. Según el circuito afectado: hipocinesia y temblor en reposo (vía directa — tipo Parkinson), o movimientos involuntarios bruscos (vía indirecta — tipo corea/Huntington). Posibles síntomas neuropsiquiátricos como impulsividad o TOC.`);
    }

    // Tálamo y Dolor central
    if (has('talamo')) {
      syndromes.push(`<strong>Síndrome de Dejerine-Roussy (Dolor Talámico Central):</strong> Dolor neuropático crónico quemante e intolerable en el hemicuerpo contralateral a la lesión, frecuentemente con alodinia. La pérdida de la función de relay sensorial altera todas las modalidades sensitivas corticales.`);
    }

    // Hipotálamo
    if (has('hipotalamo')) {
      syndromes.push(`<strong>Disfunción Hipotalámica Homeostática:</strong> Alteraciones metabólicas drásticas: diabetes insípida (poliuria, deshidratación), obesidad hipotalámica (hiperfagia), disregulación térmica severa, e infertilidad por fallo del eje gonadotrófico.`);
    }

    // Giro Cingulado
    if (has('cingulado')) {
      syndromes.push(`<strong>Mutismo Acinético y Síndrome Apático Cingulado:</strong> Pérdida del impulso conductual y verbal. El paciente es capaz físicamente de moverse y hablar, pero no tiene iniciativa para hacerlo. Indiferencia emocional y fallo en la detección de errores propios (metacognición).`);
    }

    // Memoria: hipocampo + temporal
    if (has('hipocampo') && has('temporal')) {
      syndromes.push(`<strong>Amnesia Anterógrada Completa (Síndrome H.M.):</strong> Destrucción bilateral de los sistemas de memoria declarativa. El paciente es incapaz de retener ningún nuevo evento o hecho consciente. La memoria procedural y semántica remota pueden estar parcialmente preservadas.`);
    } else if (has('hipocampo')) {
      syndromes.push(`<strong>Amnesia Anterógrada por Lesión Hipocampal:</strong> Incapacidad de consolidar nuevas memorias episódicas y declarativas. El paciente olvida en minutos cualquier conversación reciente. Desorientación espacial severa.`);
    }

    // Occipital + Parietal — Síndrome de Bálint
    if (has('occipital') && has('parietal')) {
      syndromes.push(`<strong>Síndrome de Bálint (Lesión Bilateral Posterior):</strong> Simultanagnosia (incapacidad de percibir más de un objeto a la vez), apraxia óptica y ataxia óptica. El paciente no puede utilizar información visual para guiar sus movimientos. Déficit sensorial táctil y visoespacial simultáneo.`);
    } else {
      if (has('occipital')) syndromes.push(`<strong>Ceguera Cortical y Agnosia Visual:</strong> Pérdida de la percepción visual de origen cerebral pese a integridad ocular. Posible anosognosia del déficit (Síndrome de Anton-Babinski). Hemianopsia, alucinaciones visuales o prosopagnosia según el área afectada.`);
      if (has('parietal')) syndromes.push(`<strong>Heminegligencia Unilateral y Síndrome de Gerstmann:</strong> El paciente ignora por completo un hemicampo espacial y corporal. Posible acalculia, agrafia, apraxia constructiva y dificultad para distinguir izquierda de derecha.`);
    }

    // Amígdala
    if (has('amigdala')) {
      syndromes.push(`<strong>Síndrome Emocional — Ausencia Patológica de Miedo:</strong> Incapacidad de reconocer y responder a amenazas. Docilidad extrema y, en lesiones combinadas con temporal, hipersexualidad e hiporalidad (Síndrome de Klüver-Bucy). Déficit en reconocimiento de expresiones faciales de miedo.`);
    }

    // Cerebelo
    if (has('cerebelo')) {
      syndromes.push(`<strong>Síndrome Cerebeloso Motor:</strong> Descoordinación motora (ataxia), incapacidad de movimientos alternantes rápidos (disdiadococinesia), imprecisión en el alcance de objetos (dismetría) y temblor de intención. La marcha es inestable con base amplia, sin parálisis real.`);
    }
  }

  reportIntegration.innerHTML = syndromes.length > 0
    ? syndromes.join('<br><br>')
    : 'Sin síndromes de integración identificados para esta combinación de lesiones.';
}

// ──────────────────────────────────────────────────────────────────────────────
// Markdown Parser
// ──────────────────────────────────────────────────────────────────────────────
function parseBrainMarkdown(text) {
  const sections = text.split(/(?=#\s+)/);
  const parsed = {};

  sections.forEach(sec => {
    const lines = sec.split('\n');
    const titleMatch = lines[0].match(/#\s*(.+)/);
    if (!titleMatch) return;

    const name = titleMatch[1].trim();
    let id = name.toLowerCase();

    // Normalize names to canonical SVG ids
    if (id.includes('frontal') && !id.includes('broca') && !id.includes('pre')) id = 'frontal';
    else if (id.includes('parietal')) id = 'parietal';
    else if (id.includes('temporal') && !id.includes('wernicke')) id = 'temporal';
    else if (id.includes('occipital')) id = 'occipital';
    else if (id.includes('cerebelo')) id = 'cerebelo';
    else if (id.includes('tronco') || id.includes('encefálico') || id.includes('encefalico')) id = 'tronco';
    else if (id.includes('hipocampo')) id = 'hipocampo';
    else if (id.includes('amigdala') || id.includes('amígdala')) id = 'amigdala';
    else if (id.includes('calloso') || id.includes('cuerpo calloso')) id = 'calloso';
    else if (id.includes('tálamo') || id.includes('talamo')) id = 'talamo';
    else if (id.includes('hipotálamo') || id.includes('hipotalamo')) id = 'hipotalamo';
    else if (id.includes('cingulado') || id.includes('cíngulo') || id.includes('cingulo')) id = 'cingulado';
    else if (id.includes('broca')) id = 'broca';
    else if (id.includes('wernicke')) id = 'wernicke';
    else if (id.includes('ganglios') || id.includes('basal')) id = 'ganglios';

    const data = {
      name: name,
      funcion: '',
      neurotransmisores: '',
      caso: '',
      lesion: '',
      isDamaged: false
    };

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('-')) {
        const colonIdx = line.indexOf(':');
        if (colonIdx !== -1) {
          const key = line.substring(1, colonIdx).trim().toLowerCase();
          const val = line.substring(colonIdx + 1).trim();
          if (key.includes('función') || key.includes('funcion')) data.funcion = val;
          else if (key.includes('neurotransmisor')) data.neurotransmisores = val;
          else if (key.includes('caso')) data.caso = val;
          else if (key.includes('lesión') || key.includes('lesion')) data.lesion = val;
        }
      }
    }

    parsed[id] = data;
  });

  return parsed;
}

// ──────────────────────────────────────────────────────────────────────────────
// Editor Actions
// ──────────────────────────────────────────────────────────────────────────────
function applyEditorChanges() {
  const text = markdownInput.value;
  try {
    const parsed = parseBrainMarkdown(text);
    const requiredKeys = ['frontal','parietal','temporal','occipital','cerebelo','tronco',
                          'hipocampo','amigdala','calloso','talamo','hipotalamo','cingulado',
                          'broca','wernicke','ganglios'];
    const missing = requiredKeys.filter(k => !parsed[k]);
    if (missing.length > 0) {
      alert(`Secciones faltantes: ${missing.join(', ')}. El SVG no responderá a esas áreas.`);
    }

    // Preservar estado de daño previo
    for (let id in parsed) {
      if (structures[id]) parsed[id].isDamaged = structures[id].isDamaged;
    }

    structures = parsed;
    updateStructureDetails(selectedRegionId);
    updateSvgStates();
    generateDiagnosticReport();
    switchTab('details');

    applyMarkdownBtn.textContent = '¡Aplicado ✓';
    applyMarkdownBtn.style.background = '#10b981';
    setTimeout(() => {
      applyMarkdownBtn.textContent = 'Aplicar Cambios';
      applyMarkdownBtn.style.background = '';
    }, 1800);
  } catch(e) {
    alert('Error al procesar el Markdown. Revisa la sintaxis.');
    console.error(e);
  }
}

function downloadMarkdownFile() {
  const blob = new Blob([markdownInput.value], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cerebro_neuropsicologia_${Date.now()}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

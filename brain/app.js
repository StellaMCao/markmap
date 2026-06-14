/* app.js - Explorador de Neuropsicología y Anatomía Cerebral */

// Contenido Markdown inicial con información anatómica y clínica detallada (12 estructuras)
const INITIAL_MARKDOWN = `# Lóbulo Frontal
- Función: Planificación de la conducta, toma de decisiones, control motor voluntario, razonamiento lógico, modulación de la personalidad y producción fluida del habla (Área de Broca).
- Neurotransmisores: Dopamina, Acetilcolina.
- Caso Clínico: Phineas Gage (1848), quien tras atravesar su lóbulo frontal con una barra de hierro sufrió un cambio drástico de personalidad, volviéndose desinhibido e irritable.
- Lesión: Síndrome des-ejecutivo, desinhibición conductual, apatía, hemiparesia contralateral y afasia motora de Broca (dificultad severa para hablar).

# Lóbulo Parietal
- Función: Procesamiento somatosensorial (tacto, dolor, temperatura, presión), integración de información multisensorial, orientación espacial y procesamiento numérico/cálculo.
- Neurotransmisores: Glutamato, GABA.
- Caso Clínico: Paciente con heminegligencia unilateral que, tras un accidente cerebrovascular en el lóbulo parietal derecho, ignora completamente el lado izquierdo de su cuerpo y entorno.
- Lesión: Heminegligencia espacial, agnosia táctil (astereognosia), apraxia constructiva y Síndrome de Gerstmann (acalculia, agrafia, desorientación izquierda-derecha).

# Lóbulo Temporal
- Función: Procesamiento y decodificación auditiva, comprensión del lenguaje hablado (Área de Wernicke), memoria declarativa a largo plazo y reconocimiento facial/visual complejo (Área Fusiforme).
- Neurotransmisores: Acetilcolina, Glutamato.
- Caso Clínico: Paciente H.M. (Henry Molaison), a quien se le extirpó bilateralmente el lóbulo temporal medial (incluido el hipocampo) y perdió de por vida la capacidad de formar nuevas memorias.
- Lesión: Amnesia anterógrada severa, afasia sensorial de Wernicke (habla fluida pero carente de significado) y agnosia visual para caras (prosopagnosia).

# Lóbulo Occipital
- Función: Procesamiento visual primario y de asociación (percepción de formas, colores, movimiento, orientación y reconocimiento de patrones visuales).
- Neurotransmisores: GABA, Glutamato.
- Caso Clínico: Pacientes con ceguera cortical que insisten en que pueden ver, tropezando con objetos (Síndrome de Anton-Babinski, una anosognosia visual).
- Lesión: Ceguera cortical (ceguera de origen cerebral), hemianopsia homónima, alucinaciones visuales y agnosia visual de objetos.

# Cerebelo
- Función: Coordinación fina del movimiento voluntario, regulación del equilibrio postural, tono muscular, control de la precisión temporal y aprendizaje motor procedimental.
- Neurotransmisores: GABA (células de Purkinje), Glutamato.
- Caso Clínico: Paciente con degeneración cerebelosa que muestra una marcha inestable ("de borracho"), dismetría al intentar tocarse la nariz y temblor de intención.
- Lesión: Ataxia cerebelosa (falta de coordinación motora), dismetría, disdiadococinesia, temblor intencional e hipotonía muscular.

# Tronco Encefálico
- Función: Control de funciones vitales autónomas (respiración, frecuencia cardíaca, presión arterial), modulación de los ciclos de sueño y vigilia (SARA) y origen de nervios craneales.
- Neurotransmisores: Noradrenalina, Serotonina, Dopamina.
- Caso Clínico: Paciente con Síndrome de Enclaustramiento (Locked-in syndrome) tras un infarto en la protuberancia: parálisis completa y consciencia intacta, comunicándose solo con los ojos.
- Lesión: Coma, paro cardiorrespiratorio (riesgo vital extremo), Síndrome de Enclaustramiento, disfunción autonómica grave y parálisis de nervios craneales.

# Hipocampo
- Función: Consolidación y codificación de la memoria declarativa (hechos y eventos) a corto plazo para pasar a largo plazo, y mapa de orientación espacial.
- Neurotransmisores: Acetilcolina, Serotonina.
- Caso Clínico: Pacientes con enfermedad de Alzheimer temprana donde la degeneración bilateral del hipocampo impide recordar conversaciones de hace minutos.
- Lesión: Incapacidad de consolidar nuevos recuerdos (amnesia anterógrada total), desorientación topográfica espacial profunda.

# Amígdala
- Función: Procesamiento y regulación de las emociones (especialmente miedo, agresión y respuestas de defensa ante amenazas), condicionamiento del miedo y memoria emocional.
- Neurotransmisores: Noradrenalina, Adrenalina, Serotonina.
- Caso Clínico: Paciente S.M. con la enfermedad de Urbach-Wiethe (destrucción selectiva de la amígdala) que carece por completo de la sensación de miedo ante peligros y animales venenosos.
- Lesión: Ausencia patológica de miedo frente a amenazas, docilidad extrema (Síndrome de Klüver-Bucy), y déficit para identificar el miedo en rostros ajenos.

# Cuerpo Calloso
- Función: Facilitar la comunicación interhemisférica, permitiendo la transferencia e integración de información sensorial, motora y cognitiva entre ambos hemisferios.
- Neurotransmisores: Glutamato, GABA.
- Caso Clínico: Pacientes con "cerebro escindido" (split-brain) sometidos a comisurotomía para tratar epilepsia severa; podían dibujar un objeto con la mano izquierda pero eran incapaces de nombrarlo verbalmente.
- Lesión: Síndrome de desconexión interhemisférica, apraxia unilateral izquierda, alexia sin agrafia y mutismo transitorio.

# Tálamo
- Función: Estación de relevo y procesamiento sensorial principal para todas las vías sensitivas (excepto el olfato) antes de proyectar a la corteza cerebral, regulación del estado de alerta y conciencia.
- Neurotransmisores: Glutamato, GABA, Acetilcolina.
- Caso Clínico: Síndrome de Dejerine-Roussy (síndrome de dolor talámico central), caracterizado por dolor quemante severo y persistente en el lado opuesto del cuerpo tras un infarto talámico.
- Lesión: Hemihipoestesia contralateral (pérdida de sensibilidad), dolor talámico central, coreoatetosis y deterioro cognitivo/amnésico (síndrome talámico).

# Hipotálamo
- Función: Regulación de la homeostasis corporal (temperatura, hambre, sed, saciedad), control del sistema endocrino mediante la hipófisis, control de los ritmos circadianos y respuestas autónomas del estrés.
- Neurotransmisores: Dopamina, Serotonina, Oxitocina, Vasopresina.
- Caso Clínico: Pacientes con tumores hipotalámicos (ej. craneofaringioma) que desarrollan obesidad hipotalámica (hambre insaciable) y diabetes insípida.
- Lesión: Diabetes insípida, hipertermia/hipotermia, obesidad hipotalámica, alteraciones del sueño (narcolepsia) y disfunción sexual o endocrina.

# Giro Cingulado
- Función: Procesamiento emocional, regulación del comportamiento conductual, detección de errores y conflictos cognitivos, control autonómico motor y modulación del dolor físico y emocional.
- Neurotransmisores: Glutamato, GABA, Serotonina.
- Caso Clínico: Pacientes con cingulotomía anterior (cirugía estereotáctica) realizada para aliviar el dolor crónico refractario o el trastorno obsesivo-compulsivo severo.
- Lesión: Apatía severa, mutismo acinético (incapacidad para hablar o moverse voluntariamente), indiferencia al dolor y labilidad emocional.`;

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

// Inicialización de la aplicación
window.addEventListener('DOMContentLoaded', () => {
  // Configurar Markdown inicial en el textarea
  markdownInput.value = INITIAL_MARKDOWN;
  
  // Parsear estructuras
  structures = parseBrainMarkdown(INITIAL_MARKDOWN);
  
  // Eventos de los Tabs
  tabBtnDetails.addEventListener('click', () => switchTab('details'));
  tabBtnEditor.addEventListener('click', () => switchTab('editor'));
  
  // Eventos de las Vistas (Lateral / Medial)
  btnViewLateral.addEventListener('click', () => switchView('lateral'));
  btnViewMedial.addEventListener('click', () => switchView('medial'));
  
  // Eventos del Editor
  applyMarkdownBtn.addEventListener('click', applyEditorChanges);
  downloadMarkdownBtn.addEventListener('click', downloadMarkdownFile);
  
  // Eventos de Simulación de Lesiones
  toggleLesionMode.addEventListener('change', handleModeChange);
  clearLesionsBtn.addEventListener('click', resetAllLesions);
  printReportBtn.addEventListener('click', () => window.print());
  
  // Configurar eventos en las regiones cerebrales del SVG
  setupBrainSvgEvents();
  
  // Renderizar la primera ficha y el reporte
  updateStructureDetails(selectedRegionId);
  updateSvgStates();
  generateDiagnosticReport();
});

// Cambiar de Pestaña (Tabs)
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

// Cambiar de Vista Cerebral (Lateral / Medial)
function switchView(view) {
  currentView = view;
  
  if (view === 'lateral') {
    btnViewLateral.classList.add('active-view');
    btnViewMedial.classList.remove('active-view');
    viewLateralGroup.style.display = 'block';
    viewMedialGroup.style.display = 'none';
    
    // Si la región seleccionada actualmente solo es visible en corte medial, revertir a frontal
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

// Configurar Eventos del SVG Cerebral
function setupBrainSvgEvents() {
  const regions = brainSvg.querySelectorAll('.brain-region');
  
  regions.forEach(region => {
    const id = getCanonicalId(region.id);
    
    // Hover
    region.addEventListener('mouseenter', () => {
      if (!isLesionMode) {
        // En modo inspección, mostrar detalles al pasar el mouse
        updateStructureDetails(id);
      }
      showSvgFloatingLabel(region);
    });
    
    region.addEventListener('mouseleave', () => {
      if (!isLesionMode) {
        // Devolver a la región seleccionada fijada
        updateStructureDetails(selectedRegionId);
      }
      hideSvgFloatingLabel();
    });
    
    // Click
    region.addEventListener('click', (e) => {
      e.stopPropagation();
      
      if (isLesionMode) {
        // En modo lesión, dañar/curar la región
        toggleRegionLesion(id, region);
      } else {
        // En modo inspección, fijar/seleccionar la región
        selectRegion(id, region);
      }
    });
  });
  
  // Hacer clic fuera del cerebro deselecciona o limpia
  brainSvg.addEventListener('click', () => {
    if (!isLesionMode) {
      clearRegionSelection();
    }
  });
}

// Obtener ID canónico desde el ID del elemento SVG (ej. "region-frontal-medial" -> "frontal")
function getCanonicalId(svgId) {
  let id = svgId.replace('region-', '');
  if (id.endsWith('-medial')) {
    id = id.substring(0, id.length - 7);
  }
  return id;
}

// Seleccionar Región (Modo Inspeccionar)
function selectRegion(id, element) {
  selectedRegionId = id;
  updateSvgStates();
  updateStructureDetails(id);
}

function clearRegionSelection() {
  selectedRegionId = "frontal"; // Default de vuelta a frontal
  updateSvgStates();
  updateStructureDetails(selectedRegionId);
}

// Cambiar Estado de Lesión (Modo Lesión)
function toggleRegionLesion(id, element) {
  if (!structures[id]) return;
  
  const isDamaged = !structures[id].isDamaged;
  structures[id].isDamaged = isDamaged;
  
  // Sincronizar todos los elementos SVG de ambas vistas
  updateSvgStates();
  
  // Actualizar Ficha y Generar Reporte de Déficits
  updateStructureDetails(id);
  generateDiagnosticReport();
}

// Actualizar estados visuales de los elementos SVG
function updateSvgStates() {
  const regions = brainSvg.querySelectorAll('.brain-region');
  regions.forEach(region => {
    const structId = getCanonicalId(region.id);
    const data = structures[structId];
    if (data) {
      // Sincronizar clase seleccionada
      if (structId === selectedRegionId) {
        region.classList.add('selected-region');
      } else {
        region.classList.remove('selected-region');
      }
      
      // Sincronizar clase dañada
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

// Restablecer todas las lesiones
function resetAllLesions() {
  for (let id in structures) {
    structures[id].isDamaged = false;
  }
  
  updateSvgStates();
  generateDiagnosticReport();
  updateStructureDetails(selectedRegionId);
}

// Cambiar entre Modo Inspeccionar y Modo Lesión
function handleModeChange() {
  isLesionMode = toggleLesionMode.checked;
  
  if (isLesionMode) {
    modeBanner.classList.add('lesion-active');
    modeText.textContent = "Modo: Simulación de Lesiones (Haz clic)";
    updateSvgStates(); // Limpia clase select visual temporal
  } else {
    modeBanner.classList.remove('lesion-active');
    modeText.textContent = "Modo: Inspeccionar Estructuras";
    updateSvgStates();
  }
}

// Mostrar etiqueta flotante temporal en el SVG
function showSvgFloatingLabel(regionElement) {
  const id = getCanonicalId(regionElement.id);
  const data = structures[id];
  if (!data) return;
  
  const bbox = regionElement.getBBox();
  const x = bbox.x + bbox.width / 2;
  const y = bbox.y + bbox.height / 2;
  
  const hoverLabelsG = document.getElementById('hover-labels');
  hoverLabelsG.innerHTML = '';
  
  // Crear fondo para el texto
  const textBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  textBg.setAttribute('fill', 'rgba(15, 23, 42, 0.95)');
  textBg.setAttribute('stroke', 'rgba(255,255,255,0.15)');
  textBg.setAttribute('stroke-width', '1');
  textBg.setAttribute('rx', '4');
  textBg.setAttribute('ry', '4');
  
  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('fill', '#ffffff');
  text.setAttribute('font-family', 'Outfit');
  text.setAttribute('font-weight', '600');
  text.setAttribute('font-size', '13');
  text.setAttribute('text-anchor', 'middle');
  text.setAttribute('dominant-baseline', 'middle');
  text.textContent = data.name + (data.isDamaged ? " (LESIONADO)" : "");
  
  hoverLabelsG.appendChild(textBg);
  hoverLabelsG.appendChild(text);
  
  // Medir texto
  setTimeout(() => {
    try {
      const textBBox = text.getBBox();
      textBg.setAttribute('x', x - textBBox.width / 2 - 10);
      textBg.setAttribute('y', y - textBBox.height / 2 - 6);
      textBg.setAttribute('width', textBBox.width + 20);
      textBg.setAttribute('height', textBBox.height + 12);
      
      text.setAttribute('x', x);
      text.setAttribute('y', y);
    } catch(e) {}
  }, 10);
}

// Ocultar etiqueta flotante
function hideSvgFloatingLabel() {
  document.getElementById('hover-labels').innerHTML = '';
}

// Actualizar Ficha de Estructura Lateral
function updateStructureDetails(id) {
  const data = structures[id];
  if (!data) return;
  
  structureName.textContent = data.name;
  
  // Cambiar el estilo de la insignia del tipo
  structureBadge.className = `badge badge-${id}`;
  if (id === 'hipocampo' || id === 'amigdala' || id === 'cingulado') {
    structureBadge.textContent = "Sistema Límbico";
    structureBadge.className = `badge badge-limbic`;
  } else if (id === 'talamo' || id === 'hipotalamo') {
    structureBadge.textContent = "Región Subcortical";
    structureBadge.className = `badge badge-talamo`;
  } else if (id === 'calloso') {
    structureBadge.textContent = "Fibras de Comisura";
    structureBadge.className = `badge badge-calloso`;
  } else if (id === 'tronco') {
    structureBadge.textContent = "Tronco Encefálico";
  } else if (id === 'cerebelo') {
    structureBadge.textContent = "Cerebelo";
  } else {
    structureBadge.textContent = "Corteza Cerebral";
  }
  
  // Agregar indicador si está lesionado
  if (data.isDamaged) {
    structureName.innerHTML = `${data.name} <span style="color:#ef4444; font-size:12px; font-weight:700;">[LESIONADO]</span>`;
  }
  
  structureFuncion.textContent = data.funcion;
  structureNeuro.textContent = data.neurotransmisores;
  structureCaso.innerHTML = data.caso;
  structureLesion.textContent = data.lesion;
}

// Generador del Reporte Clínico Diagnóstico (Motor Lógico)
function generateDiagnosticReport() {
  const damagedIds = [];
  for (let id in structures) {
    if (structures[id].isDamaged) {
      damagedIds.push(id);
    }
  }
  
  if (damagedIds.length === 0) {
    // Caso: Sano
    reportIndicator.style.background = "#10b981";
    reportStatusText.textContent = "Estado: Sano";
    reportStatusText.style.color = "#10b981";
    reportStructures.textContent = "Ninguna estructura comprometida.";
    reportDeficits.innerHTML = "<li>Sin déficits neurocognitivos evidenciados. Comportamiento y reflejos normales.</li>";
    reportIntegration.innerHTML = "El cerebro se encuentra en óptimas condiciones fisiológicas y funcionales. Respuestas biológicas y cognitivas normales.";
    return;
  }
  
  // Caso: Lesionado
  reportIndicator.style.background = "#ef4444";
  reportStatusText.textContent = `Estado: Dañado (${damagedIds.length} áreas)`;
  reportStatusText.style.color = "#ef4444";
  
  // Listar estructuras comprometidas
  const names = damagedIds.map(id => structures[id].name);
  reportStructures.textContent = names.join(', ');
  
  // Listar déficits específicos
  reportDeficits.innerHTML = '';
  damagedIds.forEach(id => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${structures[id].name}:</strong> ${structures[id].lesion}`;
    reportDeficits.appendChild(li);
  });
  
  // Análisis de integración clínica (Síntesis)
  let integrationText = "";
  
  const hasFrontal = structures['frontal']?.isDamaged;
  const hasTemporal = structures['temporal']?.isDamaged;
  const hasParietal = structures['parietal']?.isDamaged;
  const hasOccipital = structures['occipital']?.isDamaged;
  const hasCerebelo = structures['cerebelo']?.isDamaged;
  const hasTronco = structures['tronco']?.isDamaged;
  const hasHipo = structures['hipocampo']?.isDamaged;
  const hasAmig = structures['amigdala']?.isDamaged;
  const hasCalloso = structures['calloso']?.isDamaged;
  const hasTalamo = structures['talamo']?.isDamaged;
  const hasHipotalamo = structures['hipotalamo']?.isDamaged;
  const hasCingulado = structures['cingulado']?.isDamaged;
  
  // Combinaciones complejas
  if (damagedIds.length === 12) {
    integrationText = "<strong>Muerte Encefálica / Coma Generalizado:</strong> Daño masivo incompatible con la vida consciente. Cese absoluto de funciones corticales y autónomas subcorticales. Se requiere soporte vital asistido permanente.";
  } else if (hasTronco) {
    integrationText = "<strong>Alerta Crítica Vegetativa:</strong> El compromiso en el tronco encefálico pone en riesgo la regulación vital autónoma cardiorrespiratoria y los ciclos de conciencia (SARA). " + 
      (hasHipo || hasTemporal ? "Adicionalmente, se presenta amnesia anterógrada severa. " : "") + 
      "El paciente requiere monitorización intensiva y soporte vital.";
  } else {
    const syndromes = [];
    
    // Split-brain
    if (hasCalloso) {
      syndromes.push("<strong>Síndrome de Cerebro Escindido (Desconexión Interhemisférica):</strong> Ausencia de transferencia de información entre hemisferios. El paciente puede realizar tareas mecánicas independientes con cada mano sin cruzar información asociativa o lingüística.");
    }
    
    // Tálamo
    if (hasTalamo) {
      syndromes.push("<strong>Síndrome de Dolor Talámico (Dejerine-Roussy):</strong> Dolor neuropático central crónico intolerable y pérdida de modulación sensorial somatodegradable en el hemicuerpo contralateral.");
    }

    // Hipotálamo
    if (hasHipotalamo) {
      syndromes.push("<strong>Disfunción Homeostática e Hipotalámica:</strong> Alteraciones metabólicas drásticas, diabetes insípida por falta de vasopresina, y obesidad hipotalámica severa por ausencia de centros de saciedad.");
    }

    // Giro Cingulado
    if (hasCingulado) {
      syndromes.push("<strong>Mutismo Acinético y Apatía Cingulada:</strong> Pérdida del impulso conductual y motor para hablar o moverse. Indiferencia emocional y fallos de detección de conflicto cognitivo.");
    }
    
    // Combinaciones Corticales
    if (hasFrontal && hasTemporal) {
      syndromes.push("<strong>Afasia Mixta Global y Síndrome Desejecutivo-Amnésico:</strong> El paciente experimenta desconexión lingüística global (afasia expresiva de Broca + afasia comprensiva de Wernicke) junto a una pérdida severa de memoria funcional de trabajo.");
    } else if (hasFrontal) {
      syndromes.push("<strong>Síndrome Desejecutivo Frontal:</strong> Pérdida marcada de iniciativa, planificación a futuro y autocontrol de la conducta social, similar al perfil histórico de Phineas Gage.");
    }
    
    if (hasHipo && hasTemporal) {
      syndromes.push("<strong>Amnesia Anterógrada Completa (Síndrome H.M.):</strong> Incapacidad absoluta para retener información nueva en la memoria explícita, con preservación de memorias procedimentales mecánicas e infartos lingüísticos leves.");
    } else if (hasHipo) {
      syndromes.push("<strong>Pérdida de Consolidación de Memorias Nuevas:</strong> Amnesia anterógrada por incapacidad de transferir información a largo plazo a través de circuitos mediales.");
    }
    
    if (hasOccipital && hasParietal) {
      syndromes.push("<strong>Déficit Sensorial y de Orientación Visoespacial:</strong> Síntomas compatibles con el Síndrome de Bálint (simultanagnosia, apraxia óptica y ataxia óptica). El procesamiento sensorial táctil y de visualización cortical se encuentra inoperativo.");
    } else {
      if (hasOccipital) syndromes.push("<strong>Ceguera Cortical y Agnosia Visual:</strong> Daño en áreas visuales V1/V2, lo que resulta en ceguera visual pese a la indemnidad ocular (ocasionalmente con anosognosia/negación del déficit visual).");
      if (hasParietal) syndromes.push("<strong>Síndrome de Heminegligencia Unilateral:</strong> El paciente desatiende por completo un hemicampo corporal y del entorno.");
    }
    
    if (hasAmig) {
      syndromes.push("<strong>Síndrome Emocional / Ausencia de Miedo:</strong> Pérdida del condicionamiento al miedo, comportamiento dócil (Síndrome de Klüver-Bucy) y déficit crítico para identificar la hostilidad en rostros ajenos.");
    }
    
    if (hasCerebelo) {
      syndromes.push("<strong>Síndrome Cerebeloso Motor:</strong> Descoordinación motora evidente (ataxia, dismetría) que imposibilita la marcha normal y la precisión motriz, sin parálisis real.");
    }
    
    integrationText = syndromes.join('<br><br>');
  }
  
  reportIntegration.innerHTML = integrationText;
}

// Parser Markdown
function parseBrainMarkdown(text) {
  const sections = text.split(/(?=#\s+)/);
  const parsed = {};
  
  sections.forEach(sec => {
    const lines = sec.split('\n');
    const titleMatch = lines[0].match(/#\s*(.+)/);
    if (!titleMatch) return;
    
    const name = titleMatch[1].trim();
    let id = name.toLowerCase();
    
    // Normalizar a IDs correspondientes al SVG
    if (id.includes('frontal')) id = 'frontal';
    else if (id.includes('parietal')) id = 'parietal';
    else if (id.includes('temporal')) id = 'temporal';
    else if (id.includes('occipital')) id = 'occipital';
    else if (id.includes('cerebelo')) id = 'cerebelo';
    else if (id.includes('tronco') || id.includes('encefalico')) id = 'tronco';
    else if (id.includes('hipocampo')) id = 'hipocampo';
    else if (id.includes('amigdala') || id.includes('amígdala')) id = 'amigdala';
    else if (id.includes('calloso') || id.includes('cuerpo')) id = 'calloso';
    else if (id.includes('talamo') || id.includes('tálamo')) id = 'talamo';
    else if (id.includes('hipotalamo') || id.includes('hipotálamo')) id = 'hipotalamo';
    else if (id.includes('cingulado') || id.includes('cingulo') || id.includes('cíngulo')) id = 'cingulado';
    
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

// Aplicar Cambios del Editor
function applyEditorChanges() {
  const text = markdownInput.value;
  try {
    const parsed = parseBrainMarkdown(text);
    
    // Validar que tengamos las áreas requeridas (12 estructuras)
    const requiredKeys = ['frontal', 'parietal', 'temporal', 'occipital', 'cerebelo', 'tronco', 'hipocampo', 'amigdala', 'calloso', 'talamo', 'hipotalamo', 'cingulado'];
    const missing = requiredKeys.filter(k => !parsed[k]);
    
    if (missing.length > 0) {
      alert(`Advertencia: Faltan las siguientes secciones en tu Markdown: ${missing.join(', ')}. Tu SVG no responderá a estas áreas.`);
    }
    
    // Fusionar estado de daños previo en el nuevo objeto parseado
    for (let id in parsed) {
      if (structures[id]) {
        parsed[id].isDamaged = structures[id].isDamaged;
      }
    }
    
    structures = parsed;
    updateStructureDetails(selectedRegionId);
    updateSvgStates();
    generateDiagnosticReport();
    switchTab('details');
    
    // Feedback visual
    applyMarkdownBtn.textContent = '¡Aplicado!';
    applyMarkdownBtn.style.background = '#10b981';
    setTimeout(() => {
      applyMarkdownBtn.textContent = 'Aplicar Cambios';
      applyMarkdownBtn.style.background = '';
    }, 1500);
    
  } catch (e) {
    alert("Error al procesar el Markdown de anatomía. Verifica la sintaxis.");
    console.error(e);
  }
}

// Descargar Archivo Markdown
function downloadMarkdownFile() {
  const text = markdownInput.value;
  const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `cerebro_neuropsicologia_${Date.now()}.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

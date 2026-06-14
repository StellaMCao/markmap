/* app.js - Explorador de Neuropsicología y Anatomía Cerebral */

// Contenido Markdown inicial con información anatómica y clínica detallada
const INITIAL_MARKDOWN = `# Lóbulo Frontal
- Función: Planificación de la conducta, toma de decisiones, control motor voluntario, razonamiento lógico, modulación de la personalidad y producción fluida del habla (Área de Broca).
- Neurotransmisores: Dopamina, Acetilcolina.
- Caso Clínico: Phineas Gage (1848), quien tras atravesar su lóbulo frontal con una barra de hierro sufrió un cambio drástico de personalidad, volviéndose desinhibido e irritable.
- Lesión: Síndrome des-ejecutivo, desinhibición conductual, apatía, hemiparesia contralateral y afasia motora de Broca (dificultad severa para producir lenguaje hablado).

# Lóbulo Parietal
- Función: Procesamiento somatosensorial (tacto, dolor, temperatura, presión), integración de información multisensorial, orientación espacial y procesamiento numérico/cálculo.
- Neurotransmisores: Glutamato, GABA.
- Caso Clínico: Paciente con heminegligencia unilateral que, tras un accidente cerebrovascular en el lóbulo parietal derecho, ignora completamente el lado izquierdo de su cuerpo y entorno.
- Lesión: Heminegligencia espacial, agnosia táctil (astereognosia), apraxia constructiva y Síndrome de Gerstmann (acalculia, agrafia, desorientación izquierda-derecha).

# Lóbulo Temporal
- Función: Procesamiento y decodificación auditiva, comprensión del lenguaje hablado (Área de Wernicke), memoria declarativa a largo plazo y reconocimiento facial/visual complejo.
- Neurotransmisores: Acetilcolina, Glutamato.
- Caso Clínico: Paciente H.M. (Henry Molaison), a quien se le extirpó bilateralmente el lóbulo temporal medial (incluido el hipocampo) y perdió de por vida la capacidad de formar nuevas memorias.
- Lesión: Amnesia anterógrada severa, afasia sensorial de Wernicke (habla fluida pero carente de significado, jergafasia) y agnosia visual para caras (prosopagnosia).

# Lóbulo Occipital
- Función: Procesamiento visual primario y de asociación (percepción de formas, colores, movimiento, orientación y reconocimiento de patrones visuales).
- Neurotransmisores: GABA, Glutamato.
- Caso Clínico: Paciente con ceguera cortical que insiste en que puede ver, tropezando con objetos (Síndrome de Anton-Babinski, una anosognosia visual).
- Lesión: Ceguera cortical (ceguera de origen cerebral), hemianopsia homónima, alucinaciones visuales y agnosia visual de objetos (dificultad para reconocer lo que ve).

# Cerebelo
- Función: Coordinación fina del movimiento voluntario, regulación del equilibrio postural, tono muscular, control de la precisión temporal y aprendizaje motor procedimental.
- Neurotransmisores: GABA (células de Purkinje), Glutamato.
- Caso Clínico: Paciente con degeneración cerebelosa que muestra una marcha inestable ("de borracho"), dismetría al intentar tocarse la nariz y temblor de intención.
- Lesión: Ataxia cerebelosa (falta de coordinación), dismetría, disdiadococinesia, temblor intencional e hipotonía muscular.

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
- Lesión: Ausencia patológica de miedo frente a amenazas, doralidad e hipersexualidad (Síndrome de Klüver-Bucy), y déficit para identificar el miedo en rostros ajenos.`;

// Estado de la aplicación
let structures = {};
let selectedRegionId = "frontal"; // Región actualmente visualizada
let isLesionMode = false;

// DOM Elements
const brainSvg = document.getElementById('brain-svg');
const toggleLesionMode = document.getElementById('toggle-lesion-mode');
const clearLesionsBtn = document.getElementById('clear-lesions-btn');
const modeBanner = document.getElementById('mode-banner');
const modeText = document.getElementById('mode-text');

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

// Obtener ID canónico desde el ID del elemento SVG
function getCanonicalId(svgId) {
  return svgId.replace('region-', '');
}

// Seleccionar Región (Modo Inspeccionar)
function selectRegion(id, element) {
  // Limpiar selección previa
  const prevSelected = brainSvg.querySelector('.selected-region');
  if (prevSelected) prevSelected.classList.remove('selected-region');
  
  // Aplicar nueva selección
  element.classList.add('selected-region');
  selectedRegionId = id;
  
  updateStructureDetails(id);
}

function clearRegionSelection() {
  const prevSelected = brainSvg.querySelector('.selected-region');
  if (prevSelected) prevSelected.classList.remove('selected-region');
  selectedRegionId = "frontal"; // Default de vuelta a frontal
  updateStructureDetails(selectedRegionId);
}

// Cambiar Estado de Lesión (Modo Lesión)
function toggleRegionLesion(id, element) {
  if (!structures[id]) return;
  
  const isDamaged = !structures[id].isDamaged;
  structures[id].isDamaged = isDamaged;
  
  if (isDamaged) {
    element.classList.add('damaged');
    element.setAttribute('filter', 'url(#glow)');
  } else {
    element.classList.remove('damaged');
    element.removeAttribute('filter');
  }
  
  // Actualizar Ficha y Generar Reporte de Déficits
  updateStructureDetails(id);
  generateDiagnosticReport();
}

// Restablecer todas las lesiones
function resetAllLesions() {
  for (let id in structures) {
    structures[id].isDamaged = false;
  }
  
  const regions = brainSvg.querySelectorAll('.brain-region');
  regions.forEach(r => {
    r.classList.remove('damaged');
    r.removeAttribute('filter');
  });
  
  generateDiagnosticReport();
  updateStructureDetails(selectedRegionId);
}

// Cambiar entre Modo Inspeccionar y Modo Lesión
function handleModeChange() {
  isLesionMode = toggleLesionMode.checked;
  
  if (isLesionMode) {
    modeBanner.classList.add('lesion-active');
    modeText.textContent = "Modo: Simulación de Lesiones (Haz clic)";
    // Quitar selección visual temporal
    const prevSelected = brainSvg.querySelector('.selected-region');
    if (prevSelected) prevSelected.classList.remove('selected-region');
  } else {
    modeBanner.classList.remove('lesion-active');
    modeText.textContent = "Modo: Inspeccionar Estructuras";
    
    // Re-seleccionar la región actual
    const currentEl = document.getElementById(`region-${selectedRegionId}`);
    if (currentEl) currentEl.classList.add('selected-region');
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
  if (id === 'hipocampo' || id === 'amigdala') {
    structureBadge.textContent = "Sistema Límbico";
    structureBadge.className = `badge badge-limbic`;
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
  
  // Combinaciones complejas
  if (damagedIds.length === 8) {
    integrationText = "<strong>Muerte Encefálica / Estado de Coma Profundo:</strong> Daño masivo generalizado en la totalidad de las áreas corticales y subcorticales. Se requiere soporte vital completo. Incompatible con funciones conscientes de la corteza cerebral.";
  } else if (hasTronco) {
    integrationText = "<strong>Alerta Crítica Vegetativa:</strong> El daño en el tronco encefálico pone en riesgo directo la regulación autónoma respiratoria y cardíaca. " + 
      (hasTemporal || hasHipo ? "Además, presenta amnesia severa. " : "") + 
      "El estado hemodinámico y de conciencia del paciente requiere monitorización de terapia intensiva.";
  } else {
    const syndromes = [];
    
    if (hasFrontal && hasTemporal) {
      syndromes.push("<strong>Afasia Global y Síndrome Mixto Desejecutivo-Amnésico:</strong> El paciente experimenta una desconexión crítica entre la producción expresiva verbal (Broca) y la decodificación acústica (Wernicke), complementado por déficits severos de memoria de trabajo.");
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
      syndromes.push("<strong>Síndrome Emocional Planificado / Ausencia de Miedo:</strong> La calcificación o ablación amigdalina inhibe por completo el reflejo motor autonómico de alerta y lucha ante peligros externos, junto a incapacidad de reconocer expresiones faciales hostiles.");
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
    
    // Validar que tengamos las áreas requeridas
    const requiredKeys = ['frontal', 'parietal', 'temporal', 'occipital', 'cerebelo', 'tronco', 'hipocampo', 'amigdala'];
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

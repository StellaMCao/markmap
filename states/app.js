// State
let states = [];
let transitions = [];
let activeState = null;
let positionsCache = {}; // stateName -> {x, y}

// Examples
const EXAMPLES = {
  traffic: `# Semáforo Inteligente
- Verde -> Amarillo : tiempo_limite
- Amarillo -> Rojo : precaucion
- Rojo -> Verde : tiempo_limite
- Rojo -> Intermitente : averia
- Intermitente -> Rojo : reset`,

  lock: `# Cerradura de Combinación (Código: 1-2)
- Esperando -> Digito1 : ingresar_1
- Digito1 -> Esperando : timeout
- Digito1 -> Abierto* : ingresar_2
- Digito1 -> Alarma* : digito_incorrecto
- Esperando -> Alarma* : digito_incorrecto
- Abierto* -> Esperando : tiempo_limite
- Alarma* -> Esperando : reiniciar`,

  music: `# Reproductor de Música
- Detenido -> Reproduciendo : reproducir
- Reproduciendo -> Pausado : pausar
- Pausado -> Reproduciendo : reproducir
- Reproduciendo -> Detenido : detener
- Pausado -> Detenido : detener`
};

// DOM Elements
const markdownTextarea = document.getElementById('markdownTextarea');
const templateList = document.getElementById('templateList');
const loadInitialExampleBtn = document.getElementById('loadInitialExampleBtn');

const welcomeState = document.getElementById('welcomeState');
const canvasShell = document.getElementById('canvasShell');
const canvas = document.getElementById('canvas');
const connectorLayer = document.getElementById('connectorLayer');

const activeStateLabel = document.getElementById('activeStateLabel');
const triggerGrid = document.getElementById('triggerGrid');
const triggersSection = document.getElementById('triggersSection');

// Toolbar buttons
const saveBtn = document.getElementById('saveBtn');
const loadBtn = document.getElementById('loadBtn');
const clearBtn = document.getElementById('clearBtn');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const helpBtn = document.getElementById('helpBtn');
const closeHelpBtn = document.getElementById('closeHelpBtn');
const helpOverlay = document.getElementById('helpOverlay');

// Initialize
function init() {
  const savedPos = localStorage.getItem('states_positions');
  if (savedPos) {
    positionsCache = JSON.parse(savedPos);
  }

  const savedMd = localStorage.getItem('states_md');
  const savedActive = localStorage.getItem('states_active');
  if (savedMd) {
    markdownTextarea.value = savedMd;
    parseMarkdown(savedMd);
    
    // Set active state
    if (savedActive && states.some(s => s.name === savedActive)) {
      activeState = savedActive;
    } else if (states.length > 0) {
      const start = states.find(s => s.isStart);
      activeState = start ? start.name : states[0].name;
    }
    
    showView('canvas');
  } else {
    showView('welcome');
  }

  // Theme Init
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeToggleBtn.innerText = savedTheme === 'dark' ? '☀️' : '🌙';

  setupListeners();
}

function showView(view) {
  if (view === 'welcome') {
    welcomeState.hidden = false;
    canvasShell.hidden = true;
  } else {
    welcomeState.hidden = true;
    canvasShell.hidden = false;
    renderStates();
  }
}

// Setup Listeners
function setupListeners() {
  // Markdown Input
  markdownTextarea.addEventListener('input', (e) => {
    const text = e.target.value;
    localStorage.setItem('states_md', text);
    parseMarkdown(text);
    if (states.length > 0) {
      showView('canvas');
    } else {
      showView('welcome');
    }
  });

  // Example Buttons
  templateList.addEventListener('click', (e) => {
    const btn = e.target.closest('.template');
    if (!btn) return;
    const key = btn.getAttribute('data-example');
    loadExample(key);
  });
  
  loadInitialExampleBtn.addEventListener('click', () => loadExample('traffic'));

  // Theme Toggle
  themeToggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    themeToggleBtn.innerText = next === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', next);
  });

  // Help Modal
  helpBtn.addEventListener('click', () => helpOverlay.classList.add('active'));
  closeHelpBtn.addEventListener('click', () => helpOverlay.classList.remove('active'));
  helpOverlay.addEventListener('click', (e) => {
    if (e.target === helpOverlay) helpOverlay.classList.remove('active');
  });

  // Save/Load/Clear
  const exportFileBtn = document.getElementById('exportFileBtn');
  if (exportFileBtn) {
    exportFileBtn.addEventListener('click', () => {
      const text = markdownTextarea.value;
      const blob = new Blob([text], { type: 'text/markdown;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'automata_estados.md');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  saveBtn.addEventListener('click', () => {
    localStorage.setItem('states_md', markdownTextarea.value);
    localStorage.setItem('states_positions', JSON.stringify(positionsCache));
    localStorage.setItem('states_active', activeState);
    alert('Autómata guardado localmente.');
  });

  loadBtn.addEventListener('click', () => {
    const saved = localStorage.getItem('states_md');
    if (saved) {
      markdownTextarea.value = saved;
      const savedPos = localStorage.getItem('states_positions');
      if (savedPos) positionsCache = JSON.parse(savedPos);
      parseMarkdown(saved);
      const savedActive = localStorage.getItem('states_active');
      if (savedActive && states.some(s => s.name === savedActive)) {
        activeState = savedActive;
      }
      showView('canvas');
    } else {
      alert('No hay autómata guardado.');
    }
  });

  clearBtn.addEventListener('click', () => {
    if (confirm('¿Vaciar el autómata actual?')) {
      markdownTextarea.value = '';
      states = [];
      transitions = [];
      activeState = null;
      localStorage.removeItem('states_md');
      localStorage.removeItem('states_positions');
      localStorage.removeItem('states_active');
      positionsCache = {};
      showView('welcome');
    }
  });
}

function loadExample(key) {
  const md = EXAMPLES[key];
  if (md) {
    markdownTextarea.value = md;
    localStorage.setItem('states_md', md);
    parseMarkdown(md);
    showView('canvas');
  }
}

// Markdown Parser
function parseMarkdown(md) {
  states = [];
  transitions = [];
  const lines = md.split('\n');

  let stateNamesSet = new Set();
  let firstStateParsed = null;

  lines.forEach((line) => {
    const clean = line.trim();
    if (!clean || clean.startsWith('#')) return;

    // Transition format: - Source -> Target : TriggerEvent
    // Regex matching transition
    const match = clean.match(/^[-*+]\s*([a-zA-ZáéíóúÁÉÍÓÚñÑ\w_*]+)\s*->\s*([a-zA-ZáéíóúÁÉÍÓÚñÑ\w_*]+)\s*(?::\s*([a-zA-ZáéíóúÁÉÍÓÚñÑ\w_]+))?/);
    if (match) {
      const from = match[1].trim();
      const to = match[2].trim();
      const event = match[3] ? match[3].trim() : 'link';

      stateNamesSet.add(from);
      stateNamesSet.add(to);

      if (!firstStateParsed) {
        firstStateParsed = from;
      }

      transitions.push({ from, to, event });
    }
  });

  // Build State models
  stateNamesSet.forEach((name) => {
    const isStart = (name === firstStateParsed);
    const isEnd = name.endsWith('*');
    const cleanName = isEnd ? name.slice(0, -1) : name;

    states.push({
      name,
      cleanName,
      isStart,
      isEnd,
      x: positionsCache[name]?.x || 0,
      y: positionsCache[name]?.y || 0
    });
  });

  // Check active state
  if (states.length > 0) {
    if (!activeState || !states.some(s => s.name === activeState)) {
      const start = states.find(s => s.isStart);
      activeState = start ? start.name : states[0].name;
    }
  } else {
    activeState = null;
  }

  // Pre-arrange coordinates in a circle if not cached
  let circleIndex = 0;
  const centerX = 450;
  const centerY = 350;
  const radius = 180;
  
  states.forEach((state) => {
    if (state.x === 0 && state.y === 0) {
      const angle = (circleIndex / states.length) * 2 * Math.PI;
      state.x = Math.round(centerX + radius * Math.cos(angle));
      state.y = Math.round(centerY + radius * Math.sin(angle));
      circleIndex++;
    }
  });

  // Setup Trigger buttons panel
  renderTriggersPanel();
}

// Generate trigger buttons
function renderTriggersPanel() {
  triggerGrid.innerHTML = '';
  
  // Find all unique triggers that are not default links
  const events = [...new Set(transitions.map(t => t.event))].filter(e => e !== 'link');

  if (events.length === 0) {
    triggersSection.hidden = true;
    return;
  }
  
  triggersSection.hidden = false;
  events.forEach((evtName) => {
    const btn = document.createElement('button');
    btn.className = 'trigger-btn';
    btn.innerText = evtName;
    btn.addEventListener('click', () => fireEvent(evtName));
    triggerGrid.appendChild(btn);
  });
}

// Render Nodos circulares
function renderStates() {
  // Remove existing nodes
  canvas.querySelectorAll('.state-node').forEach(node => node.remove());

  activeStateLabel.innerText = activeState ? activeState : 'Ninguno';

  states.forEach((state) => {
    const node = document.createElement('div');
    node.className = 'state-node';
    node.id = `state-node-${state.name.replace(/\*/g, '')}`;
    
    // Position (circles are centered at (x, y))
    node.style.left = `${state.x - 45}px`; // center circle offset (width/2)
    node.style.top = `${state.y - 45}px`;

    if (state.isStart) node.classList.add('start-state');
    if (state.isEnd) node.classList.add('end-state');
    if (state.name === activeState) node.classList.add('active');

    // Title label
    node.innerHTML = `<div class="state-name">${state.cleanName}</div>`;
    canvas.appendChild(node);

    // Double-click sets active manually
    node.addEventListener('dblclick', () => {
      activeState = state.name;
      localStorage.setItem('states_active', activeState);
      renderStates();
    });

    // Drag events
    setupNodeDragging(node, state);
  });

  // Draw transition arrows
  setTimeout(drawTransitions, 50);
}

// Node dragging logic
function setupNodeDragging(node, state) {
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let originalX = 0;
  let originalY = 0;

  node.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    originalX = state.x;
    originalY = state.y;

    // Bring node to front
    document.querySelectorAll('.state-node').forEach(n => n.style.zIndex = 10);
    node.style.zIndex = 20;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function onMouseMove(e) {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    let newX = originalX + deltaX;
    let newY = originalY + deltaY;

    if (newX < 50) newX = 50;
    if (newY < 50) newY = 50;

    node.style.left = `${newX - 45}px`;
    node.style.top = `${newY - 45}px`;

    state.x = newX;
    state.y = newY;

    // Redraw paths live
    drawTransitions();
  }

  function onMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    // Cache position
    positionsCache[state.name] = { x: state.x, y: state.y };
    localStorage.setItem('states_positions', JSON.stringify(positionsCache));
  }
}

// Draw directed transition curves (SVG)
function drawTransitions() {
  // Clear paths
  canvas.querySelectorAll('.transition-path-group').forEach(p => p.remove());

  const radius = 45; // circle radius

  transitions.forEach((trans, idx) => {
    const source = states.find(s => s.name === trans.from);
    const target = states.find(s => s.name === trans.to);

    if (!source || !target) return;

    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.className.baseVal = 'transition-path-group';

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.id = `transition-path-${idx}`;
    path.className.baseVal = 'transition-link';
    
    // Check if this transition connects the active state
    const isActivePath = (trans.from === activeState);
    if (isActivePath) {
      path.classList.add('active-path');
      path.setAttribute('marker-end', 'url(#arrow-active)');
    } else {
      path.setAttribute('marker-end', 'url(#arrow)');
    }

    let pathD = '';
    let labelX = 0;
    let labelY = 0;

    // Self-transition loop
    if (source.name === target.name) {
      const loopX = source.x;
      const loopY = source.y;
      
      // Arc path starting from top-left, going up/curving, ending at top-right
      pathD = `M ${loopX - 15} ${loopY - 42} C ${loopX - 45} ${loopY - 95}, ${loopX + 45} ${loopY - 95}, ${loopX + 15} ${loopY - 42}`;
      
      labelX = loopX;
      labelY = loopY - 95;
    } else {
      // Calculate angles and offsets to avoid overlapping lines
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist === 0) return;

      const angle = Math.atan2(dy, dx);
      
      const startX = source.x + radius * Math.cos(angle);
      const startY = source.y + radius * Math.sin(angle);
      const endX = target.x - radius * Math.cos(angle);
      const endY = target.y - radius * Math.sin(angle);

      // Curved offset: Check if there's a bidirectional counterpart
      const hasReturn = transitions.some(t => t.from === target.name && t.to === source.name);
      
      if (hasReturn) {
        // Curve the line to make room (quadratic bezier)
        const bendOffset = 30; // pixels to curve
        const normalX = -Math.sin(angle);
        const normalY = Math.cos(angle);

        const controlX = (startX + endX) / 2 + bendOffset * normalX;
        const controlY = (startY + endY) / 2 + bendOffset * normalY;

        pathD = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
        
        // Midpoint for label
        labelX = controlX;
        labelY = controlY;
      } else {
        // Straight line
        pathD = `M ${startX} ${startY} L ${endX} ${endY}`;
        
        labelX = (startX + endX) / 2 - 10 * Math.sin(angle);
        labelY = (startY + endY) / 2 + 10 * Math.cos(angle);
      }
    }

    path.setAttribute('d', pathD);
    group.appendChild(path);

    // Trigger label on path (only if it has an event name)
    if (trans.event && trans.event !== 'link') {
      const textGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      textGroup.className.baseVal = 'transition-text-group';

      // Text background box
      const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      bgRect.className.baseVal = 'transition-label-bg';

      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.className.baseVal = 'transition-label';
      label.setAttribute('x', labelX);
      label.setAttribute('y', labelY + 3);
      label.textContent = trans.event;

      textGroup.appendChild(bgRect);
      textGroup.appendChild(label);
      group.appendChild(textGroup);
      
      // Calculate background sizes once text is added
      setTimeout(() => {
        try {
          const bbox = label.getBBox();
          bgRect.setAttribute('x', bbox.x - 4);
          bgRect.setAttribute('y', bbox.y - 2);
          bgRect.setAttribute('width', bbox.width + 8);
          bgRect.setAttribute('height', bbox.height + 4);
        } catch (e) {
          // getBBox fails if element hidden, set defaults
          bgRect.setAttribute('x', labelX - 30);
          bgRect.setAttribute('y', labelY - 6);
          bgRect.setAttribute('width', 60);
          bgRect.setAttribute('height', 14);
        }
      }, 0);
    }

    connectorLayer.appendChild(group);
  });
}

// Fire input event -> transition active state
function fireEvent(evtName) {
  if (!activeState) return;

  // Find matching transition from current active state
  const transIdx = transitions.findIndex(t => t.from === activeState && t.event === evtName);
  
  if (transIdx === -1) return; // Event doesn't trigger anything in current state
  
  const trans = transitions[transIdx];
  
  // Start Particle simulation along the SVG path
  const pathElement = document.getElementById(`transition-path-${transIdx}`);
  if (pathElement) {
    animateParticle(pathElement, () => {
      // Transition complete callback
      activeState = trans.to;
      localStorage.setItem('states_active', activeState);
      renderStates();
    });
  } else {
    // Immediate transition if path missing
    activeState = trans.to;
    localStorage.setItem('states_active', activeState);
    renderStates();
  }
}

// Particle flow animation
function animateParticle(pathElement, callback) {
  const L = pathElement.getTotalLength();
  
  const particle = document.createElement('div');
  particle.className = 'sim-particle';
  canvas.appendChild(particle);

  const duration = 750; // ms
  const startTime = performance.now();

  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Position of particle relative to path length
    const point = pathElement.getPointAtLength(progress * L);
    
    particle.style.left = `${point.x}px`;
    particle.style.top = `${point.y}px`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      particle.remove();
      callback();
    }
  }

  requestAnimationFrame(animate);
}

// Start everything
window.addEventListener('DOMContentLoaded', init);
